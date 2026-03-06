import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategorySection from './CategorySection'
import CategoriesSlider from '@/components/home/CategoriesSlider'
import Header from '@/components/home/Header'
import { MarketingSlider } from '@/components/home/MarketingSlider'
const ProductsCategoriesList = ({ categories }: any) => {
  return (
    <View className=''>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategorySection category={item} />
        )}
        ListHeaderComponent={
          <>
            <Header />
            <MarketingSlider />
            <CategoriesSlider />
          </>
        }
        contentContainerStyle={{ paddingBottom: 40 }}

        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ProductsCategoriesList

const styles = StyleSheet.create({})