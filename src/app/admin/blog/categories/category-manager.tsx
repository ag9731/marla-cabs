'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory, deleteCategory } from '@/lib/actions/category'
import { categorySchema, type CategoryFormData } from '@/lib/validations/blog'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CategoryManager({ initialCategories }: { initialCategories: any[] }) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema)
  })

  // Auto-generate slug from name if user hasn't typed in slug manually
  const name = watch('name')
  
  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    setError(null)
    const result = await createCategory(data)
    if (result.error) {
      setError(result.error)
    } else {
      reset()
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const result = await deleteCategory(id)
      if (result.error) alert(result.error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Create Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Create New Category</h2>
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input 
              {...register('name')} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Travel Guides"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input 
              {...register('slug')} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. travel-guides"
            />
            <p className="text-slate-400 text-xs mt-1">Must be unique, lowercase, no spaces.</p>
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
            <textarea 
              {...register('description')} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={3}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Create Category'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Existing Categories</h2>
        <div className="divide-y divide-slate-100">
          {initialCategories.length === 0 && (
            <p className="text-slate-500 py-4 text-sm">No categories found.</p>
          )}
          {initialCategories.map(cat => (
            <div key={cat.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">{cat.name}</p>
                <p className="text-sm text-slate-500">/{cat.slug}</p>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)}
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
