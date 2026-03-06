import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useFavoritesStore } from '@/store/favoritesStore'
import SafeView from '@/components/SafeView'
import { Ionicons } from '@expo/vector-icons'
import { useProductStore } from '@/store/useProductStore'
import Toast from 'react-native-toast-message'

export default function FavoritesPage() {
  const router = useRouter()
  const favorites = useFavoritesStore(state => state.items);

  const setProduct = useProductStore(s => s.setProduct) ;

  const handlePress = (item: any) => {
      setProduct(item)
      router.push(`/product/${item?.id}`)
    }


//   const favorites = [
//   {
//     id: '1',
//     name: 'سماعات بلوتوث لاسلكية',
//     price: 249,
//     image:
//       'data:image/jpeg;base64,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',
//   },
//   {
//     id: '2',
//     name: 'ساعة ذكية مقاومة للماء',
//     price: 599,
//     image:
//       'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
//   },
//   {
//     id: '3',
//     name: 'حذاء رياضي مريح للجري',
//     price: 399,
//     image:
//       'data:image/jpeg;base64,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',
//   },
//   {
//     id: '4',
//     name: 'حقيبة ظهر جلدية أنيقة',
//     price: 320,
//     image:
//       'data:image/jpeg;base64,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',
//   },
// ]

  const removeFavorite = useFavoritesStore(state => state.removeFavorite)




  // 🌙 Empty State
  if (favorites.length === 0) {
    return (
      <View className="flex-1 bg-[#f6f7f8] items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-white items-center justify-center shadow-xl mb-6">
          {/* <Heart size={36} color="#ef4444" /> */}
          <Ionicons name='heart-outline' size={45} />
        </View>

        <Text className="text-2xl font-bold text-gray-900 mb-2">
          المفضلة فارغة
        </Text>

        <Text className="text-gray-500 text-center leading-6">
          المنتجات التي تضيفها إلى المفضلة ستظهر هنا
        </Text>
      </View>
    )
  }

  return (
    <SafeView className="flex-1 bg-brand-light px-8 pt-4">
      {/* Header */}
      <Text className="text-3xl font-extrabold text-brand-dark mb-4 px-5 py-5">
        المفضلة{' '}
        <Ionicons name='heart' color={"red"} size={25}
        />
      </Text>

      <FlatList
        className="px-3"
        data={favorites}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            className="w-[48%] bg-white rounded-3xl mb-4 shadow-lg overflow-hidden active:scale-[0.98]"
          >
            {/* Image */}
            <View className="relative">
              <Image
                source={{

          // uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
          uri: `${item.image}`,
        
        }}
                className="w-full h-44"
                resizeMode="cover"
              />

              {/* Remove Button */}
              <Pressable
                onPress={() => {
                  removeFavorite(item.id);
                  Toast.show({
                          type: "success",
                          text1: "تم بنجاح",
                          text2: "تمت ازلة المنتج من المفضلة بنجاح",
                        });
                }}
                className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow"
              >
                <Ionicons name='trash-outline' size={17} />
              </Pressable>
            </View>

            {/* Content */}
            <View className="p-4">
              <Text
                className="text-brand-dark font-semibold text-sm mb-1"
                numberOfLines={2}
                style={{ writingDirection: 'rtl' }}
              >
                {item.name}
              </Text>

              <Text className="text-lg font-extrabold text-brand-primary">
                {item.price} شيكل
              </Text>
            </View>
          </Pressable>
        )}
      />
      <View className='h-32' />
    </SafeView>
  )
}


