// import { Ionicons } from '@expo/vector-icons';
// import { View, Text } from 'react-native';

// export const CustomToast = ({ text1, text2 }) => {
//   return (
//     <View
//       style={{
//         width: '90%',
//         padding: 16,
//         borderRadius: 12,
//         backgroundColor: '#1b2b50ff',
//         flexDirection: 'row',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowRadius: 6,
//         elevation: 5,
//       }}
//     >
//       <Ionicons name="checkmark-circle-outline" size={26} color="#22C55E" />

//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
//           {text1}
//         </Text>

//         {text2 && (
//           <Text style={{ color: '#CBD5E1', marginTop: 4 }}>
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };








// import { View, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// export const CustomToast = ({
//   text1,
//   text2,
//   type = 'success',
// }) => {
//   const variants = {
//     success: {
//       icon: 'checkmark-circle-outline',
//       color: '#7CC7A4', // brand.primary
//     },
//     error: {
//       icon: 'close-circle-outline',
//       color: '#F87171',
//     },
//     warning: {
//       icon: 'alert-circle-outline',
//       color: '#F6A64D', // brand.accent
//     },
//     info: {
//       icon: 'information-circle-outline',
//       color: '#6FB7D6', // brand.secondary
//     },
//   };

//   const { icon, color } = variants[type];

//   return (
//     <View
//       style={{
//         width: '92%',
//         borderRadius: 16,
//         backgroundColor: '#1F2937', // brand.dark
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//         elevation: 8,
//         shadowColor: '#000',
//         shadowOpacity: 0.25,
//         shadowRadius: 10,
//       }}
//     >
//       {/* Accent bar */}
//       <View
//         style={{
//           width: 4,
//           height: '100%',
//           backgroundColor: color,
//           borderRadius: 4,
//           marginRight: 12,
//         }}
//       />

//       {/* Icon */}
//       <Ionicons name={icon} size={26} color={color} />

//       {/* Text */}
//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text
//           style={{
//             color: '#F8FAFC', // brand.light
//             fontSize: 16,
//             fontWeight: '600',
//           }}
//         >
//           {text1}
//         </Text>

//         {text2 && (
//           <Text
//             style={{
//               color: '#CBD5E1',
//               marginTop: 4,
//               fontSize: 13,
//               lineHeight: 18,
//             }}
//           >
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };








// import { View, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// export const CustomToast = ({ text1, text2, type = 'success' }) => {
//   const variants = {
//     success: {
//       icon: 'checkmark-circle-outline',
//       // use gradient shades for a lively look
//       gradient: ['#4FD1C5', '#7CC7A4'], 
//       background: '#153E2B', // deep greenish for contrast
//       iconColor: '#A0F0C3', // light neon green accent
//     },
//     error: {
//       icon: 'close-circle-outline',
//       gradient: ['#FCA5A5', '#F87171'],
//       background: '#3B0D0D',
//       iconColor: '#FECACA',
//     },
//     warning: {
//       icon: 'alert-circle-outline',
//       gradient: ['#FFD580', '#F6A64D'],
//       background: '#33220A',
//       iconColor: '#FFE0A0',
//     },
//     info: {
//       icon: 'information-circle-outline',
//       gradient: ['#93D5F0', '#6FB7D6'],
//       background: '#0F1F2D',
//       iconColor: '#B0E1FF',
//     },
//   };

//   const { icon, gradient, background, iconColor } = variants[type];

//   return (
//     <View
//       style={{
//         width: '92%',
//         borderRadius: 16,
//         backgroundColor: background,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//         elevation: 10,
//         shadowColor: '#000',
//         shadowOpacity: 0.35,
//         shadowRadius: 12,
//       }}
//     >
//       {/* Gradient Accent Bar */}
//       <LinearGradient
//         colors={gradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={{
//           width: 6,
//           height: '100%',
//           borderRadius: 6,
//           marginRight: 12,
//         }}
//       />

//       {/* Icon */}
//       <Ionicons name={icon} size={28} color={iconColor} />

//       {/* Text */}
//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text
//           style={{
//             color: '#F8FAFC',
//             fontSize: 16,
//             fontWeight: '700',
//           }}
//         >
//           {text1}
//         </Text>

//         {text2 && (
//           <Text
//             style={{
//               color: '#CBD5E1',
//               marginTop: 4,
//               fontSize: 13,
//               lineHeight: 18,
//             }}
//           >
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };



