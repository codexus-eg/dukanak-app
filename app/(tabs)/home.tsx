import AppBackground from "@/components/AppBackground";
import ProductsCategoriesList from "@/components/ProductsCategoriesList";
import SafeView from "@/components/SafeView";
import { useCategoriesStore } from "@/store/categories.store";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const { categories } = useCategoriesStore();
  return (
    <SafeView>
      <AppBackground>
        {/* <ScrollView className="flex-1 " contentContainerStyle={{ paddingBottom: 40 }}>

        <Header />

        <MarketingSlider />

        <CategoriesSlider />


        <ProductsCategoriesList categories={categories} />
        
        
      </ScrollView> */}

        <ProductsCategoriesList categories={categories} />
        <View style={{ height: 40 }} />
      </AppBackground>
    </SafeView>
  );
}
