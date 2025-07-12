import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Schema for item creation/update
const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Type is required"),
  size: z.string().min(1, "Size is required"),
  condition: z.string().min(1, "Condition is required"),
  tags: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  pointValue: z.number().min(1).optional().default(10),
})

// GET /api/items - List items with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const size = searchParams.get("size")
    const condition = searchParams.get("condition")
    const sortBy = searchParams.get("sortBy") || "newest"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")

    const where: Record<string, unknown> = {
      status: "AVAILABLE"
    }

    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive"
      }
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          tags: {
            hasSome: [search]
          }
        }
      ]
    }

    if (size) {
      where.size = size
    }

    if (condition) {
      where.condition = condition
    }

    let orderBy: Record<string, string> = { createdAt: "desc" }
    
    switch (sortBy) {
      case "oldest":
        orderBy = { createdAt: "asc" }
        break
      case "points-low":
        orderBy = { pointValue: "asc" }
        break
      case "points-high":
        orderBy = { pointValue: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const items = await prisma.item.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })

    const total = await prisma.item.count({ where })

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching items:", error)
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    )
  }
}

// POST /api/items - Create new item
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = itemSchema.parse(body)

    const item = await prisma.item.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating item:", error)
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    )
  }
}
