import { spawn } from "node:child_process";
import { once } from "node:events";
import { constants } from "node:fs";
import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const outputPublicDir = resolve(rootDir, ".output/public");
const outputServerEntry = resolve(rootDir, ".output/server/index.mjs");
const distDir = resolve(rootDir, "dist");
const htmlEntryFiles = ["index.html", "200.html", "404.html"];

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function fileExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function captureRenderedHtml(route = "/") {
  const port = String(4300 + Math.floor(Math.random() * 200));
  const child = spawn(process.execPath, [outputServerEntry], {
    cwd: rootDir,
    env: { ...process.env, PORT: port },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let logs = "";
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString();
  });

  try {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      if (child.exitCode !== null) {
        throw new Error(`Built server exited before responding.\n${logs}`);
      }

      try {
        const response = await fetch(`http://127.0.0.1:${port}${route}`);

        if (response.ok) {
          const html = await response.text();

          if (html.includes("<html") || html.includes("<!DOCTYPE html>")) {
            return html;
          }
        }
      } catch {
        // Retry while the server finishes booting.
      }

      await delay(500);
    }

    throw new Error(`Timed out waiting for the built server to respond.\n${logs}`);
  } finally {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      await Promise.race([once(child, "exit"), delay(2000)]);
    }
  }
}

async function main() {
  if (!(await fileExists(outputPublicDir))) {
    throw new Error("Missing .output/public after build.");
  }

  if (!(await fileExists(outputServerEntry))) {
    throw new Error("Missing .output/server/index.mjs after build.");
  }

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await cp(outputPublicDir, distDir, { recursive: true });

  const html = await captureRenderedHtml("/");

  await Promise.all(
    [distDir, outputPublicDir].flatMap((directory) =>
      htmlEntryFiles.map((fileName) => writeFile(resolve(directory, fileName), html, "utf8")),
    ),
  );

  console.log("Prepared dist/ and .output/public with static HTML entry files.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});