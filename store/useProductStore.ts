import { create } from 'zustand'

type Product = {
  id: string
  name: string
  description?: string
  image: string
  price: number
}

type ProductStore = {
  selectedProduct: Product | null
  setProduct: (product: Product) => void
  clearProduct: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setProduct: (product) => set({ selectedProduct: product }),
  clearProduct: () => set({ selectedProduct: null }),
}))
