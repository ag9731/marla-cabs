-- ==============================================================================
-- MARLA CABS BLOG STORAGE SCHEMA
-- Description: Creates the blog-images storage bucket and associated RLS policies.
-- Security: Public read access. Admin-only write access using public.is_admin().
-- ==============================================================================

-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policy: Anyone can view/download images from blog-images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- 4. Admin Upload Policy: Only admins can upload files
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'blog-images' 
    AND public.is_admin()
);

-- 5. Admin Update Policy: Only admins can update files
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'blog-images' 
    AND public.is_admin()
);

-- 6. Admin Delete Policy: Only admins can delete files
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'blog-images' 
    AND public.is_admin()
);
