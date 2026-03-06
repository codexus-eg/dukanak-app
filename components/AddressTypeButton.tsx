import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const AddressTypeButton = ({ addressType, setAddressType, BRAND,  label, icon }: any) => (
  <Pressable
    onPress={() => setAddressType(label)}
    style={{
      flex: 1,
      paddingVertical: 12,
      borderRadius: 14,
      borderWidth: 2,
      borderColor:
        addressType === label ? BRAND.primary : '#E5E7EB',
      backgroundColor:
        addressType === label ? '#ECFDF5' : '#fff',
      alignItems: 'center',
    }}
  >
    <Ionicons
      name={icon}
      size={20}
      color={
        addressType === label
          ? BRAND.primary
          : BRAND.muted
      }
    />
    <Text
      style={{
        marginTop: 4,
        fontWeight: '600',
        color: BRAND.dark,
      }}
    >
      {label}
    </Text>
  </Pressable>
);


export default AddressTypeButton

const styles = StyleSheet.create({})