// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// export type FavoriteProduct = {
//   id: string
//   name: string
//   price: number
//   image: string
// }

// type FavoritesStore = {
//   items: FavoriteProduct[]
//   toggleFavorite: (product: FavoriteProduct) => void
//   removeFavorite: (id: string) => void
//   isFavorite: (id: string) => boolean
//   clearFavorites: () => void
// }

// export const useFavoritesStore = create<FavoritesStore>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       toggleFavorite: product => {
//         const exists = get().items.find(i => i.id === product.id)
//         if (exists) {
//           set({ items: get().items.filter(i => i.id !== product.id) })
//         } else {
//           set({ items: [...get().items, product] })
//         }
//       },

//       removeFavorite: id =>
//         set({ items: get().items.filter(i => i.id !== id) }),

//       isFavorite: id =>
//         get().items.some(i => i.id === id),

//       clearFavorites: () => set({ items: [] }),
//     }),
//     {
//       name: 'favorites-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// )







import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type FavoriteProduct = {
  id: string
  name: string
  price: number
  image: string,
}

type FavoritesStore = {
  items: FavoriteProduct[]
  toggleFavorite: (product: FavoriteProduct) => boolean
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: product => {
        const exists = get().items.some(i => i.id === product.id)

        if (exists) {
          set({
            items: get().items.filter(i => i.id !== product.id),
          })
          return false
        }

        set({
          items: [...get().items, product],
        })
        return true
      },

      removeFavorite: id =>
        set({ items: get().items.filter(i => i.id !== id) }),

      isFavorite: id =>
        get().items.some(i => i.id === id),

      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
