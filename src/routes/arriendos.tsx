import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/use-properties";

export const Route = createFileRoute("/arriendos")({
  component: ArriendosPage,
  head: () => ({
    meta: [
      { title: "Arriendos — Ryu Propiedades" },
      { name: "description", content: "Propiedades en arriendo en Los Ángeles, Chile. Departamentos y casas con disponibilidad inmediata." },
...
            <p className="text-body mt-4 max-w-2xl mx-auto">
              Encuentra tu hogar ideal en Los Ángeles. Departamentos y casas con disponibilidad inmediata.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-8">Cargando...</p>
          ) : arriendos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {arriendos.map((property) => (
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
