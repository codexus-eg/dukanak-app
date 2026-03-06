import { View, ScrollView } from 'react-native'

export default function ProductDetailsSkeleton() {
  return (
    <View className="flex-1 bg-brand-light">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View className="pt-12 pb-10">
          <View className="mx-5 bg-gray-200 rounded-3xl h-72 animate-pulse" />
        </View>

        {/* NAME & PRICE */}
        <View className="px-5 -mt-6">
          <View className="bg-white rounded-3xl px-5 py-6 space-y-4">
            <View className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <View className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
          </View>
        </View>

        {/* DESCRIPTION */}
        <View className="px-5 mt-5">
          <View className="bg-white rounded-3xl px-5 py-5 space-y-3">
            <View className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            <View className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <View className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          </View>
        </View>

        {/* RELATED PRODUCTS */}
        <View className="mt-8 px-5">
          <View className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />
          <View className="flex-row gap-4">
            {[1, 2, 3].map(i => (
              <View
                key={i}
                className="w-40 h-52 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </View>
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* STICKY BAR */}
      <View className="absolute bottom-12 left-0 right-0 px-5">
        <View className="h-14 bg-gray-300 rounded-2xl animate-pulse" />
      </View>
    </View>
  )
}