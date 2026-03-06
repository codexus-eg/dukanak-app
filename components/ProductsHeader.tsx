import { View, TextInput, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useProductsFilterStore } from '@/store/useProductsFilterStore'

export default function ProductsHeader() {
  const router = useRouter()
  const { filters, setFilter } = useProductsFilterStore()

  return (
    <View className="flex-row items-center gap-3 px-4 py-3 bg-white">
      <TextInput
        value={filters.search}
        onChangeText={(t) => setFilter('search', t)}
        placeholder="ابحث عن منتج"
        className="flex-1 bg-neutral-100 rounded-full px-4 py-2"
      />

      <Pressable
        onPress={() => router.push('/modal/filters')}
        className="bg-black px-4 py-2 rounded-full"
      >
        <Text className="text-white font-bold">تصفية</Text>
      </Pressable>
    </View>
  )
}
