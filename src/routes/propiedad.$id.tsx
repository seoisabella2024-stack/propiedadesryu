import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperty, useSuggestions } from "@/hooks/use-properties";
import { Bed, Bath, Maximize, MapPin, ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Video } from "lucide-react";

export const Route = createFileRoute("/propiedad/$id")({
  component: PropertyDetailPage,
  head: () => ({
    meta: [
      { title: "Propiedad — Ryu Propiedades" },
    ],
  }),
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

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[current]}
          alt={`${title} - Foto ${current + 1}`}
          className="w-full aspect-4/3 object-cover"
          width={800}
          height={600}
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-xs text-foreground">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`overflow-hidden rounded ${i === current ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"} transition-all`}
            >
              <img src={img} alt="" className="w-full h-16 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoEmbed({ url }: { url: string }) {
  // YouTube
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={`https://www.youtube.com/embed/${yt[1]}`}
          title="Video de la propiedad"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }
  // TikTok
  const tt = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  if (tt) {
    return (
      <div className="overflow-hidden rounded-lg bg-muted">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${tt[1]}`}
          title="Video TikTok"
          allow="encrypted-media;"
          allowFullScreen
          className="w-full border-0"
          style={{ height: 740, maxHeight: "80vh" }}
        />
      </div>
    );
  }
  // Instagram
  const ig = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  if (ig) {
    return (
      <div className="overflow-hidden rounded-lg bg-muted">
        <iframe
          src={`https://www.instagram.com/p/${ig[1]}/embed`}
          title="Video Instagram"
          allow="encrypted-media;"
          allowFullScreen
          className="w-full border-0"
          style={{ height: 700, maxHeight: "80vh" }}
        />
      </div>
    );
  }
  // Fallback
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
    >
      Ver video de la propiedad →
    </a>
  );
}

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const { property, loading } = useProperty(id);
  const suggestions = useSuggestions(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

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

  const allImages = property.images && property.images.length > 0
    ? property.images
    : property.image ? [property.image] : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-padding mt-16">
        <div className="mx-auto max-w-7xl">
          <Link to="/arriendos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
            <ArrowLeft size={16} />
            Volver a propiedades
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <ImageGallery images={allImages} title={property.title} />

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

              {property.video_url && (
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Video size={18} className="text-primary" />
                    Video de la propiedad
                  </h3>
                  <VideoEmbed url={property.video_url} />
                </div>
              )}

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
