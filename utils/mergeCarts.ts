import { CartItem } from '@/store/cartStore'

type ServerItem = {
  product_id: string
  quantity: number
}

export function mergeCarts(
  local: CartItem[],
  server: ServerItem[]
): CartItem[] {
  const map = new Map<string, CartItem>()

  // 1️⃣ Put server items first
  server.forEach(item => {
    map.set(item.product_id, {
      id: item.product_id,
      quantity: item.quantity,
      name: '',   // optional, will be hydrated later
      price: 0,   // optional
    })
  })

  // 2️⃣ Merge local items (local wins)
  local.forEach(item => {
    if (map.has(item.id)) {
      map.set(item.id, {
        ...item,
        quantity: map.get(item.id)!.quantity + item.quantity,
      })
    } else {
      map.set(item.id, item)
    }
  })

  return Array.from(map.values())
}
