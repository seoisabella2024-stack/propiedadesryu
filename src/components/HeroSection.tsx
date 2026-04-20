import { motion } from "framer-motion";
import { Search, MapPin, Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import heroImage from "@/assets/hero-luxury.jpg";

const COMUNAS = ["Pucón", "Los Ángeles", "Concepción"] as const;
const TIPOS = ["Arriendo", "Venta", "Parcela"] as const;

export function HeroSection() {
  const navigate = useNavigate();
  const [comuna, setComuna] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  const handleSearch = () => {
    const t = tipo || "Arriendo";
    const path =
      t === "Venta" ? "/venta" : t === "Parcela" ? "/venta" : "/arriendos";
    navigate({ to: path, search: comuna ? { comuna } : undefined });
  };

  return (
    <section className="relative mt-16 h-[50vh] w-full overflow-hidden md:h-[60vh]">
      <img
        src={heroImage}
        alt="Vista panorámica de Los Ángeles, Chile"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-3xl font-bold text-background md:text-5xl"
        >
          Tu Propiedad Ideal en
          <br />
          <span className="text-primary-foreground">Los Ángeles</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 max-w-lg font-body text-sm font-light text-background/80"
        >
          Arriendos, ventas, administración y constructora. Confía en Ryu Propiedades.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 w-full max-w-3xl"
        >
          <div className="flex flex-col gap-3 rounded-lg bg-background/95 backdrop-blur-sm p-3 shadow-2xl md:flex-row md:items-center md:gap-0 md:p-2">
            <div className="flex flex-1 items-center gap-2 px-4 py-2">
              <MapPin size={16} className="text-muted-foreground" />
              <select
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="w-full bg-transparent font-body text-sm text-foreground outline-none cursor-pointer"
              >
                <option value="">Comuna</option>
                {COMUNAS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="flex flex-1 items-center gap-2 px-4 py-2">
              <Home size={16} className="text-muted-foreground" />
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-transparent font-body text-sm text-foreground outline-none cursor-pointer"
              >
                <option value="">Tipo</option>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="btn-luxury-primary rounded-md px-5 py-2.5 flex items-center justify-center gap-2 text-xs"
            >
              <Search size={14} />
              <span>Buscar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
