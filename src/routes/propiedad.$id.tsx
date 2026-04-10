import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyCard } from "@/components/PropertyCard";
import { getPropertyById, getSuggestions } from "@/data/properties";
import { Bed, Bath, Maximize, MapPin, ArrowLeft, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/propiedad/$id")({
  component: PropertyDetailPage,
  head: ({ params }) => {
    const property = getPropertyById(params.id);
    return {
      meta: [
        { title: property ? `${property.title} — Ryu Propiedades` : "Propiedad — Ryu Propiedades" },
        { name: "description", content: property?.description?.slice(0, 155) ?? "" },
        { property: "og:title", content: property?.title ?? "Propiedad" },
        { property: "og:description", content: property?.description?.slice(0, 155) ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Propiedad no encontrada</h1>
        <Link to="/" className="btn-luxury-primary rounded-md text-xs mt-6 inline-block">
          Volver al Inicio
        </Link>
      </div>
    </div>
  ),
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const property = getPropertyById(id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Propiedad no encontrada</h1>
          <Link to="/" className="btn-luxury-primary rounded-md text-xs mt-6 inline-block">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const suggestions = getSuggestions(id);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="section-padding mt-16">
        <div className="mx-auto max-w-7xl">
          {/* Back Link */}
          <Link to="/arriendos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
            <ArrowLeft size={16} />
            Volver a propiedades
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={property.image}
                alt={property.title}
                className="w-full aspect-4/3 object-cover"
                width={800}
                height={600}
              />
            </div>

            {/* Info */}
            <div>
              <span className="rounded-sm bg-primary px-3 py-1 font-body text-xs font-medium text-primary-foreground">
                {property.tag}
              </span>

              <h1 className="mt-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
                {property.title}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span className="font-body text-sm">{property.location}</span>
              </div>

              <p className="mt-4 font-heading text-3xl font-bold text-primary">{property.price}</p>

              <div className="mt-6 flex items-center gap-6 border-t border-b border-border py-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Bed size={18} />
                  <span className="font-body text-sm">{property.beds} Habitaciones</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Bath size={18} />
                  <span className="font-body text-sm">{property.baths} Baños</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Maximize size={18} />
                  <span className="font-body text-sm">{property.area}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Características</h3>
                <ul className="space-y-2">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body text-sm text-foreground">
                      <CheckCircle size={16} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Descripción</h3>
                <p className="text-body text-sm">{property.description}</p>
              </div>

              <div className="mt-6 rounded bg-primary/10 px-4 py-3 text-center">
                <span className="font-body text-sm font-semibold text-primary">{property.availability}</span>
              </div>

              <a
                href={`https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full btn-luxury-primary rounded-md text-xs py-3 block text-center"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-20">
              <div className="mb-8 text-center">
                <p className="label-luxury mb-3">También te puede interesar</p>
                <h2 className="heading-section text-foreground">Otras Propiedades</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((p) => (
                  <PropertyCard key={p.id} property={p} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
