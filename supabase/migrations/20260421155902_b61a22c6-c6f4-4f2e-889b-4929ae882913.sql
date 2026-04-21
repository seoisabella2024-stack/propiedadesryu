DROP POLICY IF EXISTS "Owner can update properties" ON public.properties;
DROP POLICY IF EXISTS "Owner can delete properties" ON public.properties;

CREATE POLICY "Authenticated users can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (true);