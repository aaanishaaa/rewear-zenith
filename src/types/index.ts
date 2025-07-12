export interface User {
  id: string
  email: string
  name?: string
  image?: string
  points: number
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  id: string
  title: string
  description: string
  category: string
  type: string
  size: string
  condition: string
  tags: string[]
  images: string[]
  status: ItemStatus
  pointValue: number
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
}

export interface SwapRequest {
  id: string
  message?: string
  status: SwapRequestStatus
  createdAt: Date
  requesterId: string
  requester?: User
  itemId: string
  item?: Item
}

export interface Swap {
  id: string
  status: SwapStatus
  completedAt?: Date
  createdAt: Date
  initiatorId: string
  initiator?: User
  receiverId: string
  receiver?: User
  itemId: string
  item?: Item
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum ItemStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING_SWAP = 'PENDING_SWAP',
  SWAPPED = 'SWAPPED',
  REMOVED = 'REMOVED'
}

export enum SwapRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum SwapStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ItemFilters {
  category?: string
  size?: string
  condition?: string
  minPoints?: number
  maxPoints?: number
  search?: string
  sortBy?: 'newest' | 'oldest' | 'points-low' | 'points-high'
}

export interface DashboardStats {
  totalItems: number
  activeSwaps: number
  pointsBalance: number
  itemsSwapped: number
}
