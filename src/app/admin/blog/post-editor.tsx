'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost, updatePost } from '@/lib/actions/blog'
import { postSchema, type PostFormData } from '@/lib/validations/blog'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

import Link from 'next/link'

export function PostEditor({ 
  initialData, 
  categories, 
  tags 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[], 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[] 
}) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<PostFormData> = initialData ? {
    ...initialData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: initialData.blog_post_tags?.map((pt: any) => pt.tag_id) || [],
    category_id: initialData.category_id || undefined
  } : {
    status: 'draft',
    tags: [],
    content: ''
  }

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues
  })

  // Auto-slug generation for new posts
  const title = watch('title')
  const slug = watch('slug')
  
  useEffect(() => {
    if (!initialData && title && (!slug || slug === generateSlug(title.slice(0, -1)))) {
      setValue('slug', generateSlug(title), { shouldValidate: true })
    }
  }, [title, initialData, setValue, slug])

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    setError(null)
    
    let result
    if (initialData) {
      result = await updatePost(initialData.id, data)
    } else {
      result = await createPost(data)
    }
    
    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else if (initialData) {
      setIsSubmitting(false)
      alert("Post updated successfully!")
    }
    // If it's a new post, the action redirects, so we don't need to reset isSubmitting
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-20">
      
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-4 z-10">
        <h1 className="text-2xl font-bold text-slate-900">{initialData ? 'Edit Post' : 'Create New Post'}</h1>
        <div className="flex gap-3 items-center">
          <Link href="/admin/blog" className="text-slate-500 hover:text-slate-800">Cancel</Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (initialData ? 'Update Post' : 'Save Post')}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input 
                {...register('title')} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input 
                {...register('slug')} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea 
                {...register('excerpt')} 
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select {...register('category_id')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                  <option value="">No Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select {...register('status')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Publish Date (Optional)</label>
              <input type="datetime-local" {...register('published_at')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Featured Image</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Image</label>
              <Controller
                control={control}
                name="featured_image"
                render={({ field: { onChange, value } }) => (
                  <ImageUpload 
                    value={value} 
                    onChange={onChange} 
                    onRemove={() => onChange('')} 
                    bucket="blog-images" 
                  />
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alt Text</label>
                <input {...register('image_alt')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image Title</label>
                <input {...register('image_title')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Content</h2>
            <div>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, value } }) => (
                  <RichTextEditor value={value || ''} onChange={onChange} />
                )}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>
          </div>
          
          {/* SEO Metadata */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">SEO</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
                  <input {...register('meta_title')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                  <textarea {...register('meta_description')} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Focus Keyword</label>
                  <input {...register('focus_keyword')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">OG Title</label>
                  <input {...register('og_title')} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">OG Description</label>
                  <textarea {...register('og_description')} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">OG Image Upload</label>
                  <Controller
                    control={control}
                    name="og_image"
                    render={({ field: { onChange, value } }) => (
                      <ImageUpload 
                        value={value} 
                        onChange={onChange} 
                        onRemove={() => onChange('')} 
                        bucket="blog-images" 
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 sticky top-24">
            <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Tags</h2>
            
            <div>
              <div className="space-y-2 max-h-96 overflow-y-auto p-2 border border-slate-100 rounded">
                {tags.map(t => (
                  <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value={t.id} {...register('tags')} className="rounded text-amber-600 focus:ring-amber-500" />
                    <span className="text-sm text-slate-700">{t.name}</span>
                  </label>
                ))}
                {tags.length === 0 && <span className="text-sm text-slate-400">No tags available.</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
