import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Building2, Shield, FileText, Wrench, Users, BarChart3, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/administracion")({
  component: AdministracionPage,
  head: () => ({
    meta: [
      { title: "Administración de Propiedades — Ryu Propiedades" },
      { name: "description", content: "Servicio profesional de administración de propiedades en Los Ángeles, Chile." },
      { property: "og:title", content: "Administración de Propiedades — Ryu Propiedades" },
      { property: "og:description", content: "Servicio profesional de administración de propiedades en Los Ángeles." },
    ],
  }),
});

const services = [
  {
    icon: <FileText size={28} />,
    title: "Gestión de Contratos",
    description: "Redacción, revisión y renovación de contratos de arriendo. Nos encargamos de toda la documentación legal.",
  },
  {
    icon: <Wrench size={28} />,
    title: "Mantención Preventiva",
    description: "Coordinamos reparaciones, mantenciones periódicas y mejoras para preservar el valor de tu propiedad.",
  },
  {
    icon: <Users size={28} />,
    title: "Selección de Arrendatarios",
    description: "Verificación de antecedentes comerciales, laborales y referencias para encontrar al inquilino ideal.",
  },
  {
    icon: <Shield size={28} />,
    title: "Gestión de Gastos Comunes",
    description: "Administración eficiente de gastos comunes en condominios, con rendiciones claras y puntuales.",
  },
];

const benefits = [
  "Maximiza la rentabilidad de tu inversión",
  "Reduce la morosidad con gestión de cobro profesional",
  "Tranquilidad total: nos encargamos de todo",
  "Atención 24/7 para emergencias",
  "Asesoría legal incluida",
  "Red de proveedores confiables para mantenciones",
];

function AdministracionPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="mt-16 bg-secondary section-padding">
        <div className="mx-auto max-w-7xl text-center">
          <p className="label-luxury mb-3">Servicio Profesional</p>
          <h1 className="heading-section text-foreground">Administración de Propiedades</h1>
          <p className="text-body mt-4 max-w-3xl mx-auto">
            En Ryu Propiedades nos hacemos cargo de la administración integral de tu propiedad. 
            Desde la selección de arrendatarios hasta la mantención y cobro de arriendos, para que tú solo te preocupes de recibir tu renta.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="label-luxury mb-3">¿Qué Incluye?</p>
            <h2 className="heading-section text-foreground">Nuestros Servicios de Administración</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-lg bg-card p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 text-body text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="section-padding bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="label-luxury mb-3">¿Por Qué Elegirnos?</p>
              <h2 className="heading-section text-foreground">Beneficios de Nuestra Administración</h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <div className="rounded-lg bg-card p-8 border border-border">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">¿Tienes una propiedad?</h3>
                <p className="text-body text-sm mb-6">
                  Déjanos administrarla por ti. Contáctanos para una evaluación gratuita y sin compromiso.
                </p>
                <a
                  href="https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20administraci%C3%B3n%20de%20propiedades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary rounded-md text-xs inline-block"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
