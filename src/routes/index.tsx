import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "LUXEPROP — Propiedades de Lujo en Chile" },
      { name: "description", content: "Descubre las propiedades más exclusivas del mercado inmobiliario chileno. Villas, penthouses y casas de lujo." },
      { property: "og:title", content: "LUXEPROP — Propiedades de Lujo en Chile" },
      { property: "og:description", content: "Descubre las propiedades más exclusivas del mercado inmobiliario chileno." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
