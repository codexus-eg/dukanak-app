import { FlatList, View } from 'react-native'

export default function ProductsSliderSkeleton() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={() => (
        <View
          className="mr-3 rounded-2xl bg-gray-200"
          style={{ width: 150, height: 180 }}
        />
      )}
    />
  )
}
