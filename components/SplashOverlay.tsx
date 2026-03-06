// import { View, Text, Image, Animated, Dimensions } from 'react-native'
// import { useEffect, useRef } from 'react'

// const { width, height } = Dimensions.get('window')

// const brand = {
//   primary: "#7CC7A4",
//   secondary: "#6FB7D6",
//   accent: "#F6A64D",
//   dark: "#1F2937",
//   light: "#F8FAFC",
// }

// export default function ModernSplash({ onFinish }: { onFinish: () => void }) {
//   const opacity = useRef(new Animated.Value(1)).current
//   const scale = useRef(new Animated.Value(0.7)).current

//   useEffect(() => {
//     // Animate logo scale & fade
//     Animated.parallel([
//       Animated.timing(scale, {
//         toValue: 1,
//         duration: 1200,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: 1200,
//         useNativeDriver: true,
//       }),
//     ]).start()

//     const timer = setTimeout(() => {
//       Animated.timing(opacity, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start(() => {
//         onFinish()
//       })
//     }, 2500) // total 2.5s

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <Animated.View
//       style={{ opacity }}
//       className="absolute inset-0 items-center justify-center"
//     >
//       {/* Gradient background */}
//       <View
//         style={{
//           position: 'absolute',
//           width,
//           height,
//           backgroundColor: brand.primary,
//         }}
//       >
//         {/* Optional floating accent circles */}
//         <View
//           style={{
//             position: 'absolute',
//             top: height * 0.1,
//             left: width * 0.7,
//             width: 80,
//             height: 80,
//             borderRadius: 40,
//             backgroundColor: brand.accent,
//             opacity: 0.3,
//           }}
//         />
//         <View
//           style={{
//             position: 'absolute',
//             bottom: height * 0.15,
//             left: width * 0.15,
//             width: 120,
//             height: 120,
//             borderRadius: 60,
//             backgroundColor: brand.secondary,
//             opacity: 0.25,
//           }}
//         />
//       </View>

//       {/* Logo + text */}
//       <Animated.View style={{ transform: [{ scale }] }} className="items-center">
//         <Image
//           source={require('@/assets/images/icon.png')}
//           className="w-40 h-40 mb-4"
//           resizeMode="contain"
//         />
//         <Text
//           style={{ color: brand.light }}
//           className="text-3xl font-bold tracking-tight"
//         >
//           Docank
//         </Text>
//         <Text
//           style={{ color: brand.light }}
//           className="text-lg font-medium mt-2"
//         >
//           متجر منتجاتك بسهولة
//         </Text>
//       </Animated.View>
//     </Animated.View>
//   )
// }



import { View, Text, Image, Animated, Dimensions } from 'react-native'
import { useEffect, useRef } from 'react'

const { width, height } = Dimensions.get('window')

const brand = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
}

export default function ModernSplash({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current
  const scale = useRef(new Animated.Value(0.7)).current

  useEffect(() => {
    
    // Smooth scale + fade-in logo
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      // Fade out splash
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish())
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Animated.View
      style={{ opacity }}
      className="absolute inset-0 items-center justify-center"
    >
      {/* Soft gradient background */}
      <View
        style={{
          position: 'absolute',
          width,
          height,
          backgroundColor: brand.light, // light base
        }}
      >
        {/* Soft floating circles */}
        <View
          style={{
            position: 'absolute',
            top: height * 0.1,
            left: width * 0.7,
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: brand.primary,
            opacity: 0.15,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: height * 0.15,
            left: width * 0.1,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: brand.secondary,
            opacity: 0.12,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: height * 0.3,
            left: width * 0.2,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: brand.accent,
            opacity: 0.1,
          }}
        />
      </View>

      {/* Logo + text */}
      <Animated.View style={{ transform: [{ scale }] }} className="items-center">
        <Image
          source={require('@/assets/images/icon.png')}
          className="w-40 h-40 mb-4"
          resizeMode="contain"
        />
        <Text
          style={{ color: brand.dark }}
          className="text-3xl font-bold tracking-tight"
        >
          Dukanak
        </Text>
        <Text
          style={{ color: brand.dark }}
          className="text-lg font-medium mt-2 text-center"
        >
         احصل على ما تريد ب أسهل و أسرع الطرق 
        </Text>
      </Animated.View>
    </Animated.View>
  )
}
