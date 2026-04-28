import { Image } from "expo-image"; // استيراد الصور السريع
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native"; // شيلنا ImageBackground

type Props = {
  item: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  width: number;
  bgColor: string;
};

export default function CategoryCard({ item, width, bgColor }: Props) {
  const height = width * 1.35;
  const imageHeight = height * 0.65;
  const contentHeight = height - imageHeight + 15;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/products",
          params: {
            categoryId: item.id,
            categoryName: item.name,
          },
        })
      }
      style={{ width: 120, height: "auto" }}
      className="active:scale-95"
    >
      <View
        style={{
          borderRadius: 15,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
          height: imageHeight, // نقلنا الطول هنا
          width: "100%",
        }}
      >
        {/* IMAGE */}
        <Image
          source={{ uri: `${item.icon}` }}
          style={{ height: "100%", width: "100%" }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>
    </Pressable>
  );
}
