import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Filters = {
  search: string
  category: string | null
  location: string | null
  isNew: boolean
  hasDiscount: boolean
}

type Store = {
  filters: Filters
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  reset: () => void
}

const initialFilters: Filters = {
  search: '',
  category: null,
  location: null,
  isNew: false,
  hasDiscount: false,
}

export const useProductsFilterStore = create<Store>()(
  persist(
    (set) => ({
      filters: initialFilters,
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      reset: () => set({ filters: initialFilters }),
    }),
    {
      name: 'products-filters',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
