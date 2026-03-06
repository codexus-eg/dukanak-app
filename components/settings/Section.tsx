import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};
const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 28 }}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        color: BRAND.dark,
        marginBottom: 10,
      }}
    >
      {title}
    </Text>

    <View
      style={{
        backgroundColor: BRAND.light,
        borderRadius: 18,
        padding: 16,
        elevation: 4,
      }}
    >
      {children}
    </View>
  </View>
);


export default Section

const styles = StyleSheet.create({})