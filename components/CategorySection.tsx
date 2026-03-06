

import { View, Text, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductsSliderSkeleton from './ProductsSliderSkeleton'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { useCartStore } from '@/store/cartStore'
import { getToken } from '@/lib/auth-storage'
import ProductCard from './ProductCard'

export default function CategorySection({ category }: any) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const token = await getToken();
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", token)

    try {
      const res = await axios.get(
        'https://docank.mahmoudalbatran.com/api/products',
        {
          headers: {
            //  Authorization: `Bearer ${token}` 
            },
          params: { 
            type: category?.name,
            // condition: filters.condition,
            // search,
            per_page: 20, 
          },
        }
      )
      setProducts(res.data.products.data)
    } finally {
      setLoading(false)
    }
  }
  if (!category || products?.length == 0) return null

  return (
    <View className="mb-6 ">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-extrabold text-gray-600 pt-5">
          {category?.name}
        </Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/products',
              params: {
                categoryId: category.id,
                categoryName: category.name,
              },
            })
          }
        >
          <Text className="text-brand-primary font-extrabold text-xl">عرض الكل</Text>
        </Pressable>
      </View>

      {/* Products */}
      {loading ? (
        <ProductsSliderSkeleton />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />
      )}
    </View>
  )
}
