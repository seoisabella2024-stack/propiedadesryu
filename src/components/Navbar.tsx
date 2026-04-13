import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoRyu from "@/assets/logo-ryu.jpg";

const navItems = [
  { label: "Arriendos", to: "/arriendos" as const },
  { label: "Venta", to: "/venta" as const },
  { label: "Administración", to: "/administracion" as const },
  { label: "Constructora", to: "/constructora" as const },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoRyu} alt="Ryu Propiedades" className="h-12 w-12 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground leading-tight lowercase">
              propiedades
            </span>
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              constructora
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="font-body text-xs font-medium uppercase tracking-wider text-foreground/70 transition-colors hover:text-primary"
              activeProps={{ className: "font-body text-xs font-medium uppercase tracking-wider text-primary font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/56941336389"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-primary rounded-md px-4 py-2 text-xs"
          >
            Contactar
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="font-body text-sm font-medium uppercase tracking-wider py-2 text-foreground/70"
              activeProps={{ className: "font-body text-sm font-medium uppercase tracking-wider py-2 text-primary font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/56941336389"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-primary rounded-md text-xs mt-2 text-center"
          >
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
