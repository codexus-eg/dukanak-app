
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions
} from 'react-native'
import { router } from 'expo-router'

import CategoryCard from '../CategoryCard'
import axios from 'axios'
import { getToken } from '@/lib/auth-storage'
import { useCategoriesStore } from '@/store/categories.store'
import CategorySliderSkeleton from '../CategorySliderSkeleton'

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

const SKELETON_DATA = Array.from({ length: 6 }) // number of skeleton cards


export default function CategoriesSlider() {
  // const [categories, setCategories] = useState<any[]>([])


  const { fetchCategories, categories, loading } = useCategoriesStore()

  useEffect(() => {
    fetchCategories()
  }, [])



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = await getToken()
  //     const res = await axios.get(
  //       'https://docank.mahmoudalbatran.com/api/categories',
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     setCategories(res.data?.categories?.data || [])
  //   }

  //   fetchData()
  // }, [])

  return (
    <View className="mt-3">


<View className="px-4 mb-2 items-start flex-row items-center px-4 mb-4" style={{ writingDirection: 'rtl' }}>
  <View className="w-1 h-7 bg-brand-accent rounded-full ml-3" />
  <View className="bg-brand-primary/5 px-5 py-2 rounded-full">
    <Text className="text-2xl font-extrabold text-brand-primary">
      تصنيفات المنتجات
    </Text>
  </View>
</View>



      {/* <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={4} // 4 cards per row
        scrollEnabled={false} // fits exactly 2 rows
        columnWrapperStyle={{ gap: CARD_GAP, paddingVertical: 5 }}
        
        contentContainerStyle={{ paddingHorizontal: 12, gap: 12,   paddingBottom: 17, // top & bottom padding
 }}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            width={CARD_WIDTH}
            bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
          />
        )}
      /> */}

      {!loading ? <FlatList
        data={categories}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_GAP, paddingVertical: 10, }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        renderItem={({ item, index }: any) => (
          <CategoryCard
            item={item}
            width={CARD_WIDTH}
            bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
          />
        )}
      /> : (
        <FlatList
  data={SKELETON_DATA}
  keyExtractor={(_, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: CARD_GAP }}
  renderItem={() => <CategorySliderSkeleton width={CARD_WIDTH} />}
/>
      )}
    </View>
  )
}
