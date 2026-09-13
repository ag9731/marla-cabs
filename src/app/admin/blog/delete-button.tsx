'use client'

import { deletePost } from '@/lib/actions/blog'
import { useState } from 'react'

export function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      setIsDeleting(true)
      const result = await deletePost(id)
      if (result.error) {
        alert(result.error)
        setIsDeleting(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}
