import { create } from 'zustand'
import axios from 'axios'
import { getToken } from '@/lib/auth-storage'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
}

interface CategoriesStore {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    // ⛔️ لا تعيد الجلب إذا كانت موجودة
    if (get().categories.length > 0) return

    set({ loading: true, error: null })

    try {
      const token = await getToken()
      const res = await axios.get(
        'https://docank.mahmoudalbatran.com/api/categories',
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )

      set({
        categories: res.data?.categories?.data || [],
        loading: false,
      })
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch categories',
        loading: false,
      })
    }
  },
}))
