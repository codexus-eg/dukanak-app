// app/(tabs)/categories.tsx
import React from 'react'
import { View, FlatList, Pressable, ImageBackground, Text, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import SafeView from '@/components/SafeView'
import { useCategoriesStore } from '@/store/categories.store'
import CategoryCard from '@/components/CategoryCard'

// data/mockCategories.ts
// data/mockCategories.ts



type Props = {
  title: string
  image: string
  onPress?: () => void
}

// export const CategoryCard = ({ title, image, onPress }: Props) => {

//   return (
//     <Pressable
//       onPress={onPress}
//       className="flex-1 h-40 rounded-3xl overflow-hidden active:scale-95"
//     >
//       <ImageBackground source={image} className="flex-1">
//         {/* Cinematic Overlay */}
//         <View className="flex-1 bg-black/55 justify-center items-center">
//           <Text className="text-neutral-300 text-2xl font-extrabold tracking-wide">
//             {title}
//           </Text>
//         </View>
//       </ImageBackground>
//     </Pressable>
//   )
// }

export function CategorySkeletonCard() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E5E7EB', // gray-200
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      {/* Image placeholder */}
      <View
        style={{
          height: 120,
          backgroundColor: '#D1D5DB', // gray-300
        }}
      />

      {/* Content placeholder */}
      <View style={{ padding: 16 }}>
        <View
          style={{
            height: 14,
            width: '60%',
            backgroundColor: '#D1D5DB',
            borderRadius: 6,
            alignSelf: 'center',
          }}
        />

        <View
          style={{
            height: 10,
            width: '80%',
            backgroundColor: '#E5E7EB',
            borderRadius: 6,
            marginTop: 8,
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  )
}

export function CategoryGridCard({ item, bgColor, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      className="active:scale-95 flex-1"
    >
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: 20,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        {/* IMAGE */}
        <ImageBackground
          source={{ 
            // uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}` 
            uri: `${item.icon}`
          }}
          resizeMode="cover"
          style={{
            height: 150,
            width: '100%',
          }}
        >
          {/* subtle overlay */}
          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.12)',
            }}
          />
        </ImageBackground>

        {/* CONTENT */}
        {/* <View className="px-4 py-3">
          <Text
            className="text-base font-extrabold text-gray-800 text-center"
            numberOfLines={1}
            style={{ writingDirection: 'rtl' }}
          >
            {item.name}
          </Text>

          {item.description && (
            <Text
              className="text-[11px] text-gray-600 mt-1 text-center"
              numberOfLines={2}
              style={{ writingDirection: 'rtl' }}
            >
              {item.description}
            </Text>
          )}
        </View> */}
      </View>
    </Pressable>
  )
}


const SKELETON_DATA = Array.from({ length: 6 })



const CARD_BACKGROUNDS = [
  '#EAF7F1',
  '#FFF4E8',
  '#F3F6FF',
  '#F0FDF9',
  '#EEF2FF',
  '#FFF1F2',
]

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_GAP = 12
const CARD_VISIBLE = 2.5
const CARD_WIDTH = (SCREEN_WIDTH - CARD_GAP * (CARD_VISIBLE + 1)) / CARD_VISIBLE



export default function CategoriesPage() {
  const router = useRouter();
  const { fetchCategories, categories, loading } = useCategoriesStore()

  return (
    <SafeView className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="text-3xl font-extrabold text-center px-5 py-3 mb-4 text-gray-700">
        تصنيفات المنتجات
      </Text>

      {/* <FlatList
        className='flex-1 px-1'
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard
            // title={item.title}
            // image={item.image}
            item={item}
   
            onPress={() =>
              router.push({
                pathname: '/products',
                params: { category: item.title },
              })
            }
          />
        )}
      /> */}

      {loading ? ( 

        <FlatList
  data={SKELETON_DATA}
  keyExtractor={(_, index) => index.toString()}
  numColumns={2}
  columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
  renderItem={() => <CategorySkeletonCard />}
  scrollEnabled={false}
/>




      ) : (
        <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
        contentContainerStyle={{ paddingHorizontal: CARD_GAP, paddingVertical: 10, }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryGridCard
            item={item}
            bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}

            onPress={() =>
              router.push({
                    pathname: '/products',
                    params: {
                      categoryId: item.id,
                      categoryName: item.name, // optional (for title)
                    },
                  })
            }
          />
        )}
      />

      )}



      <View className="h-20" />
    </SafeView>
  )
}
