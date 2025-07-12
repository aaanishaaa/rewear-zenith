"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Filter, Heart } from "lucide-react"

interface Item {
  id: string
  title: string
  description: string
  category: string
  condition: string
  pointValue: number
  images: string[]
  user: {
    id: string
    name: string
    image: string
  }
}

const mockItems: Item[] = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "Classic 90s style denim jacket in excellent condition",
    category: "Jackets",
    condition: "Excellent",
    pointValue: 25,
    images: [],
    user: {
      id: "user1",
      name: "Sarah Johnson",
      image: ""
    }
  },
  {
    id: "2",
    title: "Designer Summer Dress",
    description: "Beautiful floral summer dress, perfect for occasions",
    category: "Dresses", 
    condition: "Like New",
    pointValue: 35,
    images: [],
    user: {
      id: "user2",
      name: "Emily Chen",
      image: ""
    }
  },
  {
    id: "3",
    title: "Cozy Wool Sweater",
    description: "Warm and comfortable wool sweater for winter",
    category: "Sweaters",
    condition: "Good",
    pointValue: 20,
    images: [],
    user: {
      id: "user3",
      name: "Maria Rodriguez",
      image: ""
    }
  },
  {
    id: "4",
    title: "Leather Boots",
    description: "Genuine leather ankle boots, barely worn",
    category: "Shoes",
    condition: "Excellent",
    pointValue: 40,
    images: [],
    user: {
      id: "user4",
      name: "Jessica Wong",
      image: ""
    }
  },
  {
    id: "5",
    title: "Silk Blouse",
    description: "Elegant silk blouse perfect for work",
    category: "Tops",
    condition: "Very Good",
    pointValue: 30,
    images: [],
    user: {
      id: "user5",
      name: "Amanda Lee",
      image: ""
    }
  },
  {
    id: "6",
    title: "High-Waisted Jeans",
    description: "Trendy high-waisted jeans in dark wash",
    category: "Jeans",
    condition: "Good",
    pointValue: 22,
    images: [],
    user: {
      id: "user6",
      name: "Rachel Kim",
      image: ""
    }
  }
]

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function ItemsPage() {
  const [items] = useState<Item[]>(mockItems)
  const [filteredItems, setFilteredItems] = useState<Item[]>(mockItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading] = useState(false)

  const categories = ["Dresses", "Jackets", "Sweaters", "Jeans", "Shoes", "Tops", "Accessories"]
  const conditions = ["Excellent", "Like New", "Very Good", "Good", "Fair"]

  useEffect(() => {
    let filtered = [...items]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by condition
    if (selectedCondition !== "all") {
      filtered = filtered.filter(item => item.condition === selectedCondition)
    }

    // Sort items
    switch (sortBy) {
      case "points-low":
        filtered.sort((a, b) => a.pointValue - b.pointValue)
        break
      case "points-high":
        filtered.sort((a, b) => b.pointValue - a.pointValue)
        break
      case "oldest":
        // For demo, we'll just reverse the order
        filtered.reverse()
        break
      default: // newest
        // Keep default order
        break
    }

    setFilteredItems(filtered)
  }, [items, searchQuery, selectedCategory, selectedCondition, sortBy])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Like New":
        return "bg-blue-100 text-blue-800"
      case "Very Good":
        return "bg-purple-100 text-purple-800"
      case "Good":
        return "bg-yellow-100 text-yellow-800"
      case "Fair":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">
            Discover amazing clothing pieces from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition Filter */}
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="points-low">Points: Low to High</SelectItem>
                <SelectItem value="points-high">Points: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedCondition("all")
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200"></div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <Badge variant="secondary" className="ml-2">
                      {item.pointValue} pts
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline"
                      className={getConditionColor(item.condition)}
                    >
                      {item.condition}
                    </Badge>
                    <span className="text-sm text-gray-500">{item.category}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{item.user.name}</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/items/${item.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Items
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
