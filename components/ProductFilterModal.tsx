import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native'

type Filters = {
  category: string[]
  location: string[]
  newProducts: boolean
  discount: boolean
}

type ProductFilterModalProps = {
  visible: boolean
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  onClose: () => void
}

const categories = ['إلكترونيات', 'أزياء', 'أدوات منزلية']
const locations = ['الرياض', 'جدة', 'مكة']

export default function ProductFilterModal({
  visible,
  filters,
  setFilters,
  onClose,
}: ProductFilterModalProps) {
  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat],
    }))
  }

  const toggleLocation = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(loc)
        ? prev.location.filter(l => l !== loc)
        : [...prev.location, loc],
    }))
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">تصفية المنتجات</Text>
            <Pressable onPress={onClose}>
              <Text className="text-gray-500 text-lg">✕</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Categories */}
            <Text className="font-semibold mt-2 mb-2">الأقسام</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map(cat => (
                <Pressable
                  key={cat}
                  onPress={() => toggleCategory(cat)}
                  className={`px-3 py-2 rounded-full border ${
                    filters.category.includes(cat)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Text
                    className={`${
                      filters.category.includes(cat) ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Locations */}
            <Text className="font-semibold mt-4 mb-2">الموقع</Text>
            <View className="flex-row flex-wrap gap-2">
              {locations.map(loc => (
                <Pressable
                  key={loc}
                  onPress={() => toggleLocation(loc)}
                  className={`px-3 py-2 rounded-full border ${
                    filters.location.includes(loc)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Text
                    className={`${
                      filters.location.includes(loc) ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {loc}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* New Products */}
            <Pressable
              onPress={() =>
                setFilters(prev => ({ ...prev, newProducts: !prev.newProducts }))
              }
              className={`mt-4 px-4 py-2 rounded-lg border ${
                filters.newProducts ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
              }`}
            >
              <Text
                className={`${
                  filters.newProducts ? 'text-white' : 'text-gray-700'
                }`}
              >
                منتجات جديدة
              </Text>
            </Pressable>

            {/* Discounts */}
            <Pressable
              onPress={() =>
                setFilters(prev => ({ ...prev, discount: !prev.discount }))
              }
              className={`mt-2 px-4 py-2 rounded-lg border ${
                filters.discount ? 'bg-red-500 border-red-500' : 'border-gray-300'
              }`}
            >
              <Text
                className={`${filters.discount ? 'text-white' : 'text-gray-700'}`}
              >
                خصومات
              </Text>
            </Pressable>

            {/* Close Button */}
            <Pressable
              onPress={onClose}
              className="mb-20 mt-6 bg-gray-200 rounded-full py-3 items-center"
            >
              <Text className="text-black font-bold">إغلاق</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
