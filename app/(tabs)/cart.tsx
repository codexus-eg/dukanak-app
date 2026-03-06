
import { useCartStore } from "@/store/cartStore";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SafeView from "@/components/SafeView";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CartCard from "@/components/CartCard";
import { useUserStore } from "@/store/user.store";

export default function CartScreen() {

  const { user } = useUserStore();

  const {
    items: cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    subtotal,
    shippingCost
  } = useCartStore();


  const shipping = shippingCost();
  const total = subtotal() + shipping


  return (
    <SafeView className="flex-1 bg-brand-light dark:bg-brand-dark">
      {/* Header */}
      <View className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <Text
          className="text-2xl font-extrabold text-brand-dark dark:text-white"
          style={{ writingDirection: "rtl" }}
        >
          سلة التسوق
        </Text>
        <Text
          className="text-neutral-500 dark:text-neutral-400 mt-1 "
          style={{ writingDirection: "rtl" }}
        >
          راجع المنتجات قبل إتمام الشراء
        </Text>
      </View>

      {/* Items */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item, i) => (
          <CartCard key={i} item={item} i={i} increaseQty={increaseQty} decreaseQty={decreaseQty} removeItem={removeItem} />

        ))}

        {/* Summary */}
        <View className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-sm">
          <Text
            className="text-lg font-extrabold text-neutral-900 dark:text-white mb-4"
            style={{ writingDirection: "rtl" }}
          >
            ملخص الطلب
          </Text>

          <View className="flex flex-row justify-between mb-2">
            <Text
              className="text-neutral-500 dark:text-neutral-400"
              style={{ writingDirection: "rtl" }}
            >
              المجموع الفرعي
            </Text>
            <Text className="font-medium text-neutral-900 dark:text-white">
              {(total - shipping).toFixed(2)} ₪
            </Text>
          </View>

          <View className="flex flex-row justify-between mb-2">
            <Text
              className="text-neutral-500 dark:text-neutral-400"
              style={{ writingDirection: "rtl" }}
            >
              الشحن
            </Text>
            <Text className="font-medium text-neutral-900 dark:text-white">
              {shipping.toFixed(2)} ₪
            </Text>
          </View>

          <View className="flex flex-row justify-between border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
            <Text
              className="text-base font-bold text-neutral-900 dark:text-white"
              style={{ writingDirection: "rtl" }}
            >
              الإجمالي
            </Text>
            <Text className="text-xl font-extrabold text-neutral-900 dark:text-white">
              {(total).toFixed(2)} ₪
            </Text>
          </View>
        </View>



        {user?.name ? <View className="  px-6 py-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mb-[80px]">
          <TouchableOpacity disabled={cartItems?.length == 0} className="bg-brand-primary rounded-2xl py-4 shadow-md active:opacity-90" onPress={() => router.push('/(checkout)/checkout')}>
            <Text
              className="text-center text-white dark:text-black text-lg font-extrabold"
              style={{ writingDirection: "rtl" }}
            >
              إتمام الشراء
            </Text>
          </TouchableOpacity>
        </View>
          :
          <View>
            <Text className="text-center mt-5">ليس لديك حساب ... قم بتسجيل الدخول </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/login")}
              className="bg-brand-primary px-10 py-4 rounded-full mt-3"
            >
              <Text
                className="text-white font-extrabold text-lg text-center"
                style={{ writingDirection: "rtl" }}
              >
                تسجيل الدخول
              </Text>
            </TouchableOpacity>
          </View>
        }

        <View className="h-32" />


      </ScrollView>

      {/* Checkout */}

    </SafeView>
  );
}
