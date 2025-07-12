"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const Header = dynamic(() => import('./header').then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <HeaderSkeleton />
})

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">ReWear</span>
          </Link>
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  )
}

function ClientHeader() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <HeaderSkeleton />
  }

  return <Header />
}

export { ClientHeader as Header }
