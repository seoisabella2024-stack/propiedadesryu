import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  tag: "Arriendo" | "Venta" | "Terreno";
  features: string[];
  availability: string;
  description: string;
}

export const properties: Property[] = [
  {
    id: "depto-balmaceda",
    image: property1,
    title: "Depto Amoblado Full — Calle Balmaceda",
    location: "Los Ángeles, Biobío",
    price: "$600.000 CLP + GGCC",
    beds: 2,
    baths: 2,
    area: "54 m²",
    tag: "Arriendo",
    features: ["Cocina full equipada", "Internet incluido", "Estacionamiento privado"],
    availability: "Disponibilidad Inmediata",
    description:
      "Departamento en ubicación privilegiada: Calle Balmaceda. A pasos del Hospital y del Campus UdeC. Living comedor acogedor e iluminado. Cocina full equipada. Incluye Internet. Estacionamiento privado. Orientación Sur. Ideal para profesionales o estudiantes. Comisión corretaje: 50% de un mes de arriendo.",
  },
  {
    id: "casa-mediterranea-antuco",
    image: property2,
    title: "Casa Mediterránea en Condominio",
    location: "Km 1.5 Camino Antuco, Los Ángeles",
    price: "$1.200.000 CLP (GGCC incl.)",
    beds: 3,
    baths: 3,
    area: "139,88 m²",
    tag: "Arriendo",
    features: ["Terreno 315 m²", "3 estacionamientos", "2 aires acondicionados"],
    availability: "Disponibilidad Inmediata",
    description:
      "Hermosa casa de estilo mediterráneo en exclusivo condominio. 139,88 m² construidos, 315,58 m² de terreno. Primer nivel: hall de acceso, living-comedor amplio, cocina amoblada y full equipada, baño de visitas, dormitorio principal con baño en suite. Segundo nivel: 2 dormitorios con closet, sala de estar ideal para home office, baño completo. Extras: cortinaje, lámparas, horno, encimera, campana, microondas, 2 aires acondicionados. Patio con jardín, lateral techado. Comisión de corretaje: 50% del arriendo.",
  },
  {
    id: "depto-luminity",
    image: property3,
    title: "Depto Moderno — Edificio Luminity",
    location: "Laguna Verde 2365, Los Ángeles",
    price: "$750.000 CLP (GGCC incl.)",
    beds: 2,
    baths: 2,
    area: "75 m²",
    tag: "Arriendo",
    features: ["Piscina y gimnasio", "Conserje 24h", "Piso 8°, terraza amplia"],
    availability: "Disponibilidad Inmediata",
    description:
      "Lindo y moderno departamento en Edificio Luminity. 75 m², amplio living, cocina equipada con artefactos, comedor isla con banquetas, 2 habitaciones (una suite con walk-in closet), 2 baños completos, amplia terraza, bodega, estacionamiento, 2 balcones, piso octavo, orientación poniente. Edificio con piscina, quinchos, sala de reuniones co-work, gimnasio y conserje 24h.",
  },
];

export function getPropertiesByTag(tag: Property["tag"]): Property[] {
  return properties.filter((p) => p.tag === tag);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getSuggestions(currentId: string, limit = 3): Property[] {
  return properties.filter((p) => p.id !== currentId).slice(0, limit);
}
