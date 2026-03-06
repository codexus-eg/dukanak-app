import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function ProductNotFound() {
  return (
    <View className="flex-1 bg-brand-light items-center justify-center px-6">
      <View className="bg-white rounded-3xl p-8 items-center shadow shadow-black/10">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />

        <Text className="text-xl font-extrabold text-brand-dark mt-4">
          المنتج غير موجود
        </Text>

        <Text className="text-gray-500 text-center mt-2 leading-6">
          يبدو أن هذا المنتج غير متوفر أو تم حذفه
        </Text>

        <Pressable
          onPress={() => router.replace('/')}
          className="mt-6 bg-brand-primary px-8 py-3 rounded-full"
        >
          <Text className="text-white font-bold">
            العودة للرئيسية
          </Text>
        </Pressable>
      </View>
    </View>
  )
}