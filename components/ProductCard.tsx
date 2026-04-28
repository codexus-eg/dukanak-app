import React from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions, // شيلنا الـ Image من هنا
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image"; // ضفنا الاستيراد ده
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useProductStore } from "@/store/useProductStore";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  hasDiscount?: boolean;
}

const CARD_WIDTH = Dimensions.get("window").width / 2 - 20;

export default function ProductCard({ item }: { item: Product }) {
  const setProduct = useProductStore((s) => s.setProduct);
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(item?.id));

  const handlePress = () => {
    router.push(`/product/${item?.id}`);
  };

  const addToCart = () => {
    console.log("Adding to cart:", item);
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      categoryId: item.category.id,
    });
    Toast.show({
      type: "success",
      text1: "تم بنجاح",
      text2: "تمت الإضافة إلى السلة",
    });
  };

  const handleFavorite = (e: any) => {
    e.stopPropagation();
    const added = toggleFavorite({ ...item });
    Toast.show({
      type: "success",
      text1: added ? "أضيف للمفضلة ❤️" : "أزيل من المفضلة",
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: CARD_WIDTH,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
      }}
    >
      {/* IMAGE */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{
            width: "100%",
            height: 180,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk" // ده اللي هيحل مشكلة البطء
        />

        {/* FAVORITE */}
        <Pressable
          onPress={handleFavorite}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: 8,
            borderRadius: 50,
          }}
          hitSlop={10}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#ef4444" : "#374151"}
          />
        </Pressable>

        {/* NEW BADGE */}
        {item?.type == "new" ? (
          <LinearGradient
            colors={["#6FB7D6", "#7CC7A4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
              جديد
            </Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={["#ccd66fff", "#7CC7A4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
              مستعمل
            </Text>
          </LinearGradient>
        )}

        {/* ADD TO CART SMALL BUTTON */}
        <TouchableOpacity
          onPress={addToCart}
          style={{
            position: "absolute",
            bottom: -70,
            right: 10,
            backgroundColor: "#7CC7A4",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 10,
            shadowColor: "#7CC7A4",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
            أضف للسلة
          </Text>
        </TouchableOpacity>

        {/* DISCOUNT BADGE */}
        {item.hasDiscount && item.oldPrice && (
          <View
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "#F6A64D",
              paddingVertical: 2,
              paddingHorizontal: 6,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}>
              خصم
            </Text>
          </View>
        )}
      </View>

      {/* CONTENT */}
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: 6,
            writingDirection: "rtl",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>

        {/* PRICE */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1F2937" }}>
            {item.price} ₪
          </Text>
          {item.hasDiscount && item.oldPrice && (
            <Text
              style={{
                fontSize: 12,
                color: "#9CA3AF",
                textDecorationLine: "line-through",
                marginLeft: 8,
              }}
            >
              {item.oldPrice} ₪
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
