

import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SafeView from "@/components/SafeView"
import { getToken, removeToken } from "@/lib/auth-storage"
import { router } from "expo-router"
import { useUserStore } from "@/store/user.store"
import { checkAuth } from "@/lib/check-auth"
import { api } from "@/lib/api"

const menuItems = [
  {
    title: "طلباتي",
    icon: "receipt-outline",
    route: "/(order)/orders",
  },
  {
    title: "المفضلة",
    icon: "heart-outline",
    route: "/wishlist",
  },
  {
    title: "الاشعارات",
    icon: "notifications-outline",
    route: "/notifications",
  },
  {
    title: "الإعدادات",
    icon: "settings-outline",
    route: "/settings",
  },
]

export default function ProfileScreen() {
  const user = useUserStore((s) => s.user)
  const { clearUser } = useUserStore();

  // ---------------- Supplier Form States ----------------
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone_number || "")
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [loading, setLoading] = useState(false)

  const onLogout = async () => {
    try {
      const token = await getToken();
    if (!token) return;
    await api.get("/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await removeToken();
    clearUser();
    router.replace("/(auth)/login")
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("خطأ", "حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
    }
  }

  const submitSupplierForm = () => {
    if (!name || !email || !phone || !company) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول المطلوبة")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      Alert.alert("تم الإرسال", "تم تقديم طلبك بنجاح!")
      setCompany("")
      setWebsite("")
      setShowSupplierForm(false) // hide after submit
    }, 1500)
  }




  if (!user?.name) {
    return (
      <SafeView className="flex-1 bg-brand-light dark:bg-brand-dark">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons
            name="person-circle-outline"
            size={110}
            color="#9CA3AF"
            style={{ marginBottom: 20 }}
          />

          <Text
            className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-3"
            style={{ writingDirection: "rtl" }}
          >
            لا يوجد مستخدم مسجل
          </Text>

          <Text
            className="text-neutral-500 dark:text-neutral-400 text-center mb-8"
            style={{ writingDirection: "rtl" }}
          >
            يرجى تسجيل الدخول للوصول إلى حسابك
            ومتابعة الطلبات والإعدادات
          </Text>
          <TouchableOpacity
            className="bg-brand-primary/20 p-3 rounded-full mb-5"
            onPress={async () => {
              await checkAuth();
            }}
          >
            <Ionicons name="refresh" size={18} color="#7CC7A4" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login")}
            className="bg-brand-primary px-10 py-4 rounded-full"
          >
            <Text
              className="text-white font-extrabold text-lg"
              style={{ writingDirection: "rtl" }}
            >
              تسجيل الدخول
            </Text>
          </TouchableOpacity>
        </View>
      </SafeView>
    )
  }



  return (
    <SafeView className="flex-1 bg-brand-light dark:bg-brand-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Text
              className="text-2xl font-extrabold text-brand-dark dark:text-white"
              style={{ writingDirection: "rtl" }}
            >
              حسابي
            </Text>
          </View>

          {/* User Card */}
          <View className="mx-6 bg-white dark:bg-neutral-800 rounded-3xl p-5 shadow-sm flex-row items-center border border-brand-primary/20">
            <View className="flex-1 mx-4">
              <Text
                className="text-lg font-bold text-neutral-900 dark:text-white"
                style={{ writingDirection: "rtl" }}
              >
                {user?.name}
              </Text>
              {/* <Text className="text-neutral-500 dark:text-neutral-400 mt-1">
                {user?.email}
              </Text> */}
            </View>
            <TouchableOpacity
              className="bg-brand-accent/20 p-3 rounded-full"
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="pencil" size={18} color="#F6A64D" />
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View className="mx-6 mt-6 bg-white dark:bg-neutral-800 rounded-3xl p-5 border border-brand-primary/10">
            <ProfileRow label="رقم الهاتف" value={user?.phone_number} />
            {/* <ProfileRow label="البريد الإلكتروني" value={user?.email} /> */}
          </View>

          {/* Menu */}
          <View className="mx-6 mt-6 bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => router.push(item.route)}
                key={index}
                className="flex-row items-center px-5 py-4 border-b border-neutral-200 dark:border-neutral-700"
              >
                <Ionicons name={item.icon as any} size={22} color="#6FB7D6" />
                <Text
                  className="flex-1 mx-4 text-base font-medium text-neutral-900 dark:text-white"
                  style={{ writingDirection: "rtl" }}
                >
                  {item.title}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#7CC7A4" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <View className="mx-6 mt-10 mb-20">
            <TouchableOpacity
              className="bg-brand-primary rounded-2xl py-4"
              onPress={onLogout}
            >
              <Text
                className="text-center text-white font-extrabold text-lg"
                style={{ writingDirection: "rtl" }}
              >
                تسجيل الخروج
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  )
}

