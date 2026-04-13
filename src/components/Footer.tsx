import { MapPin, Phone, Mail } from "lucide-react";
import logoRyu from "@/assets/logo-ryu.jpg";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/70 border-t border-background/10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoRyu} alt="Ryu Propiedades" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <span className="font-heading text-lg font-bold text-background block leading-tight">RYU</span>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-background/60">Propiedades</span>
              </div>
            </div>
            <p className="font-body text-sm font-light leading-relaxed">
              Tu socio de confianza en el mercado inmobiliario de Los Ángeles, Chile.
            </p>
          </div>

          <div>
            <h4 className="label-luxury text-background/50 mb-4">Servicios</h4>
            <ul className="space-y-2 font-body text-sm">
              {["Arriendos", "Venta", "Administración", "Constructora"].map((s) => (
                <li key={s}>
                  <span className="cursor-pointer transition-colors hover:text-background">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-luxury text-background/50 mb-4">Contacto</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Av. Alemania 799, Los Ángeles, Biobío</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href="tel:+56941336389" className="hover:text-background transition-colors">+56 9 4133 6389</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>contacto@ryupropiedades.cl</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="label-luxury text-background/50 mb-4">WhatsApp</h4>
            <a
              href="https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20una%20propiedad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 font-body text-xs font-medium text-white transition-transform hover:scale-105"
            >
              <Phone size={14} />
              Escríbenos
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="font-body text-xs text-background/40">
            © 2025 Ryu Propiedades. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "WhatsApp"].map((social) => (
              <span
                key={social}
                className="cursor-pointer font-body text-xs uppercase tracking-wider text-background/40 transition-colors hover:text-background"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
