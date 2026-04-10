import { motion } from "framer-motion";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Link } from "@tanstack/react-router";

export function FeaturedProperties() {
  const arriendos = properties.filter((p) => p.tag === "Arriendo").slice(0, 3);
  const ventas = properties.filter((p) => p.tag === "Venta").slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="label-luxury mb-3">Propiedades Disponibles</p>
          <h2 className="heading-section text-foreground">Arriendos Destacados</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {arriendos.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/arriendos" className="btn-luxury-outline rounded-md text-xs inline-block">
            Ver Todos los Arriendos
          </Link>
        </div>

        {ventas.length > 0 && (
          <>
            <div className="mb-12 text-center mt-20">
              <p className="label-luxury mb-3">Oportunidades de Inversión</p>
              <h2 className="heading-section text-foreground">Propiedades en Venta</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ventas.map((property, i) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/venta" className="btn-luxury-outline rounded-md text-xs inline-block">
                Ver Todas las Ventas
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
