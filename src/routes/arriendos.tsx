import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/use-properties";

type ArriendosSearch = { comuna?: string };

export const Route = createFileRoute("/arriendos")({
  component: ArriendosPage,
  validateSearch: (search: Record<string, unknown>): ArriendosSearch => ({
    comuna: typeof search.comuna === "string" ? search.comuna : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Arriendos — Ryu Propiedades" },
      { name: "description", content: "Propiedades en arriendo en Los Ángeles, Chile. Departamentos y casas con disponibilidad inmediata." },
      { property: "og:title", content: "Arriendos — Ryu Propiedades" },
      { property: "og:description", content: "Propiedades en arriendo en Los Ángeles, Chile." },
    ],
  }),
});

function ArriendosPage() {
  const { comuna } = Route.useSearch();
  const { properties: filtered, loading } = useProperties("Arriendo", comuna);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-padding mt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="label-luxury mb-3">Nuestras Propiedades</p>
            <h1 className="heading-section text-foreground">Arriendos Disponibles</h1>
            <p className="text-body mt-4 max-w-2xl mx-auto">
              {comuna
                ? `Mostrando propiedades en arriendo en ${comuna}.`
                : "Encuentra tu hogar ideal en Los Ángeles. Departamentos y casas con disponibilidad inmediata."}
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
            <p className="text-center text-muted-foreground">No hay propiedades disponibles en esta categoría.</p>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
