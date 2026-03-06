import React from 'react'
import { View } from 'react-native'

type Props = {
  width: number
}

export default function CategorySliderSkeleton({ width }: Props) {
  const height = width * 1.35
  const imageHeight = height * 0.65
  const contentHeight = height - imageHeight

  return (
    <View
      style={{
        width,
        height,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB', // gray-200
        marginRight: 12, // spacing between cards
      }}
    >
      {/* Image placeholder */}
      <View
        style={{
          height: imageHeight,
          backgroundColor: '#D1D5DB', // gray-300
        }}
      />

      {/* Diagonal (optional placeholder) */}
      <View
        style={{
          width: '120%',
          height: 16,
          backgroundColor: '#E5E7EB',
          transform: [{ skewY: '-5deg' }],
          marginTop: -8,
          marginLeft: -10,
        }}
      />

      {/* Content placeholder */}
      <View
        style={{
          height: contentHeight - 8,
          paddingHorizontal: 8,
          paddingVertical: 10,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            height: 14,
            width: '60%',
            backgroundColor: '#D1D5DB',
            borderRadius: 6,
            marginBottom: 6,
          }}
        />
        <View
          style={{
            height: 10,
            width: '80%',
            backgroundColor: '#E5E7EB',
            borderRadius: 6,
          }}
        />
      </View>
    </View>
  )
}
