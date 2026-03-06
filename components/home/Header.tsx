import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useCartStore } from '@/store/cartStore'

interface HomeHeaderProps {
  count?: number
}

export default function Header({ count = 0 }: HomeHeaderProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const cartCount = useCartStore(state => state.getTotalItems())

  // const handleSearch = async () => {
  //   const trimmed = query.trim()
  //   if (trimmed.length < 2) {
  //     Alert.alert('تنبيه', 'الرجاء إدخال كلمتين على الأقل')
  //     return
  //   }

  //   try {
  //     setLoading(true)
  //     const response = await fetch(
  //       `https://your-api.com/products/search?q=${encodeURIComponent(trimmed)}`
  //     )
  //     if (!response.ok) throw new Error('Request failed')

  //     const data = await response.json()
  //     if (!Array.isArray(data) || data.length === 0) {
  //       Alert.alert('لا توجد نتائج', 'لم يتم العثور على منتجات')
  //       return
  //     }

  //     router.push({
  //       pathname: '/products',
  //       params: {
  //         q: trimmed,
  //         results: JSON.stringify(data),
  //       },
  //     })
  //   } catch {
  //     Alert.alert('خطأ', 'حدث خطأ أثناء البحث')
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  const handleSearch = () => {
  const trimmed = query.trim()

  if (trimmed.length < 2) {
    Alert.alert('تنبيه', 'الرجاء إدخال كلمتين على الأقل')
    return
  }

  router.push({
    pathname: '/products',
    params: {
      search: trimmed,
    },
  })

  setQuery('')
}


  return (
    <View className="bg-[#F8FAFC] px-4 pt-2 pb-4">
      <View className="flex-row items-center gap-3">
        {/* Logo */}
        {/* <Image
          source={require('@/assets/images/dokanak.png')}
          style={{
    width: 120,
    height: 60,
    // transform: [{ scale: 1.5 }], // جرّب 1.1 – 1.5
  }}
        /> */}

        <Image
          source={require('@/assets/images/icon.png')}
          style={{
    width: 60,
    height: 60,
    transform: [{ scale: 1.8 }], // جرّب 1.1 – 1.5
  }}
        />

        {/* Search */}
        {/* Search */}
<View
  style={{
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 6,
  }}
>
  <Ionicons
    name="search-outline"
    size={22}
    color="#6B7280"
    style={{ marginRight: 8 }}
  />

  <TextInput
    value={query}
    onChangeText={setQuery}
    placeholder="ابحث عن المنتجات"
    placeholderTextColor="#9CA3AF"
    style={{
      flex: 1,
      fontSize: 14,
      color: '#111827',
      paddingVertical: 0, // important for Android
    }}
    returnKeyType="search"
    onSubmitEditing={handleSearch}
  />

  {loading && (
    <ActivityIndicator size="small" color="#7CC7A4" />
  )}
</View>


        {/* Cart */}
        <Pressable
          onPress={() => router.push('/cart')}
          className="relative"
        >
          <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-sm">
            <Ionicons name="cart-outline" size={24} color="#1F2937" />
          </View>

          {cartCount > 0 && (
            <View className="absolute -top-1 -left-1 bg-[#F6A64D] min-w-[18px] h-[18px] rounded-full items-center justify-center px-1">
              <Text className="text-white text-[10px] font-bold">
                {cartCount}
              </Text>
            </View>
          )}

          
        </Pressable>
      </View>
    </View>
  )
}
