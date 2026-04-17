import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-background/50 mb-4">
            ¿Buscas propiedad?
          </p>
          <h2 className="font-heading text-3xl font-bold text-background md:text-4xl">
            Contáctanos Hoy
          </h2>
          <p className="mt-4 mx-auto max-w-lg font-body text-sm font-light leading-relaxed text-background/60">
            Estamos en Leonardo Da Vinci 952, Los Ángeles. Escríbenos por WhatsApp o visítanos directamente.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/56941336389?text=Hola%2C%20quiero%20agendar%20una%20visita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-3 font-body text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <Phone size={16} />
              WhatsApp +56 9 4133 6389
            </a>
            <a
              href="tel:+56941336389"
              className="btn-luxury border border-background/20 text-background/80 rounded-md hover:bg-background/10 text-xs"
            >
              Llamar Ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
