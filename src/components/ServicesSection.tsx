import { motion } from "framer-motion";
import { Key, Home, Building2, HardHat } from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  {
    icon: <Key size={28} />,
    title: "Arriendos",
    description: "Gestión integral de arriendos para propietarios e inquilinos. Encontramos el hogar perfecto para ti.",
    to: "/arriendos" as const,
  },
  {
    icon: <Home size={28} />,
    title: "Venta",
    description: "Te acompañamos en cada paso para vender o comprar tu propiedad al mejor precio del mercado.",
    to: "/venta" as const,
  },
  {
    icon: <Building2 size={28} />,
    title: "Administración",
    description: "Administración profesional de propiedades, optimizando rentabilidad y mantención.",
    to: "/administracion" as const,
  },
  {
    icon: <HardHat size={28} />,
    title: "Constructora",
    description: "Proyectos de construcción con los más altos estándares de calidad y diseño moderno.",
    to: "/constructora" as const,
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="label-luxury mb-3">Lo que Hacemos</p>
          <h2 className="heading-section text-foreground">Nuestros Servicios</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Link key={service.title} to={service.to}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-lg bg-card p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-body text-sm">{service.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
