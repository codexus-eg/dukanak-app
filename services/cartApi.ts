export async function fetchServerCart(token: string) {
  const res = await fetch('https://your-api.com/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch cart')
  }

  return res.json()
}
