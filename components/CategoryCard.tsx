
import React from 'react'
import { View, Text, ImageBackground, Pressable } from 'react-native'
import { router } from 'expo-router'

type Props = {
  item: {
    id: string
    name: string
    description: string
    icon: string
  }
  width: number
  bgColor: string
}

export default function CategoryCard({ item, width, bgColor }: Props) {
  const height = width * 1.35 // perfect aspect ratio
  const imageHeight = height * 0.65
  const contentHeight = height - imageHeight + 15;

  return (
    <Pressable
      onPress={() => router.push({
      pathname: '/products',
      params: {
        categoryId: item.id,
        categoryName: item.name, // optional (for title)
      },
    })}
      style={{ width: 120, height: "auto" }}
      className="active:scale-95"
    >
      <View
        style={{
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        {/* IMAGE */}
        <ImageBackground
          source={{ 
            // uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}`
            uri: `${item.icon}`
           }}
          style={{ height: imageHeight, width: '100%' }}
          resizeMode="cover"
        >
        
        </ImageBackground>
      </View>
    </Pressable>
  )
}
