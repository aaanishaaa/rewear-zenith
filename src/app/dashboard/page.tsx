"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Plus, 
  Package, 
  ArrowUpDown, 
  Coins, 
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

interface DashboardStats {
  totalItems: number
  activeSwaps: number
  pointsBalance: number
  itemsSwapped: number
}

interface UserItem {
  id: string
  title: string
  description: string
  category: string
  condition: string
  pointValue: number
  status: string
  createdAt: string
  images: string[]
}

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    activeSwaps: 0,
    pointsBalance: 100,
    itemsSwapped: 0
  })
  const [userItems, setUserItems] = useState<UserItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }
  }, [status])

  useEffect(() => {
    // Mock data for demo
    setStats({
      totalItems: 12,
      activeSwaps: 3,
      pointsBalance: 150,
      itemsSwapped: 8
    })

    setUserItems([
      {
        id: "1",
        title: "Vintage Denim Jacket",
        description: "Classic 90s style denim jacket",
        category: "Jackets",
        condition: "Excellent",
        pointValue: 25,
        status: "AVAILABLE",
        createdAt: "2024-01-15",
        images: []
      },
      {
        id: "2",
        title: "Summer Floral Dress",
        description: "Beautiful summer dress",
        category: "Dresses",
        condition: "Like New",
        pointValue: 30,
        status: "PENDING_SWAP",
        createdAt: "2024-01-10",
        images: []
      }
    ])

    setIsLoading(false)
  }, [])

  // Show loading during session loading
  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800"
      case "PENDING_SWAP":
        return "bg-yellow-100 text-yellow-800"
      case "SWAPPED":
        return "bg-blue-100 text-blue-800"
      case "REMOVED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user?.name || "User"}! Here&apos;s your ReWear activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Items you&apos;ve listed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSwaps}</div>
              <p className="text-xs text-muted-foreground">
                Ongoing exchanges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Balance</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pointsBalance}</div>
              <p className="text-xs text-muted-foreground">
                Available to spend
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Swapped</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.itemsSwapped}</div>
              <p className="text-xs text-muted-foreground">
                Successfully exchanged
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/items/new">
                <Plus className="h-4 w-4 mr-2" />
                List New Item
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/items">
                Browse Items
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/swaps">
                View Swaps
              </Link>
            </Button>
          </div>
        </div>

        {/* My Items */}
        <Card>
          <CardHeader>
            <CardTitle>My Items</CardTitle>
            <CardDescription>
              Manage your listed clothing items
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by listing your first item to join the ReWear community.
                </p>
                <Button asChild>
                  <Link href="/items/new">
                    <Plus className="h-4 w-4 mr-2" />
                    List Your First Item
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.category} • {item.condition}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant="secondary"
                            className={getStatusColor(item.status)}
                          >
                            {item.status.replace("_", " ")}
                          </Badge>
                          <span className="text-sm text-gray-500">{item.pointValue} pts</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/items/${item.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/items/${item.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
