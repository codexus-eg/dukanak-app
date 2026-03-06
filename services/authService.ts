import { useCartStore } from '@/store/cartStore'
import { mergeCarts } from '@/utils/mergeCarts'
import { fetchServerCart } from '@/services/cartApi'

export async function handleLogin(email: string, password: string) {
  // 1️⃣ Login request
  const res = await fetch('https://your-api.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const { token } = await res.json()

  // 2️⃣ Get local cart
  const localItems = useCartStore.getState().items

  // 3️⃣ Get server cart
  const serverCart = await fetchServerCart(token)

  // 4️⃣ Merge carts
  const mergedCart = mergeCarts(localItems, serverCart.items)

  // 5️⃣ Save merged cart to Zustand
  useCartStore.getState().setItems(mergedCart)

  // 6️⃣ Sync merged cart back to server
  // useCartStore.getState().syncCart()
}
