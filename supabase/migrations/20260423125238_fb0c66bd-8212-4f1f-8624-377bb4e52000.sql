ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS comuna text NOT NULL DEFAULT '';

UPDATE public.properties
SET comuna = CASE
  WHEN location ILIKE '%Pucón%' OR location ILIKE '%Pucon%' THEN 'Pucón'
  WHEN location ILIKE '%Los Ángeles%' OR location ILIKE '%Los Angeles%' THEN 'Los Ángeles'
  WHEN location ILIKE '%Concepción%' OR location ILIKE '%Concepcion%' THEN 'Concepción'
  ELSE comuna
END
WHERE comuna = '';

CREATE INDEX IF NOT EXISTS idx_properties_comuna ON public.properties (comuna);