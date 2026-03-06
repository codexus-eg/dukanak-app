// import { View, StyleSheet, Dimensions } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Svg, { Circle } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// export default function AppBackground({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <View style={styles.container}>
//       {/* 🌈 Gradient */}
//       <LinearGradient
//         colors={["#7CC7A4", "#6FB7D6"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* ✨ Decorations */}
//       <View style={StyleSheet.absoluteFill} pointerEvents="none">
//         <Svg width={width} height={height}>
//           {/* Large soft circles */}
//           <Circle
//             cx={width * 0.85}
//             cy={height * 0.15}
//             r={140}
//             fill="rgba(255,255,255,0.12)"
//           />
//           <Circle
//             cx={width * 0.1}
//             cy={height * 0.85}
//             r={180}
//             fill="rgba(255,255,255,0.08)"
//           />

//           {/* Medium */}
//           <Circle
//             cx={width * 0.7}
//             cy={height * 0.6}
//             r={60}
//             fill="rgba(255,255,255,0.1)"
//           />

//           {/* Accent bullets */}
//           <Circle
//             cx={width * 0.25}
//             cy={height * 0.35}
//             r={5}
//             fill="rgba(246,166,77,0.6)" // accent orange
//           />
//           <Circle
//             cx={width * 0.55}
//             cy={height * 0.75}
//             r={4}
//             fill="rgba(255,255,255,0.4)"
//           />
//           <Circle
//             cx={width * 0.9}
//             cy={height * 0.45}
//             r={6}
//             fill="rgba(255,255,255,0.35)"
//           />
//         </Svg>
//       </View>

//       {/* 🧱 App Content */}
//       {children}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#6FB7D6",
//   },
// // });
// import { View } from "react-native";

// export default function AppBackground({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <View className="flex-1 bg-[#F8FAFC]">
//       {/* Base soft layer */}
//       <View className="absolute inset-0 bg-white" />

//       {/* 🌫 Very large ultra-light circles */}
//       <View className="absolute -top-56 -left-40 w-[520px] h-[520px] rounded-full bg-brand-primary/5" />
//       <View className="absolute -bottom-64 -right-48 w-[600px] h-[600px] rounded-full bg-brand-secondary/5" />

//       {/* 🌤 Medium circles */}
//       <View className="absolute top-1/4 right-24 w-64 h-64 rounded-full bg-brand-secondary/4" />
//       <View className="absolute bottom-1/3 left-16 w-56 h-56 rounded-full bg-brand-primary/4" />

//       {/* ☁️ Small soft circles */}
//       <View className="absolute top-24 left-1/3 w-32 h-32 rounded-full bg-black/3" />
//       <View className="absolute bottom-24 right-1/4 w-28 h-28 rounded-full bg-black/3" />

//       {/* ✨ Tiny dots (barely visible) */}
//       <View className="absolute top-40 right-12 w-2 h-2 rounded-full bg-brand-primary/20" />
//       <View className="absolute top-2/3 left-10 w-1.5 h-1.5 rounded-full bg-brand-secondary/20" />
//       <View className="absolute bottom-20 right-20 w-1 h-1 rounded-full bg-black/20" />

//       {/* App content */}
//       <View className="flex-1">
//         {children}
//       </View>
//     </View>
//   );
// }











// import React from "react";
// import { View } from "react-native";

// export default function AppBackground({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <View className="flex-1 bg-brand-primary overflow-hidden">

//       {/* ===== Decorative Background Layer ===== */}
//       <View className="absolute inset-0 z-0">

//         {/* Large soft shapes */}
//         <View className="absolute -top-56 -left-40 w-[520px] h-[520px] rounded-full bg-brand-primary/12" />
//         <View className="absolute -bottom-64 -right-48 w-[600px] h-[600px] rounded-full bg-brand-secondary/12" />

//         {/* Medium shapes */}
//         <View className="absolute top-1/4 right-20 w-64 h-64 rounded-full bg-brand-secondary/8" />
//         <View className="absolute bottom-1/3 left-16 w-56 h-56 rounded-full bg-brand-primary/8" />

//         {/* Small accents */}
//         <View className="absolute top-24 left-1/3 w-32 h-32 rounded-full bg-black/5" />
//         <View className="absolute bottom-24 right-1/4 w-28 h-28 rounded-full bg-black/5" />
//       </View>

//       {/* ===== App Content ===== */}
//       <View className="flex-1 z-10">
//         {children}
//       </View>
//     </View>
//   );
// }







import React from "react";
import { Dimensions, View } from "react-native";
const { width, height } = Dimensions.get('window')

const brand = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
}

export default function AppBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 bg-brand-primary/5 overflow-hidden">

      {/* ===== Modern Ambient Background ===== */}
      <View className="absolute inset-0 z-0">

        {/* 🌿 Primary soft glow */}
        <View className="absolute -top-60 -left-48 w-[560px] h-[560px] rounded-full bg-brand-primary/12" />

        {/* 🌊 Secondary glow */}
        <View className="absolute -bottom-64 -right-48 w-[620px] h-[620px] rounded-full bg-brand-secondary/12" />

        {/* 🌱 Floating soft layers */}
        {/* <View className="absolute top-1/4 right-24 w-72 h-72 rounded-full bg-brand-secondary/8" />
        <View className="absolute bottom-1/3 left-20 w-60 h-60 rounded-full bg-brand-primary/8" /> */}

        {/* ✨ Accent micro highlights */}
        {/* <View className="absolute top-32 left-1/3 w-24 h-24 rounded-full bg-brand-accent/20" />
        <View className="absolute bottom-28 right-1/4 w-20 h-20 rounded-full bg-brand-accent/20" /> */}


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
        {/* 🌬 Subtle noise dots */}
        <View className="absolute top-44 right-14 w-2 h-2 rounded-full bg-brand-secondary/25" />
        <View className="absolute bottom-36 left-16 w-1.5 h-1.5 rounded-full bg-brand-primary/25" />
      </View>

      {/* ===== App Content ===== */}
      <View className="flex-1 z-10">
        {children}
      </View>
    </View>
  );
}
