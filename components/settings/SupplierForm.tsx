import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import SafeView from '@/components/SafeView'
import { Ionicons } from '@expo/vector-icons'

export default function JoinSupplierForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!name || !email || !phone || !company) {
      Alert.alert('خطأ', 'يرجى تعبئة جميع الحقول المطلوبة')
      return
    }

    setLoading(true)

    // 🔹 Simulate API call
    setTimeout(() => {
      setLoading(false)
      Alert.alert('تم الإرسال', 'تم تقديم طلبك بنجاح!')
      setName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setWebsite('')
    }, 1500)
  }

  return (
    <SafeView className="flex-1 bg-[#F8FAFC]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text className="text-3xl font-bold text-[#1F2937] mb-4">
            الانضمام كمورد
          </Text>
          <Text className="text-sm text-neutral-500 mb-6">
            املأ البيانات أدناه لتقديم طلبك كمورد جديد.
          </Text>

          {/* Input Fields */}
          <View className="space-y-4">
            <InputField
              label="الاسم الكامل *"
              value={name}
              onChangeText={setName}
              placeholder="أدخل اسمك الكامل"
              icon="person-outline"
            />

            <InputField
              label="البريد الإلكتروني *"
              value={email}
              onChangeText={setEmail}
              placeholder="example@mail.com"
              keyboardType="email-address"
              icon="mail-outline"
            />

            <InputField
              label="رقم الهاتف *"
              value={phone}
              onChangeText={setPhone}
              placeholder="0501234567"
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <InputField
              label="اسم الشركة *"
              value={company}
              onChangeText={setCompany}
              placeholder="اسم الشركة"
              icon="business-outline"
            />

            <InputField
              label="موقع الويب"
              value={website}
              onChangeText={setWebsite}
              placeholder="https://example.com"
              icon="globe-outline"
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            className="mt-8 bg-[#7CC7A4] py-4 rounded-2xl shadow-lg items-center"
            disabled={loading}
          >
            <Text className="text-white font-bold text-lg">
              {loading ? 'جاري الإرسال...' : 'تقديم الطلب'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  )
}

/* ---------------- Input Field Component ---------------- */
interface InputFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  icon?: keyof typeof Ionicons.glyphMap
}

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  icon,
}: InputFieldProps) => {
  return (
    <View className="flex-col">
      <Text className="text-sm font-semibold text-[#1F2937] mb-1">{label}</Text>
      <View className="flex-row items-center bg-white rounded-xl shadow-sm border border-neutral-200 px-3 h-12">
        {icon && <Ionicons name={icon} size={20} color="#7CC7A4" />}
        <TextInput
          className="flex-1 ml-2 text-[#1F2937]"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  )
}
