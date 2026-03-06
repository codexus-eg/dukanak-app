import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const LocationButton = ({BRAND, getCurrentLocation}: any) => {
  return (
    <Pressable
  onPress={getCurrentLocation}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BRAND.secondary,
    marginBottom: 10,
  }}
>
  <Ionicons
    name="locate-outline"
    size={20}
    color={BRAND.secondary}
  />
  <Text
    style={{
      marginLeft: 6,
      color: BRAND.secondary,
      fontWeight: '700',
    }}
  >
    Use current location
  </Text>
</Pressable>

  )
}

export default LocationButton

const styles = StyleSheet.create({})