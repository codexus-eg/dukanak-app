
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";

import SafeView from "@/components/SafeView";
import Section from "@/components/settings/Section";
import AddressTypeButton from "@/components/AddressTypeButton";

import { useUserStore } from "@/store/user.store";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";
import Toast from "react-native-toast-message";
import { useAddressStore } from "@/store/address.store";
import { router } from "expo-router";

const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};

const Input = (props: any) => (
  <TextInput
    placeholderTextColor={BRAND.muted}
    {...props}
    style={[
      {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: BRAND.dark,
        marginBottom: 12,
        backgroundColor: "#fff",
      },
      props.style,
    ]}
  />
);

const Button = ({ title, onPress, color, loading }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: color || BRAND.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 6,
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "700" }}>{loading ? "جار التحميل...." : title}</Text>
  </TouchableOpacity>
);

const GAZA_CITIES = [
  "شمال غزة",
  "غزة",
  "دير البلح",
  "البريج",
  "النصيرات",
  "الزوايدة",
  "المغازي",
  "خانيونس",
  "رفح",
];

export default function SettingsScreen() {
  const user = useUserStore((s) => s.user);
  const userId = user?.id;

  /** Profile */
  const [name, setName] = useState(user?.name || "");
  // const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone_number || "");

  /** Password */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [cityModalVisible, setCityModalVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);



  /** Addresses */
  // const [addresses, setAddresses] = useState<any[]>([]);
  const {
    addresses,
    // setAddresses,
    setMainAddress,
    fetchAddresses,
    deleteAddress,

  } = useAddressStore();
  const [showForm, setShowForm] = useState(false);
  const [addressType, setAddressType] = useState("Home");
  const [city, setCity] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [locating, setLocating] = useState(false);

  const safeAddresses = Array.isArray(addresses) ? addresses.map(a => ({
    id: Number(a.id) || 0,
    name: String(a.name ?? "—"),
    city: String(a.city ?? "—"),
    address: String(a.address ?? "—"),
    isMain: !!a.isMain,
  })) : [];






  /* ================== UPDATE SINGLE FIELD ================== */
  const updateProfileField = async () => {
    try {
      setLoadingProfile(true);
      const token = await getToken();

      if (!token) return;


      const formData = new FormData();
      // formData.append(field, value); // فقط الحقل المراد تحديثه

      if (!name?.trim()) return;


      formData.append("name", name);
      // formData.append("email", email);
      // formData.append("phone_number", phone);

      const res = await api.post("/updateprofile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res?.data);

      // تحديث الـ store بعد التغيير
      useUserStore.getState().setUser(res.data.user);

      // alert(`profile data updated successfully!`);
      Toast.show({
        type: 'success',
        text1: 'تم بنجاح',
        text2: 'تمت تحديث بيانات ملفك الشخصي بنجاح',
      })
    } catch (error: any) {
      console.log("Update profile error:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "تعذر تحديث الملف الشخصي",
      });
    } finally {
      setLoadingProfile(false);
    }
  };




  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "جميع الحقول مطلوبة",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "كلمة المرور الجديدة غير متطابقة",
      });
      return;
    }

    try {
      setLoadingPassword(true);
      const token = await getToken();

      if (!token) return;


      await api.post(
        "/updatepassword",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "تم بنجاح",
        text2: "تم تغيير كلمة المرور بنجاح",
      });

      // Reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.log("Update password error:", error.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "فشل العملية",
        text2: error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور",
      });
    } finally {
      setLoadingPassword(false);
    }
  };



  /* ================== LOAD ADDRESSES ================== */
  // const loadAddresses = async () => {
  //   try {
  //     setLoading(true);
  //     const token = await getToken();

  //     const res = await api.get("/addresses", {
  //       params: { user_id: userId },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setAddresses(res.data.address?.data || []);
  //   } catch (e) {
  //     console.log("Load addresses error:", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchAddresses?.();
    }

    return () => {
      mounted = false;
    };
  }, []);


  /* ================== CREATE ADDRESS ================== */
  const createAddress = async () => {
    if (!addressValue.trim() || !city.trim()) return;

    try {
      setLoadingAddress(true)
      const token = await getToken();

      if (!token) return;


      const res = await api.post(
        "/addresses",
        {
          name: addressType,
          address: addressValue,
          city,
          isMain: addresses.length === 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, 'tttttttttttttttttttt')

      setAddressValue("");
      setCity("");
      setAddressType("Home");
      setShowForm(false);
      fetchAddresses();
    } catch (e) {
      console.log("Create address error:", e);
    } finally {
      setLoadingAddress(false)
    }
  };


  const setMain = async (selectedId: number) => {
    try {

      if (!selectedId || !Number.isFinite(selectedId)) return;

      const token = await getToken();
      if (!token) return;

      setMainAddress(selectedId); // تحديث فوري للـ UI


      // setAddresses((prev) =>
      //   prev.map((address) => ({
      //     ...address,
      //     isMain: address.id === selectedId,
      //   }))
      // );

      await Promise.all(
        safeAddresses.map((address) =>
          api.put(
            `/addresses/${address.id}`,
            {
              ...address,
              isMain: address.id === selectedId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .catch(() => null) // 🔥 يمنع crash iOS
        )
      );

      console.log('success')

      // reload to sync UI with backend
      fetchAddresses();
    } catch (error) {
      console.log("Failed to update main address:", error);
    }
  };



  /* ================== DELETE ================== */


  const handleDeleteAccount = async () => {
    try {
      setDeletingAccount(true);

      const token = await getToken();
      if (!token) return;

      await api.get("/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // حذف التوكن
      const { removeToken } = await import("@/lib/auth-storage");
      await removeToken?.();

      // مسح بيانات المستخدم من store
      useUserStore.getState().setUser(null);

      Toast.show({
        type: "success",
        text1: "تم حذف الحساب",
        text2: "تم حذف حسابك بنجاح",
      });

      setDeleteModalVisible(false);

      router.replace("/(auth)/login");

    } catch (error: any) {
      console.log("Delete account error:", error.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "فشل حذف الحساب",
      });
    } finally {
      setDeletingAccount(false);
    }
  };



  /* ================== LOCATION ================== */
  const getCurrentLocation = async () => {
    try {
      setLocating(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "الإذن مرفوض",
          text2: "يرجى تفعيل الموقع",
        });
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const { latitude, longitude } = location.coords;

      try {
        const result =
          await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

        if (result.length) {
          const place = result[0];
          setAddressValue(
            `${place.city || ""} ${place.street || ""}`.trim()
          );
          return;
        }
      } catch { }

      setAddressValue(
        `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
      );
    } catch {
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "تعذر تحديد الموقع",
      });
    } finally {
      setLocating(false);
    }
  };

  return (
    <SafeView >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="relative"
          style={{ flex: 1, backgroundColor: "#F1F5F9" }}
          contentContainerStyle={{ padding: 16 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="absolute z-[99] top-5 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow"
          >
            <Ionicons name="arrow-forward" size={22} color="#1F2937" />
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: BRAND.dark,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            إعدادات الحساب
          </Text>


          {/* NAME */}
          <Section title=" بيانات المستخدم">
            <Input value={name} onChangeText={setName} />
            <Button title="تحديث الملف الشخصي" color={BRAND.secondary} onPress={() => updateProfileField()} loading={loadingProfile} />
          </Section>

          {/* PASSWORD */}
          <Section title="تغيير كلمة المرور">
            <Input
              placeholder="كلمة المرور الحالية"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <Input
              placeholder="كلمة المرور الجديدة"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Input
              placeholder="تأكيد كلمة المرور الجديدة"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button
              title="تغيير كلمة المرور"
              color={BRAND.danger}
              onPress={updatePassword}
              loading={loadingPassword}
            />
          </Section>

























          {/* ADDRESSES */}
          <Section title="عناوين التوصيل">
            {safeAddresses?.map?.((a) => (
              <Pressable
                key={a?.id}
                onPress={() => setMain(a?.id)}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: a?.isMain ? BRAND.primary : "#E5E7EB",
                  backgroundColor: a?.isMain ? "#ECFDF5" : "#fff",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Ionicons
                    name={
                      a?.name === "Home"
                        ? "home-outline"
                        : a?.name === "Work"
                          ? "briefcase-outline"
                          : "location-outline"
                    }
                    size={22}
                    color={BRAND.primary}
                  />

                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: "700" }}>{a?.name ?? "—"}</Text>
                    <Text style={{ color: BRAND.muted, fontSize: 13 }}>
                      {`${a?.city ?? "—"} - ${a?.address ?? "—"}`}
                    </Text>
                  </View>

                  {/* {a?.isMain && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={BRAND.primary}
                    />
                  )} */}


                </View>

                <Pressable
                  onPress={() => {
                    if (!a?.id || !Number.isFinite(a.id)) return;
                    deleteAddress(a.id);
                  }}

                  style={{ marginTop: 8, alignSelf: "flex-end" }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={BRAND.danger}
                  />
                </Pressable>
              </Pressable>
            ))}


            {!showForm && (
              <Pressable
                onPress={() => setShowForm(true)}
                style={{
                  paddingVertical: 14,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: BRAND.primary,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: BRAND.primary, fontWeight: "700" }}>
                  + اضافة عنوان جديد
                </Text>
              </Pressable>
            )}

            {showForm && (
              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 8, }}>
                  <AddressTypeButton
                    label="المنزل"
                    icon="home-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                  <AddressTypeButton
                    label="العمل"
                    icon="briefcase-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                  <AddressTypeButton
                    label="أخرى"
                    icon="location-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                </View>

                {/* <Input
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                /> */}

                <Pressable
                  onPress={() => setCityModalVisible(true)}
                  style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 14,
                    marginBottom: 12,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text style={{ color: city ? BRAND.dark : BRAND.muted }}>
                    {city || "اختر المحافظة"}
                  </Text>
                </Pressable>
                <Input
                  placeholder="العنوان بالتفصيل"
                  multiline
                  value={addressValue}
                  onChangeText={setAddressValue}
                  style={{ height: 80 }}
                />

                <Button title="حفظ العنوان" onPress={createAddress} loading={loadingAddress} />

                <TouchableOpacity
                  onPress={getCurrentLocation}
                  disabled={locating}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: BRAND.secondary,
                    marginTop: 8,
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
                      fontWeight: "700",
                    }}
                  >
                    {locating ? "Locating..." : "استخدم موقعك الحالي"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowForm(false)}
                  style={{ marginTop: 10, alignItems: "center" }}
                >
                  <Text style={{ color: BRAND.muted }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </Section>

          <Section title=" حذف الحساب نهائياً ">
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(true)}
              style={{
                backgroundColor: "#FEE2E2",
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ color: BRAND.danger, fontWeight: "700" }}>
                حذف الحساب نهائياً
              </Text>
            </TouchableOpacity>
          </Section>

          <Modal
            visible={cityModalVisible}
            transparent
            animationType="fade"
          >
            <Pressable
              onPress={() => setCityModalVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                {GAZA_CITIES.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setCity(item);
                      setCityModalVisible(false);
                    }}
                    style={{
                      paddingVertical: 14,
                      borderBottomWidth: 1,
                      borderBottomColor: "#F1F5F9",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>

          <Modal
            visible={deleteModalVisible}
            transparent
            animationType="fade"
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: BRAND.danger,
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  تحذير ⚠️
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    color: BRAND.dark,
                    marginBottom: 20,
                  }}
                >
                  هذه العملية غير قابلة للاسترجاع.
                  هل أنت متأكد أنك تريد حذف حسابك نهائياً؟
                </Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => setDeleteModalVisible(false)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      backgroundColor: "#E5E7EB",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "700" }}>إلغاء</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleDeleteAccount}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      backgroundColor: BRAND.danger,
                      alignItems: "center",
                    }}
                    disabled={deletingAccount}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      {deletingAccount ? "جارٍ الحذف..." : "نعم، احذف الحساب"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}











// can you give me a full prombet to use un a new chat to help me solve all the network problms and api fetches problems in my app to avoid any fail in my ios release .......................