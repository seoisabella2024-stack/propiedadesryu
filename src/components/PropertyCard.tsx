import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, MapPin, Ban } from "lucide-react";
import type { Property } from "@/data/properties";

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  const isUnavailable = property.available === false;

  return (
    <div
      className={`card-property relative ${
        isUnavailable ? "bg-neutral-900 text-neutral-400 opacity-70 grayscale" : ""
      }`}
      aria-disabled={isUnavailable}
    >
      {isUnavailable && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-sm bg-neutral-800 px-3 py-1 font-body text-xs font-semibold text-neutral-100 shadow-md">
          <Ban size={12} />
          No disponible
        </div>
      )}

      <Link to="/propiedad/$id" params={{ id: property.id }}>
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className={`card-property-image ${isUnavailable ? "brightness-50" : ""}`}
            loading="lazy"
            width={800}
            height={600}
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-sm bg-primary px-3 py-1 font-body text-xs font-medium text-primary-foreground">
              {property.tag}
            </span>
          </div>
        </div>
      </Link>

      <div className={compact ? "p-4" : "p-5"}>
        <div className={`flex items-center gap-1.5 mb-1 ${isUnavailable ? "text-neutral-500" : "text-muted-foreground"}`}>
          <MapPin size={12} />
          <span className="font-body text-xs">{property.location}</span>
        </div>
        <Link to="/propiedad/$id" params={{ id: property.id }}>
          <h3 className={`font-heading text-lg font-semibold leading-tight transition-colors ${
            isUnavailable ? "text-neutral-300 hover:text-neutral-200" : "text-foreground hover:text-primary"
          }`}>
            {property.title}
          </h3>
        </Link>
        <p className={`mt-2 font-heading text-xl font-bold ${isUnavailable ? "text-neutral-400 line-through" : "text-primary"}`}>
          {property.price}
        </p>

        <div className={`mt-3 flex items-center gap-4 border-t pt-3 ${isUnavailable ? "border-neutral-700" : "border-border"}`}>
          <Feature icon={<Bed size={14} />} text={`${property.beds} Hab.`} dim={isUnavailable} />
          <Feature icon={<Bath size={14} />} text={`${property.baths} Baños`} dim={isUnavailable} />
          <Feature icon={<Maximize size={14} />} text={property.area} dim={isUnavailable} />
        </div>

        {!compact && (
          <>
            <ul className="mt-3 space-y-1">
              {property.features.map((f) => (
                <li key={f} className={`font-body text-xs flex items-center gap-1.5 ${isUnavailable ? "text-neutral-500" : "text-muted-foreground"}`}>
                  <span className={`h-1 w-1 rounded-full shrink-0 ${isUnavailable ? "bg-neutral-500" : "bg-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>

            <div className={`mt-3 rounded px-3 py-1.5 text-center ${
              isUnavailable ? "bg-neutral-800" : "bg-primary/10"
            }`}>
              <span className={`font-body text-xs font-semibold ${isUnavailable ? "text-neutral-300" : "text-primary"}`}>
                {isUnavailable ? "No disponible" : property.availability}
              </span>
            </div>
          </>
        )}

        <div className="mt-3 flex gap-2">
          <Link
            to="/propiedad/$id"
            params={{ id: property.id }}
            className="flex-1 btn-luxury-primary rounded-md text-xs py-2.5 block text-center"
          >
            Ver Detalles
          </Link>
          <a
            href={`https://wa.me/56941336389?text=Hola%2C%20me%20interesa%20${encodeURIComponent(property.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-luxury-outline rounded-md text-xs py-2.5 block text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text, dim }: { icon: React.ReactNode; text: string; dim?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 ${dim ? "text-neutral-500" : "text-muted-foreground"}`}>
      {icon}
      <span className="font-body text-xs">{text}</span>
    </div>
  );
}
