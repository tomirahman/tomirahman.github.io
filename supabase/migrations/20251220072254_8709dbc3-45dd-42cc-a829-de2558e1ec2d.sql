-- Fix security issues by removing all write policies
-- This is a read-only public website with no auth/upload features

-- Drop INSERT policy on photos table (fixes MISSING_RLS issue)
DROP POLICY IF EXISTS "Authenticated users can insert photos" ON public.photos;

-- Drop UPDATE policy on photos table
DROP POLICY IF EXISTS "Users can update own photos" ON public.photos;

-- Drop DELETE policy on photos table  
DROP POLICY IF EXISTS "Users can delete own photos" ON public.photos;

-- Drop storage UPDATE policy (fixes STORAGE_EXPOSURE issue)
DROP POLICY IF EXISTS "Authenticated users can update photos" ON storage.objects;

-- Drop storage DELETE policy (fixes STORAGE_EXPOSURE issue)
DROP POLICY IF EXISTS "Authenticated users can delete photos" ON storage.objects;

-- Drop storage INSERT policy if exists
DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;