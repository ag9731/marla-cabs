'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string | undefined
  onChange: (url: string) => void
  onRemove: () => void
  bucket?: string
}

export function ImageUpload({ value, onChange, onRemove, bucket = 'blog-images' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null)
      const file = e.target.files?.[0]
      if (!file) return
      
      // Validation
      if (!file.type.includes('image/')) {
        setError('Please select an image file.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.')
        return
      }

      setIsUploading(true)
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)
        
      onChange(publicUrl)
      
    } catch (err: unknown) {
      const error = err as any
      console.error('[Supabase Storage Upload Error]:', error)
      
      const errorDetails = [
        `Error: ${error.message || 'Unknown error'}`,
        `Bucket: ${bucket}`,
        `Status: ${error.statusCode || 'N/A'}`,
        `Details: ${JSON.stringify(error)}`
      ].join(' | ')
      
      setError(errorDetails)
    } finally {
      setIsUploading(false)
      // Reset input
      e.target.value = ''
    }
  }, [bucket, onChange, supabase])

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          <div className="relative aspect-video w-full flex items-center justify-center bg-slate-100">
            <Image 
              src={value} 
              alt="Uploaded image" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-white border-t border-slate-200">
            <span className="text-xs text-slate-500 truncate max-w-[200px]" title={value}>
              {value.split('/').pop()}
            </span>
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors relative overflow-hidden">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 mb-3 text-amber-500 animate-spin" />
                <p className="mb-2 text-sm text-slate-500 font-semibold">Uploading...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-600"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
