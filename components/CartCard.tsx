import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CartCard = ({item, i, increaseQty, decreaseQty, removeItem}: any) => {
  return (
    <View
            key={i}
            className="flex flex-row bg-white dark:bg-neutral-800 rounded-2xl mb-5 shadow-sm overflow-hidden border border-brand-primary/20 p-1"

          >
            {/* Image */}
            <Image
              source={{
          // uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
          uri: `${item.image}`,
        }}
              className="w-28 h-28"
              resizeMode="cover"
            />

            {/* Info */}
            <View className="flex-1 p-4 justify-between">
              <View>
                <Text
                  numberOfLines={2}
className="text-base font-semibold text-brand-dark dark:text-white"
                  style={{ writingDirection: "rtl" }}
                >
                  {item.name}
                </Text>

                <Text className="text-lg font-bold text-brand-dark/80 dark:text-white mt-1">
                  {item?.price} ₪
                </Text>
              </View>

              {/* Quantity */}
              <View className="flex flex-row items-center bg-brand-light/70 dark:bg-neutral-700 rounded-full px-4 py-1"
>
                <View className="flex flex-row items-center bg-neutral-100 dark:bg-neutral-700 rounded-full px-4 py-1">
                  <TouchableOpacity onPress={() => increaseQty(item.id)}>
                    <Text className="text-2xl font-bold text-brand-primary">+</Text>
                  </TouchableOpacity>

                  <Text className="mx-4 font-semibold text-neutral-900 dark:text-white">
                    {item.quantity}
                  </Text>

                  <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                    <Text className="text-2xl font-bold text-brand-secondary">−</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.id)} className="bg-brand-accent/20 p-3 rounded-full ml-auto">
                  <Ionicons name="trash-outline" size={20} color={"#F6A64D"}  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
  )
}

export default CartCard

const styles = StyleSheet.create({})