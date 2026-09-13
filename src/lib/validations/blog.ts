import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric and hyphens'),
  description: z.string().optional(),
})
export type CategoryFormData = z.infer<typeof categorySchema>

export const tagSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric and hyphens'),
})
export type TagFormData = z.infer<typeof tagSchema>

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be valid format'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  category_id: z.string().uuid().nullable().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  published_at: z.string().optional(),
  featured_image: z.string().optional(),
  image_alt: z.string().optional(),
  image_title: z.string().optional(),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  focus_keyword: z.string().optional(),
  og_title: z.string().max(60).optional(),
  og_description: z.string().max(160).optional(),
  og_image: z.string().optional(),
  tags: z.array(z.string()).optional(),
})
export type PostFormData = z.infer<typeof postSchema>
