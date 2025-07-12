import { create } from 'zustand'
import { Item, User, SwapRequest, ItemFilters } from '@/types'

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Items state
  items: Item[]
  setItems: (items: Item[]) => void
  addItem: (item: Item) => void
  updateItem: (id: string, item: Partial<Item>) => void
  removeItem: (id: string) => void
  
  // Filters state
  filters: ItemFilters
  setFilters: (filters: ItemFilters) => void
  
  // Swap requests state
  swapRequests: SwapRequest[]
  setSwapRequests: (requests: SwapRequest[]) => void
  addSwapRequest: (request: SwapRequest) => void
  updateSwapRequest: (id: string, request: Partial<SwapRequest>) => void
  
  // UI state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Search state
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Items state
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  
  // Filters state
  filters: {},
  setFilters: (filters) => set({ filters }),
  
  // Swap requests state
  swapRequests: [],
  setSwapRequests: (swapRequests) => set({ swapRequests }),
  addSwapRequest: (request) =>
    set((state) => ({ swapRequests: [...state.swapRequests, request] })),
  updateSwapRequest: (id, updatedRequest) =>
    set((state) => ({
      swapRequests: state.swapRequests.map((request) =>
        request.id === id ? { ...request, ...updatedRequest } : request
      ),
    })),
  
  // UI state
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  // Search state
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
