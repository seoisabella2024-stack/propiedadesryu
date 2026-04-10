import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  return (
    <div className="card-property">
      <Link to="/propiedad/$id" params={{ id: property.id }}>
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="card-property-image"
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
        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
          <MapPin size={12} />
          <span className="font-body text-xs">{property.location}</span>
        </div>
        <Link to="/propiedad/$id" params={{ id: property.id }}>
          <h3 className="font-heading text-lg font-semibold text-foreground leading-tight hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="mt-2 font-heading text-xl font-bold text-primary">
          {property.price}
        </p>

        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
          <Feature icon={<Bed size={14} />} text={`${property.beds} Hab.`} />
          <Feature icon={<Bath size={14} />} text={`${property.baths} Baños`} />
          <Feature icon={<Maximize size={14} />} text={property.area} />
        </div>

        {!compact && (
          <>
            <ul className="mt-3 space-y-1">
              {property.features.map((f) => (
                <li key={f} className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-3 rounded bg-primary/10 px-3 py-1.5 text-center">
              <span className="font-body text-xs font-semibold text-primary">{property.availability}</span>
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

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {icon}
      <span className="font-body text-xs">{text}</span>
    </div>
  );
}
