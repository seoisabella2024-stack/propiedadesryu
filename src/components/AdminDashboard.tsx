import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Plus, Trash2, Upload, X, Image, Pencil, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type DbProperty = {
  id: string;
  title: string;
  location: string;
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
  user_id: string;
  available?: boolean;
};

export function AdminDashboard({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState<"list" | "add" | "edit">("list");
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [filterTag, setFilterTag] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<DbProperty | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar: " + error.message);
    } else {
      toast.success("Propiedad eliminada");
      fetchProperties();
    }
  };

  const handleEdit = (property: DbProperty) => {
    setEditingProperty(property);
    setActiveTab("edit");
  };

  const toggleAvailability = async (p: DbProperty) => {
    const previousValue = p.available ?? true;
    const newValue = !previousValue;

    setProperties((prev) => prev.map((x) => (x.id === p.id ? { ...x, available: newValue } : x)));

    const { data, error } = await supabase
      .from("properties")
      .update({
        available: newValue,
        availability: newValue ? "Disponible" : "No disponible",
      })
      .eq("id", p.id)
      .select("id, available, availability")
      .single();

    if (error || !data) {
      toast.error("Error al actualizar: " + (error?.message || "No se pudo guardar el estado"));
      setProperties((prev) => prev.map((x) => (x.id === p.id ? { ...x, available: previousValue } : x)));
      return;
    }

    setProperties((prev) => prev.map((x) => (
      x.id === p.id ? { ...x, available: data.available, availability: data.availability } : x
    )));
    toast.success(data.available ? "Marcada como disponible" : "Marcada como NO disponible");
  };

  const filtered = filterTag === "all"
    ? properties
    : properties.filter((p) => p.tag === filterTag);

  const tags = ["all", "Arriendo", "Venta", "Parcela"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Panel Administrativo</h1>
          <p className="text-body text-sm mt-1">{session.user.email}</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => { setActiveTab("list"); setEditingProperty(null); }}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${activeTab === "list" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}
          >
            Propiedades
          </button>
          <button
            onClick={() => { setActiveTab("add"); setEditingProperty(null); }}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${activeTab === "add" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}
          >
            <Plus size={14} />
            Agregar
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </div>

      {activeTab === "list" && (
        <div>
          <div className="flex gap-2 mb-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filterTag === tag ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}
              >
                {tag === "all" ? "Todos" : tag}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-8">Cargando...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 rounded-lg bg-secondary">
              <p className="font-heading text-lg font-semibold text-foreground mb-2">Sin propiedades</p>
              <p className="text-body text-sm">Agrega tu primera propiedad con el botón "Agregar".</p>
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground">Propiedad</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground hidden md:table-cell">Ubicación</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground">Precio</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground hidden sm:table-cell">Tipo</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground">Estado</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground hidden lg:table-cell">Fotos</th>
                      <th className="px-4 py-3 font-body text-xs font-semibold text-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => {
                      const isAvail = p.available ?? true;
                      return (
                      <tr key={p.id} className={`border-t border-border hover:bg-accent/30 transition-colors ${!isAvail ? "opacity-60" : ""}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {(p.image_url || p.images?.[0]) && (
                              <img src={p.image_url || p.images[0]} alt={p.title} className="h-10 w-14 rounded object-cover hidden sm:block" />
                            )}
                            <span className="font-body text-sm font-medium text-foreground">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">{p.location}</td>
                        <td className="px-4 py-3 font-heading text-sm font-semibold text-primary">{p.price}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="rounded bg-primary/10 px-2 py-0.5 font-body text-xs font-medium text-primary">{p.tag}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleAvailability(p)}
                            className={`inline-flex items-center gap-1 rounded px-2 py-1 font-body text-xs font-medium transition-colors ${
                              isAvail
                                ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                                : "bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
                            }`}
                            title="Click para cambiar disponibilidad"
                          >
                            {isAvail ? <Eye size={12} /> : <EyeOff size={12} />}
                            {isAvail ? "Disponible" : "No disponible"}
                          </button>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Image size={12} /> {p.images?.length || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-1.5 rounded text-primary hover:bg-primary/10 transition-colors"
                              title="Editar"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 rounded text-destructive hover:bg-destructive/10 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="mt-4 text-body text-xs text-center">
            {filtered.length} propiedad{filtered.length !== 1 ? "es" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {activeTab === "add" && (
        <PropertyForm
          session={session}
          onDone={() => {
            setActiveTab("list");
            fetchProperties();
          }}
        />
      )}

      {activeTab === "edit" && editingProperty && (
        <PropertyForm
          session={session}
          property={editingProperty}
          onDone={() => {
            setActiveTab("list");
            setEditingProperty(null);
            fetchProperties();
          }}
        />
      )}
    </div>
  );
}

function PropertyForm({ session, property, onDone }: { session: any; property?: DbProperty; onDone: () => void }) {
  const isEditing = !!property;
  const [form, setForm] = useState({
    title: property?.title ?? "",
    location: property?.location ?? "",
    price: property?.price ?? "",
    beds: String(property?.beds ?? 0),
    baths: String(property?.baths ?? 0),
    area: property?.area ?? "",
    tag: property?.tag ?? "Arriendo",
    description: property?.description ?? "",
    availability: property?.availability ?? "Disponible",
  });
  const [available, setAvailable] = useState<boolean>(property?.available ?? true);
  const [existingImages, setExistingImages] = useState<string[]>(property?.images ?? []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState(property?.video_url ?? "");
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setNewPreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (idx: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    setSubmitting(true);

    try {
      // Upload new images
      const uploadedUrls: string[] = [];
      for (const file of newImages) {
        const ext = file.name.split(".").pop();
        const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(path);
        uploadedUrls.push(urlData.publicUrl);
      }

      const allImages = [...existingImages, ...uploadedUrls];
      const propertyData = {
        title: form.title,
        location: form.location,
        price: form.price,
        beds: parseInt(form.beds) || 0,
        baths: parseInt(form.baths) || 0,
        area: form.area,
        tag: form.tag,
        description: form.description,
        features: [],
        availability: available ? form.availability : "No disponible",
        image_url: allImages[0] || "",
        images: allImages,
        video_url: videoUrl.trim(),
        available,
      };

      if (isEditing && property) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", property.id);
        if (error) throw error;
        toast.success("Propiedad actualizada correctamente");
      } else {
        const { error } = await supabase.from("properties").insert({
          ...propertyData,
          user_id: session.user.id,
        });
        if (error) throw error;
        toast.success("Propiedad agregada correctamente");
      }

      onDone();
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
        {isEditing ? "Editar Propiedad" : "Agregar Propiedad"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-sm">Título</Label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label className="text-sm">Ubicación</Label>
            <Input value={form.location} onChange={(e) => update("location", e.target.value)} required className="mt-1" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label className="text-sm">Precio</Label>
            <Input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="$600.000 CLP" required className="mt-1" />
          </div>
          <div>
            <Label className="text-sm">Tipo</Label>
            <select
              value={form.tag}
              onChange={(e) => update("tag", e.target.value)}
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="Arriendo">Arriendo</option>
              <option value="Venta">Venta</option>
              <option value="Parcela">Parcela</option>
            </select>
          </div>
          <div>
            <Label className="text-sm">Disponibilidad</Label>
            <Input value={form.availability} onChange={(e) => update("availability", e.target.value)} className="mt-1" />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-border bg-secondary/40 p-3">
          <input
            id="available-toggle"
            type="checkbox"
            checked={!available}
            onChange={(e) => setAvailable(!e.target.checked)}
            className="h-4 w-4 rounded border-border accent-destructive"
          />
          <label htmlFor="available-toggle" className="font-body text-sm text-foreground cursor-pointer select-none">
            Marcar como <span className="font-semibold">No disponible</span> (la propiedad seguirá visible pero atenuada)
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label className="text-sm">Dormitorios</Label>
            <Input type="number" value={form.beds} onChange={(e) => update("beds", e.target.value)} min="0" className="mt-1" />
          </div>
          <div>
            <Label className="text-sm">Baños</Label>
            <Input type="number" value={form.baths} onChange={(e) => update("baths", e.target.value)} min="0" className="mt-1" />
          </div>
          <div>
            <Label className="text-sm">Superficie</Label>
            <Input value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="54 m²" className="mt-1" />
          </div>
        </div>

        <div>
          <Label className="text-sm">Descripción</Label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            required
          />
        </div>

        {/* Existing images (only in edit mode) */}
        {isEditing && existingImages.length > 0 && (
          <div>
            <Label className="text-sm">Fotos actuales</Label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {existingImages.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt="" className="h-20 w-full rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New image upload */}
        <div>
          <Label className="text-sm">{isEditing ? "Agregar más fotos" : "Fotos de la propiedad"}</Label>
          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-body text-sm mb-2">Arrastra o selecciona imágenes</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-block px-4 py-2 rounded-md bg-secondary text-foreground text-xs font-medium hover:bg-accent transition-colors"
            >
              Seleccionar archivos
            </label>
          </div>
          {newPreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {newPreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt="" className="h-20 w-full rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video URL */}
        <div>
          <Label className="text-sm">Link de video (YouTube, TikTok, Instagram)</Label>
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... o https://www.tiktok.com/..."
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">Opcional. Pega el link del video de la propiedad.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-luxury-primary rounded-md text-xs flex-1 disabled:opacity-50"
          >
            {submitting ? "Guardando..." : isEditing ? "Actualizar Propiedad" : "Guardar Propiedad"}
          </button>
          <button type="button" onClick={onDone} className="btn-luxury-outline rounded-md text-xs flex-1">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
