import { View, Animated, Text } from 'react-native'
import { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SuccessCheck() {
  const scale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="w-28 h-28 mt-5 rounded-full bg-[#88c1c5]/20 items-center justify-center"
    >
      <Ionicons name='checkmark-done-outline' color={"#6FB7D6"} size={50} />
    </Animated.View>
  )
}