// import { View, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// export const CustomToast = ({ text1, text2, type = 'success' }) => {
//   const variants = {
//     success: {
//       icon: 'checkmark-circle-outline',
//       main: '#7CC7A4', // primary
//       highlight: '#6FB7D6', // secondary
//       tinyAccent: '#F6A64D', // accent
//       background: '#1F2937', // dark
//     },
//     error: {
//       icon: 'close-circle-outline',
//       main: '#F87171',
//       highlight: '#FCA5A5',
//       tinyAccent: '#FEE2E2',
//       background: '#1F1A1A',
//     },
//     warning: {
//       icon: 'alert-circle-outline',
//       main: '#F6A64D',
//       highlight: '#FFD580',
//       tinyAccent: '#FFF4E0',
//       background: '#2F2A1F',
//     },
//     info: {
//       icon: 'information-circle-outline',
//       main: '#6FB7D6',
//       highlight: '#93D5F0',
//       tinyAccent: '#D0EBFF',
//       background: '#1A2230',
//     },
//   };

//   const { icon, main, highlight, tinyAccent, background } = variants[type];

//   return (
//     <View
//       style={{
//         width: '92%',
//         borderRadius: 16,
//         backgroundColor: background,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//         elevation: 6,
//         shadowColor: highlight,
//         shadowOpacity: 0.3,
//         shadowRadius: 10,
//       }}
//     >
//       {/* Vertical Accent Bar */}
//       <View
//         style={{
//           width: 4,
//           height: '100%',
//           backgroundColor: main,
//           borderRadius: 4,
//           marginRight: 12,
//         }}
//       />

//       {/* Icon with subtle secondary glow */}
//       <View style={{ position: 'relative' }}>
//         <Ionicons name={icon} size={26} color={main} />
//         <View
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: 26,
//             height: 26,
//             borderRadius: 13,
//             borderWidth: 2,
//             borderColor: highlight,
//             opacity: 0.2,
//           }}
//         />
//       </View>

//       {/* Text */}
//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text
//           style={{
//             color: '#F8FAFC',
//             fontSize: 16,
//             fontWeight: '600',
//           }}
//         >
//           {text1}
//         </Text>

//         {text2 && (
//           <Text
//             style={{
//               color: '#CBD5E1',
//               marginTop: 4,
//               fontSize: 13,
//               lineHeight: 18,
//             }}
//           >
//             {text2}
//           </Text>
//         )}
//       </View>

//       {/* Tiny accent dot on the right for a clever touch */}
//       <View
//         style={{
//           width: 8,
//           height: 8,
//           borderRadius: 4,
//           backgroundColor: tinyAccent,
//           marginLeft: 8,
//         }}
//       />
//     </View>
//   );
// };







import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomToast = ({ text1, text2, type = 'success' }) => {
  const variants = {
    success: {
      icon: 'checkmark-circle-outline',
      main: '#7CC7A4', // primary
      highlight: '#6FB7D6', // secondary
      tinyAccent: '#F6A64D', // accent
      background: '#2A3345', // lighter dark
      borderAccent: '#F6A64D', // accent border
    },
    error: {
      icon: 'close-circle-outline',
      main: '#F87171',
      highlight: '#FCA5A5',
      tinyAccent: '#FEE2E2',
      background: '#3B0D0D',
      borderAccent: '#F87171',
    },
    warning: {
      icon: 'alert-circle-outline',
      main: '#F6A64D',
      highlight: '#FFD580',
      tinyAccent: '#FFF4E0',
      background: '#332A1F',
      borderAccent: '#F6A64D',
    },
    info: {
      icon: 'information-circle-outline',
      main: '#6FB7D6',
      highlight: '#93D5F0',
      tinyAccent: '#D0EBFF',
      background: '#1A2230',
      borderAccent: '#6FB7D6',
    },
  };

  const { icon, main, highlight, tinyAccent, background, borderAccent } = variants[type];

  return (
    <View
      style={{
        width: '92%',
        borderRadius: 16,
        backgroundColor: background,
        borderWidth: 2,
        borderColor: borderAccent, // subtle accent border
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        elevation: 6,
        shadowColor: highlight,
        shadowOpacity: 0.3,
        shadowRadius: 10,
      }}
    >
      {/* Vertical Primary Accent Bar */}
      <View
        style={{
          width: 4,
          height: '100%',
          backgroundColor: main,
          borderRadius: 4,
          marginRight: 12,
        }}
      />

      {/* Icon with subtle secondary glow */}
      <View style={{ position: 'relative' }}>
        <Ionicons name={icon} size={28} color={main} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: highlight,
            opacity: 0.2,
          }}
        />
      </View>

      {/* Text */}
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text
          style={{
            color: '#F8FAFC',
            fontSize: 16,
            fontWeight: '700', // bolder text
          }}
        >
          {text1}
        </Text>

        {text2 && (
          <Text
            style={{
              color: '#CBD5E1',
              marginTop: 4,
              fontSize: 14, // slightly bigger
              fontWeight: '600',
              lineHeight: 20,
            }}
          >
            {text2}
          </Text>
        )}
      </View>

      {/* Tiny accent dot */}
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: tinyAccent,
          marginLeft: 8,
        }}
      />
    </View>
  );
};
