import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HardHat, Ruler, Home, Building, PaintBucket, Hammer, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/constructora")({
  component: ConstructoraPage,
  head: () => ({
    meta: [
      { title: "Constructora — Ryu Propiedades" },
      { name: "description", content: "Soluciones de construcción en Los Ángeles, Chile. Construcción de casas, remodelaciones y proyectos a medida." },
      { property: "og:title", content: "Constructora — Ryu Propiedades" },
      { property: "og:description", content: "Soluciones de construcción en Los Ángeles, Chile." },
    ],
  }),
});

const solutions = [
  {
    icon: <PaintBucket size={28} />,
    title: "Remodelaciones",
    description: "Transformamos tu espacio con remodelaciones integrales: cocinas, baños, ampliaciones y más.",
  },
  {
    icon: <Ruler size={28} />,
    title: "Proyectos a Medida",
    description: "Diseño arquitectónico personalizado según tus necesidades, gustos y presupuesto.",
  },
  {
    icon: <Hammer size={28} />,
    title: "Obras Menores",
    description: "Reparaciones, mejoras y pequeñas obras de construcción con la misma calidad profesional.",
  },
  {
    icon: <HardHat size={28} />,
    title: "Asesoría Técnica Integral",
    description: "Ofrecemos un acompañamiento completo que inicia con una visita técnica inicial para diagnóstico. Tras esta etapa, entregamos un presupuesto detallado; una vez aprobado, procedemos con la ejecución y supervisión directa del proyecto para garantizar resultados óptimos.",
  },
];

const process = [
  { step: "01", title: "Consulta Inicial", description: "Conversamos sobre tu proyecto, necesidades y presupuesto." },
  { step: "02", title: "Diseño y Planificación", description: "Creamos planos, presupuesto detallado y cronograma de obra." },
  { step: "03", title: "Construcción", description: "Ejecutamos la obra con supervisión profesional permanente." },
  { step: "04", title: "Entrega", description: "Entregamos tu proyecto terminado, con garantía y documentación completa." },
];

function ConstructoraPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="mt-16 bg-secondary section-padding">
        <div className="mx-auto max-w-7xl text-center">
          <p className="label-luxury mb-3">Construimos Tu Futuro</p>
          <h1 className="heading-section text-foreground">Constructora Ryu</h1>
          <p className="text-body mt-4 max-w-3xl mx-auto">
            Ofrecemos soluciones de construcción integrales con los más altos estándares de calidad. 
            Desde la planificación hasta la entrega, nos encargamos de todo tu proyecto.
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="label-luxury mb-3">Nuestras Soluciones</p>
            <h2 className="heading-section text-foreground">¿Qué Construimos?</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-lg bg-card p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {solution.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{solution.title}</h3>
                <p className="mt-3 text-body text-sm">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="section-padding bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="label-luxury mb-3">Cómo Trabajamos</p>
            <h2 className="heading-section text-foreground">Nuestro Proceso</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <span className="font-heading text-4xl font-bold text-primary/20">{item.step}</span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-body text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20un%20proyecto%20de%20construcci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary rounded-md text-xs inline-block"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