/* ---------------- Reusable Row ---------------- */
function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-3">
      <Text
        className="text-neutral-500 dark:text-neutral-400"
        style={{ writingDirection: "rtl" }}
      >
        {label}
      </Text>
      <Text className="font-semibold text-neutral-900 dark:text-white">
        {value}
      </Text>
    </View>
  )
}

/* ---------------- Reusable Input Field ---------------- */
interface InputFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  icon?: keyof typeof Ionicons.glyphMap
}

function InputField({ label, value, onChangeText, icon }: InputFieldProps) {
  return (
    <View className="flex-col">
      <Text className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
        {label}
      </Text>
      <View className="flex-row items-center bg-white dark:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-600 px-3 h-12">
        {icon && <Ionicons name={icon} size={20} color="#7CC7A4" />}
        <TextInput
          className="flex-1 ml-2 text-neutral-900 dark:text-white"
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  )
}



















{/* Toggle Supplier Form Button */ }
{/* <View className="mx-6 mt-6">
            <TouchableOpacity
              onPress={() => setShowSupplierForm(prev => !prev)}
              className="bg-[#7CC7A4] rounded-2xl py-3 items-center shadow-md flex-row justify-center"
            >
              <Ionicons
                name={showSupplierForm ? "chevron-up-outline" : "chevron-down-outline"}
                size={20}
                color="white"
                className="ml-2"
              />
              <Text className="text-white font-bold text-lg">
                {showSupplierForm ? "إخفاء نموذج المورد" : "انضم كمورد"}
              </Text>
            </TouchableOpacity>
          </View> */}

{/* Supplier Form */ }
{/* {showSupplierForm && (
            <View className="mx-6 mt-4 bg-white dark:bg-neutral-800 rounded-3xl p-5 shadow-sm">
              <Text className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                الانضمام كمورد
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                املأ البيانات أدناه لتقديم طلبك.
              </Text>

              <View className="space-y-4">
                <InputField
                  label="الاسم الكامل *"
                  value={name}
                  onChangeText={setName}
                  icon="person-outline"
                />
                <InputField
                  label="البريد الإلكتروني *"
                  value={email}
                  onChangeText={setEmail}
                  icon="mail-outline"
                />
                <InputField
                  label="رقم الهاتف *"
                  value={phone}
                  onChangeText={setPhone}
                  icon="call-outline"
                />
                <InputField
                  label="اسم الشركة *"
                  value={company}
                  onChangeText={setCompany}
                  icon="business-outline"
                />
                <InputField
                  label="موقع الويب"
                  value={website}
                  onChangeText={setWebsite}
                  icon="globe-outline"
                />
              </View>

              <TouchableOpacity
                onPress={submitSupplierForm}
                disabled={loading}
                className="mt-6 bg-[#7CC7A4] py-4 rounded-2xl items-center shadow-lg"
              >
                <Text className="text-white font-bold text-lg">
                  {loading ? "جاري الإرسال..." : "تقديم الطلب"}
                </Text>
              </TouchableOpacity>
            </View>
          )} */}
