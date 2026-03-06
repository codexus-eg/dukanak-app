// import { Modal, View, Pressable, Dimensions } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler'
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   clamp,
// } from 'react-native-reanimated'

// const { width, height } = Dimensions.get('window')

// interface Props {
//   visible: boolean
//   image: string
//   onClose: () => void
// }

// const MIN_SCALE = 1
// const MAX_SCALE = 3

// export default function ZoomableImageModal({
//   visible,
//   image,
//   onClose,
// }: Props) {
//   /* ---------------- Shared Values ---------------- */
//   const scale = useSharedValue(1)
//   const savedScale = useSharedValue(1)

//   const translateX = useSharedValue(0)
//   const translateY = useSharedValue(0)
//   const savedX = useSharedValue(0)
//   const savedY = useSharedValue(0)

//   /* ---------------- Helpers ---------------- */
//   const reset = () => {
//     scale.value = withTiming(1)
//     savedScale.value = 1
//     translateX.value = withTiming(0)
//     translateY.value = withTiming(0)
//     savedX.value = 0
//     savedY.value = 0
//   }

//   /* ---------------- Gestures ---------------- */

//   // Pinch (Zoom)
//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = clamp(
//         savedScale.value * e.scale,
//         MIN_SCALE,
//         MAX_SCALE
//       )
//     })
//     .onEnd(() => {
//       savedScale.value = scale.value
//       if (scale.value === 1) {
//         translateX.value = withTiming(0)
//         translateY.value = withTiming(0)
//         savedX.value = 0
//         savedY.value = 0
//       }
//     })

//   // Pan (Move image ONLY if zoomed)
//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (scale.value <= 1) return

//       const maxX = (width * (scale.value - 1)) / 2
//       const maxY = (height * (scale.value - 1)) / 2

//       translateX.value = clamp(
//         savedX.value + e.translationX,
//         -maxX,
//         maxX
//       )
//       translateY.value = clamp(
//         savedY.value + e.translationY,
//         -maxY,
//         maxY
//       )
//     })
//     .onEnd(() => {
//       savedX.value = translateX.value
//       savedY.value = translateY.value
//     })

//   // Double Tap Zoom
//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       if (scale.value > 1) {
//         reset()
//       } else {
//         scale.value = withTiming(2)
//         savedScale.value = 2
//       }
//     })

//   const composed = Gesture.Simultaneous(
//     pinchGesture,
//     panGesture,
//     doubleTapGesture
//   )

//   /* ---------------- Animated Style ---------------- */
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//     ],
//   }))

//   /* ---------------- Render ---------------- */
//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       onRequestClose={() => {
//         reset()
//         onClose()
//       }}
//     >
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <View className="flex-1 bg-black items-center justify-center">
//           {/* Close */}
//           <Pressable
//             onPress={() => {
//               reset()
//               onClose()
//             }}
//             className="absolute top-12 right-6 z-50"
//           >
//             <Ionicons name="close" size={32} color="white" />
//           </Pressable>

//           <GestureDetector gesture={composed}>
//             <Animated.Image
//               source={{ uri: image }}
//               style={[
//                 {
//                   width: width,
//                   height: height * 0.6,
//                   resizeMode: 'contain',
//                 },
//                 animatedStyle,
//               ]}
//             />
//           </GestureDetector>
//         </View>
//       </GestureHandlerRootView>
//     </Modal>
//   )
// }

import { Modal, Pressable } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    
  visible: boolean
  image: string
  onClose: () => void
}

export default function ProductImageModal({
  visible,
  image,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent>
      <Pressable
        onPress={onClose}
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="close" size={32} color="white" />
      </Pressable>

      <ImageViewer
        imageUrls={[{ url: image }]}
        enableSwipeDown
        onSwipeDown={onClose}
        backgroundColor="black"
      />
    </Modal>
  )
}