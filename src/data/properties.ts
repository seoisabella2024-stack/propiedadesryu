import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  image: string;
  images?: string[];
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  tag: "Arriendo" | "Venta" | "Terreno" | "Parcela";
  features: string[];
  availability: string;
  description: string;
  video_url?: string;
}

export const properties: Property[] = [
  {
    id: "depto-balmaceda",
    image: property1,
    images: [property1],
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
    images: [property2],
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
    images: [property3],
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
  {
    id: "casa-parcela-antuco",
    image: property2,
    images: [property2],
    title: "Casa en Parcela — Camino Antuco",
    location: "Km 3, Camino Antuco, Los Ángeles",
    price: "$185.000.000 CLP",
    beds: 4,
    baths: 3,
    area: "220 m²",
    tag: "Venta",
    features: ["Parcela de 5.000 m²", "Quincho con piscina", "Bodega y taller"],
    availability: "Disponible",
    description:
      "Espectacular casa en parcela de 5.000 m² en Camino Antuco. 220 m² construidos, 4 dormitorios, 3 baños, amplio living-comedor con estufa a leña, cocina full equipada, quincho con piscina, bodega independiente y taller. Excelente conectividad, a minutos del centro de Los Ángeles. Ideal para familias que buscan tranquilidad y espacio.",
  },
  {
    id: "depto-centro-la",
    image: property1,
    images: [property1],
    title: "Departamento Céntrico — Los Ángeles",
    location: "Centro, Los Ángeles",
    price: "$62.000.000 CLP",
    beds: 2,
    baths: 1,
    area: "58 m²",
    tag: "Venta",
    features: ["Ubicación céntrica", "Edificio con ascensor", "Estacionamiento"],
    availability: "Disponible",
    description:
      "Departamento de 58 m² en pleno centro de Los Ángeles. 2 dormitorios, 1 baño, living-comedor, cocina americana equipada. Edificio con ascensor, estacionamiento incluido. Ideal como inversión o primera vivienda. Cercanía a comercio, transporte y servicios.",
  },
  {
    id: "terreno-nacimiento",
    image: property3,
    images: [property3],
    title: "Terreno Urbano — Nacimiento",
    location: "Nacimiento, Biobío",
    price: "$18.500.000 CLP",
    beds: 0,
    baths: 0,
    area: "500 m²",
    tag: "Venta",
    features: ["Urbanizado", "Agua y luz disponibles", "Plano, sin pendiente"],
    availability: "Disponible",
    description:
      "Terreno urbano de 500 m² en Nacimiento. Completamente urbanizado con acceso a agua potable, electricidad y alcantarillado. Terreno plano, ideal para construir. Ubicado en sector residencial consolidado, cercano a servicios y comercio.",
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
