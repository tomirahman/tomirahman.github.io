-- Add user_id column to photos table for ownership tracking
ALTER TABLE public.photos ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Drop existing SELECT policy and recreate with proper structure
DROP POLICY IF EXISTS "Photos are publicly viewable" ON public.photos;

-- Photos are publicly viewable (read access for everyone)
CREATE POLICY "Photos are publicly viewable"
ON public.photos
FOR SELECT
USING (true);

-- Only authenticated users can insert photos (with ownership)
CREATE POLICY "Authenticated users can insert photos"
ON public.photos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Users can only update their own photos
CREATE POLICY "Users can update own photos"
ON public.photos
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own photos
CREATE POLICY "Users can delete own photos"
ON public.photos
FOR DELETE
USING (auth.uid() = user_id);

-- Drop the insecure storage upload policy
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;

-- Create authenticated upload policy for storage
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update photos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete photos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Add constraints for input validation at database level
ALTER TABLE public.photos ADD CONSTRAINT alt_length CHECK (length(alt) <= 200);
ALTER TABLE public.photos ADD CONSTRAINT caption_length CHECK (caption IS NULL OR length(caption) <= 500);
ALTER TABLE public.photos ADD CONSTRAINT quote_length CHECK (quote IS NULL OR length(quote) <= 300);