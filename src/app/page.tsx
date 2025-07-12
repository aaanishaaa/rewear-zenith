import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Recycle, 
  Users, 
  Coins, 
  ArrowRight,
  Leaf
} from "lucide-react"

// Mock data for featured items
const featuredItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "Classic 90s style denim jacket in excellent condition",
    category: "Jackets",
    condition: "Excellent",
    pointValue: 25,
    images: ["/placeholder-jacket.jpg"],
    tags: ["vintage", "denim", "90s"]
  },
  {
    id: "2", 
    title: "Designer Summer Dress",
    description: "Beautiful floral summer dress, perfect for occasions",
    category: "Dresses",
    condition: "Like New",
    pointValue: 35,
    images: ["/placeholder-dress.jpg"],
    tags: ["designer", "summer", "floral"]
  },
  {
    id: "3",
    title: "Cozy Wool Sweater",
    description: "Warm and comfortable wool sweater for winter",
    category: "Sweaters",
    condition: "Good",
    pointValue: 20,
    images: ["/placeholder-sweater.jpg"],
    tags: ["wool", "winter", "cozy"]
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Leaf className="w-4 h-4 mr-2" />
                  Sustainable Fashion
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Swap, Trade & 
                  <span className="text-primary"> ReWear</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Join our community of fashion-forward individuals who believe in sustainable style. 
                  Exchange clothing, earn points, and reduce textile waste.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/items">
                    Start Browsing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/items/new">
                    List an Item
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Items Swapped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="transform rotate-3 hover:rotate-0 transition-transform">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Vintage Finds</h3>
                      <p className="text-sm text-muted-foreground">Unique pieces</p>
                    </CardContent>
                  </Card>
                  <Card className="transform -rotate-2 hover:rotate-0 transition-transform">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Designer Items</h3>
                      <p className="text-sm text-muted-foreground">Premium quality</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="transform -rotate-1 hover:rotate-0 transition-transform">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Casual Wear</h3>
                      <p className="text-sm text-muted-foreground">Everyday style</p>
                    </CardContent>
                  </Card>
                  <Card className="transform rotate-2 hover:rotate-0 transition-transform">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Accessories</h3>
                      <p className="text-sm text-muted-foreground">Perfect touches</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ReWear?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the sustainable fashion revolution with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Eco-Friendly</CardTitle>
                <CardDescription>
                  Reduce textile waste by giving clothes a second life through our platform
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Point System</CardTitle>
                <CardDescription>
                  Earn points by listing items and use them to get clothes you love
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with like-minded fashion enthusiasts in your area
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
              <p className="text-xl text-muted-foreground">
                Discover the latest additions to our community
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/items">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant="secondary">{item.pointValue} pts</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{item.condition}</Badge>
                    <Button size="sm" asChild>
                      <Link href={`/items/${item.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already making a difference. 
            Start swapping, trading, and building your dream wardrobe today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/signup">
                Join ReWear
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/how-it-works">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
