-- ==============================================================================
-- MARLA CABS BLOG CMS SCHEMA
-- Date: 2026-09-12
-- Description: Foundation tables for the Blog CMS. 
-- Security: Strictly relies on the existing `public.admin_users` table for AuthZ.
-- ==============================================================================

-- 1. Helper Function for Admin Authorization
-- Uses SECURITY DEFINER to securely check the admin_users table without RLS recursion.
-- The search_path is strictly set to prevent path injection attacks.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ==============================================================================
-- 2. CREATE TABLES
-- ==============================================================================

CREATE TABLE public.blog_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.blog_tags (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.blog_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    excerpt text,
    content text,
    featured_image text,
    image_alt text,
    image_title text,
    category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    author_id uuid REFERENCES auth.users(id) ON DELETE RESTRICT,
    status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at timestamp with time zone,
    meta_title text,
    meta_description text,
    focus_keyword text,
    canonical_url text,
    og_title text,
    og_description text,
    og_image text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.blog_post_tags (
    post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    tag_id uuid REFERENCES public.blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- ==============================================================================
-- 3. INDEXES
-- ==============================================================================
-- Removed redundant unique column indexes.
-- Optimize public queries filtering by status and publish date, and relationships
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX idx_blog_posts_category_id ON public.blog_posts(category_id);
CREATE INDEX idx_blog_post_tags_post_id ON public.blog_post_tags(post_id);
CREATE INDEX idx_blog_post_tags_tag_id ON public.blog_post_tags(tag_id);

-- ==============================================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ==============================================================================
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 5. RLS POLICIES FOR ADMINS (Explicit CRUD Policies)
-- ==============================================================================

-- blog_categories
CREATE POLICY "Admins can select blog_categories" ON public.blog_categories FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert blog_categories" ON public.blog_categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update blog_categories" ON public.blog_categories FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete blog_categories" ON public.blog_categories FOR DELETE USING (public.is_admin());

-- blog_tags
CREATE POLICY "Admins can select blog_tags" ON public.blog_tags FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert blog_tags" ON public.blog_tags FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update blog_tags" ON public.blog_tags FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete blog_tags" ON public.blog_tags FOR DELETE USING (public.is_admin());

-- blog_posts
CREATE POLICY "Admins can select blog_posts" ON public.blog_posts FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert blog_posts" ON public.blog_posts FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update blog_posts" ON public.blog_posts FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete blog_posts" ON public.blog_posts FOR DELETE USING (public.is_admin());

-- blog_post_tags
CREATE POLICY "Admins can select blog_post_tags" ON public.blog_post_tags FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert blog_post_tags" ON public.blog_post_tags FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update blog_post_tags" ON public.blog_post_tags FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete blog_post_tags" ON public.blog_post_tags FOR DELETE USING (public.is_admin());

-- ==============================================================================
-- 6. RLS POLICIES FOR PUBLIC READ ACCESS (Strictly Published Content)
-- ==============================================================================

-- PUBLIC POSTS: Only visible if status is 'published'
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT USING (status = 'published');

-- PUBLIC CATEGORIES: Only visible if they are linked to at least one published post
CREATE POLICY "Public can read active categories" ON public.blog_categories FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.blog_posts 
        WHERE category_id = blog_categories.id 
        AND status = 'published'
    )
);

-- PUBLIC TAGS: Only visible if they are linked to at least one published post
CREATE POLICY "Public can read active tags" ON public.blog_tags FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.blog_post_tags bpt
        JOIN public.blog_posts bp ON bp.id = bpt.post_id
        WHERE bpt.tag_id = blog_tags.id 
        AND bp.status = 'published'
    )
);

-- PUBLIC POST TAGS (Relationships): Only visible if the post is published
CREATE POLICY "Public can read published post tags" ON public.blog_post_tags FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.blog_posts
        WHERE id = blog_post_tags.post_id
        AND status = 'published'
    )
);
