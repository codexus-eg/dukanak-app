
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  categoryId?: string,
}



type CartStore = {
  items: CartItem[]
  lastSyncedAt: number | null


  addItem: (item: CartItem) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  removeItem: (id: string) => void

  clearCart: () => void
  setItems: (items: CartItem[]) => void


  subtotal: () => number
  getTotalItems: () => number

  shippingCost: () => number   // 👈 جديد
  totalWithShipping: () => number // 👈 اختياري 🔥

  // syncCart: () => Promise<void>
}



export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastSyncedAt: null,

      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      increaseQty: id =>
        set(state => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decreaseQty: id =>
        set(state => ({
          items: state.items
            .map(i =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter(i => i.quantity > 0),
        })),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),



      removeItem: id =>
        set(state => ({
          items: state.items.filter(i => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      setItems: items => set({ items }),


      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      /* ---------- API Sync ---------- */

      // syncCart: async () => {
      //   try {
      //     const { items } = get()

      //     // 🛑 skip sync if cart empty
      //     if (!items.length) return

      //     await fetch('https://your-api.com/cart/sync', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: 'Bearer USER_TOKEN', // replace dynamically
      //       },
      //       body: JSON.stringify({
      //         items: items.map(i => ({
      //           product_id: i.id,
      //           quantity: i.quantity,
      //         })),
      //       }),
      //     })

      //     set({ lastSyncedAt: Date.now() })
      //   } catch (error) {
      //     console.log('Cart sync failed', error)
      //   }
      // },

      // shippingCost: () => {
      //   const itemTypesCount = get().items.length
      //   console.log('Calculating shipping cost for', get().items, 'item types')

      //   if (itemTypesCount === 0) return 0
      //   if (itemTypesCount <= 3) return 25

      //   return 25 + (itemTypesCount - 3) * 5
      // },

      // shippingCost: () => {
      //   const items = get().items
      //   if (!items.length) return 0

      //   const categoryCount = new Set(
      //     items.map(item => item.categoryId)
      //   ).size

      //   if (categoryCount === 1) return 14
      //   if (categoryCount === 2) return 24

      //   return 24 + (categoryCount - 2) * 4
      // },
      shippingCost: () => {
  const items = get().items
  if (!items.length) return 0

  // categoryId => Set of productIds
  const categoryMap = new Map<number, Set<number>>()

  items.forEach(item => {
    if (!categoryMap.has(item.categoryId)) {
      categoryMap.set(item.categoryId, new Set())
    }
    categoryMap.get(item.categoryId)!.add(item.id)
  })

  const categoryCount = categoryMap.size

  // 🟢 حالة خاصة: فئة واحدة + منتج واحد فقط
  if (categoryCount === 1) {
    const [products] = categoryMap.values()
    if (products.size === 1) return 14
  }

  // 🧱 الأساس
  return 24 + (categoryCount - 1) * 4
},



      totalWithShipping: () => {
        return get().subtotal() + get().shippingCost()
      },

    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
