'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTag, deleteTag } from '@/lib/actions/tag'
import { tagSchema, type TagFormData } from '@/lib/validations/blog'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TagManager({ initialTags }: { initialTags: any[] }) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema)
  })

  const onSubmit = async (data: TagFormData) => {
    setIsSubmitting(true)
    setError(null)
    const result = await createTag(data)
    if (result.error) {
      setError(result.error)
    } else {
      reset()
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      const result = await deleteTag(id)
      if (result.error) alert(result.error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Create Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Create New Tag</h2>
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input 
              {...register('name')} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Tips"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input 
              {...register('slug')} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. tips"
            />
            <p className="text-slate-400 text-xs mt-1">Must be unique, lowercase, no spaces.</p>
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Create Tag'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Existing Tags</h2>
        <div className="divide-y divide-slate-100">
          {initialTags.length === 0 && (
            <p className="text-slate-500 py-4 text-sm">No tags found.</p>
          )}
          {initialTags.map(tag => (
            <div key={tag.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">{tag.name}</p>
                <p className="text-sm text-slate-500">#{tag.slug}</p>
              </div>
              <button 
                onClick={() => handleDelete(tag.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
