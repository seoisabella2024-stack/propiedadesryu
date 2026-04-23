import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/use-properties";

type VentaSearch = { comuna?: string };

export const Route = createFileRoute("/venta")({
  component: VentaPage,
  validateSearch: (search: Record<string, unknown>): VentaSearch => ({
    comuna: typeof search.comuna === "string" ? search.comuna : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Venta de Propiedades — Ryu Propiedades" },
      { name: "description", content: "Propiedades en venta en Los Ángeles, Chile. Casas, departamentos y parcelas." },
      { property: "og:title", content: "Venta de Propiedades — Ryu Propiedades" },
      { property: "og:description", content: "Propiedades en venta en Los Ángeles, Chile." },
    ],
  }),
});

function VentaPage() {
  const { comuna } = Route.useSearch();
  const { properties: ventas, loading } = useProperties("Venta", comuna);
  const { properties: parcelas } = useProperties("Parcela", comuna);

  const all = [...ventas, ...parcelas];
  const filtered = all;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-padding mt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="label-luxury mb-3">Propiedades en Venta</p>
            <h1 className="heading-section text-foreground">Venta de Propiedades</h1>
            <p className="text-body mt-4 max-w-2xl mx-auto">
              {comuna
                ? `Mostrando propiedades en venta en ${comuna}.`
                : "Encuentra la propiedad perfecta para comprar en Los Ángeles y alrededores."}
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-8">Cargando...</p>
          ) : filtered.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-lg bg-secondary">
              <p className="font-heading text-xl font-semibold text-foreground mb-2">Próximamente</p>
              <p className="text-body">Estamos preparando nuevas propiedades en venta. Contáctanos para más información.</p>
              <a
                href="https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20comprar%20una%20propiedad"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary rounded-md text-xs mt-6 inline-block"
              >
                Consultar por WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
