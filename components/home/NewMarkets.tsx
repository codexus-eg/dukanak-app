import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

// Example New Markets Section using NativeWind
// Assumes NativeWind is configured and brand colors are added to tailwind.config.js

const markets = [
  {
    id: 1,
    name: "Fresh Mart",
    location: "Gaza City",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a",
    isNew: true,
  },
  {
    id: 2,
    name: "Green Basket",
    location: "Khan Younis",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    isNew: true,
  },
  {
    id: 3,
    name: "Daily Market",
    location: "Rafah",
    image: "https://images.unsplash.com/photo-1601598851547-4302969d0614",
    isNew: true,
  },
];

export default function NewMarketsSection() {
  return (
    <View className="px-4 mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-brand-dark">🆕 اخر المتاجر لدينا</Text>
        <TouchableOpacity className="flex flex-row items-center gap-2 text-lg">
          <Text className="text-brand-primary font-extrabold text-xl">عرض الجميع</Text> 
          <Ionicons name="caret-back-circle-outline" color={"#7CC7A4"} size={25} />
        </TouchableOpacity>
      </View>

      {/* Horizontal list */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {markets.map((market) => (
          <TouchableOpacity onPress={() => router.push(`/(markets)/${15}`)}
            key={market.id}
            activeOpacity={0.85}
            className="mr-4 w-64 rounded-2xl bg-white shadow-sm"
          >
            {/* Image */}
            <View className="relative">
              <Image
                source={{ uri: market.image }}
                className="w-full h-36 rounded-t-2xl"
              />

              {/* New badge */}
              {market.isNew && (
                <View className="absolute top-3 left-3 bg-brand-accent px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-semibold">NEW</Text>
                </View>
              )}
            </View>

            {/* Content */}
            <View className="p-4">
              <Text className="text-base font-semibold text-brand-dark mb-1">
                {market.name}
              </Text>
              <Text className="text-sm text-gray-500 mb-3">
                {market.location}
              </Text>

              <View className="flex-row items-center justify-between">
                <View className="bg-brand-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-brand-primary text-xs font-medium">
                    Recently added
                  </Text>
                </View>

                <Text className="text-brand-secondary text-sm font-semibold">
                  View →
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
