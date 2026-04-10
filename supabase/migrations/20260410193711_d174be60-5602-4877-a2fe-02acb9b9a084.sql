
-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  beds INTEGER NOT NULL DEFAULT 0,
  baths INTEGER NOT NULL DEFAULT 0,
  area TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Arriendo',
  features TEXT[] NOT NULL DEFAULT '{}',
  availability TEXT NOT NULL DEFAULT 'Disponible',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can read properties
CREATE POLICY "Anyone can view properties"
ON public.properties FOR SELECT
USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert properties"
ON public.properties FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Owner can update
CREATE POLICY "Owner can update properties"
ON public.properties FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Owner can delete
CREATE POLICY "Owner can delete properties"
ON public.properties FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

CREATE POLICY "Anyone can view property images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');
