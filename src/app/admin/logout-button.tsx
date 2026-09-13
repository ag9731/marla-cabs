'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logout } from './actions'
import { useState } from 'react'

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button 
      variant="outline" 
      onClick={async () => {
        setIsLoading(true)
        await logout()
      }}
      disabled={isLoading}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}
