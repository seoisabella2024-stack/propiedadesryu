import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { properties as staticProperties, type Property } from "@/data/properties";

export type DbProperty = {
  id: string;
  title: string;
  location: string;
  comuna?: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  tag: string;
  features: string[];
  availability: string;
  description: string;
  image_url: string;
  images: string[];
  video_url: string;
  available?: boolean;
};

function dbToProperty(row: DbProperty): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    comuna: row.comuna || "",
    price: row.price,
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    tag: row.tag as Property["tag"],
    features: row.features ?? [],
    availability: row.availability,
    description: row.description,
    image: row.image_url || row.images?.[0] || "",
    images: row.images ?? [],
    video_url: row.video_url || "",
    available: row.available ?? true,
  };
}

function normalizeComunas(rows: Array<{ comuna?: string | null }>) {
  return Array.from(new Set(rows.map((row) => row.comuna?.trim()).filter(Boolean) as string[]));
}

export function useProperties(tag?: Property["tag"], comuna?: string) {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const query = (supabase as any).from("properties").select("*").order("created_at", { ascending: false });
      if (tag) query.eq("tag", tag);
      if (comuna) query.eq("comuna", comuna);
      const { data: rows, error } = await query;
      if (!cancelled) {
        if (error || !rows || rows.length === 0) {
          // fallback to static
          const fallback = (tag ? staticProperties.filter((p) => p.tag === tag) : staticProperties)
            .filter((p) => !comuna || p.comuna === comuna);
          setData(fallback);
        } else {
          setData(rows.map(dbToProperty));
        }
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tag, comuna]);

  return { properties: data, loading };
}

export function useComunas() {
  const [comunas, setComunas] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await (supabase as any)
        .from("properties")
        .select("comuna")
        .neq("comuna", "")
        .order("comuna", { ascending: true });
      if (!cancelled) setComunas(normalizeComunas(data ?? []));
    })();
    return () => { cancelled = true; };
  }, []);

  return comunas;
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: row, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!cancelled) {
        if (row && !error) {
          setProperty(dbToProperty(row));
        } else {
          // try static
          const found = staticProperties.find((p) => p.id === id);
          setProperty(found ?? null);
        }
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  return { property, loading };
}

export function useSuggestions(currentId: string, limit = 3) {
  const { properties } = useProperties();
  return properties.filter((p) => p.id !== currentId).slice(0, limit);
}
