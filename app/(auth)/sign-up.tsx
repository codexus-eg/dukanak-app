

// import OTPModal from "@/components/OTPModal";
// import { api } from "@/lib/api";
// import { router } from "expo-router";
// import { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// export default function SignupScreen() {
//   const inputsRef = useRef<TextInput[]>([]);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [otp, setOtp] = useState(["", "", "", "", ""]);
//   const [otpModal, setOtpModal] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /* ---------------- REGISTER ---------------- */
//   const submitRegister = async () => {
//     setError(null);

//     if (!name || !email || !password)
//       return setError("جميع الحقول مطلوبة");

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       return setError("البريد الإلكتروني غير صالح");

//     if (password.length < 6)
//       return setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });


//       const data = res.data;

//       console.log(data, 'ttttttttttttttttttttt')

//       if (!data) throw new Error(data.message || 'فشل تسجيل الدخول')

//       // ✅ OTP sent
//       setOtpModal(true)

//     } catch (err: any) {
//       setError(
//         err.response?.data?.message || "فشل إنشاء الحساب"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- VERIFY OTP ---------------- */
//   // const verifyOtp = async () => {
//   //   const code = otp.join("");

//   //   if (code.length !== 5)
//   //     return setError("أدخل رمز التحقق كامل");

//   //   try {
//   //     setLoading(true);

//   //     const res = await api.post("/register/verify", {
//   //       email,
//   //       register_code: code,
//   //     });

//   //     const token = res.data.token;

//   //     // 🔐 SecureStore.setItemAsync("token", token)

//   //     router.replace("/(tabs)/home");

//   //   } catch (err: any) {
//   //     setError(
//   //       err.response?.data?.message || "رمز التحقق غير صحيح"
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//      <KeyboardAwareScrollView
//         enableOnAndroid
//         extraScrollHeight={30}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{ flexGrow: 1 }}
//       >
//     <View className="flex-1 bg-brand-light justify-center px-6">
//       <View className="absolute inset-0 bg-brand-secondary/10" />

//       {/* Card */}
//       <View className="bg-gray-50 rounded-[36px] px-7 py-10 shadow-2xl border border-gray-100">
//         {/* Header */}
//         <View className="mb-10 items-center">
//           <View className="w-14 h-14 rounded-2xl bg-brand-primary/15 items-center justify-center mb-4">
//             <Image
//               source={require("@/assets/images/micon.jpeg")}
//               style={{ width: 120, height: 60, transform: [{ scale: 1.5 }] }}
//             />
//           </View>

//           <Text className="text-3xl font-extrabold text-brand-dark">
//             إنشاء حساب جديد
//           </Text>

//           <Text className="text-center text-gray-500 font-medium text-base mt-2">
//             أنشئ حسابك وابدأ استخدام دكانك
//           </Text>
//         </View>

//         {/* Inputs */}
//         {/* <View className="gap-5">
//           <AuthInput label="الاسم الكامل" value={name} onChange={setName} />
//           <AuthInput label="البريد الإلكتروني" value={email} onChange={setEmail} email />
//           <AuthInput label="كلمة المرور" value={password} onChange={setPassword} password />
//         </View> */}



//         {/* Inputs */}
//         <View className="gap-5">
//           <View>
//             <Text className="text-sm text-gray-600 mb-2 font-medium">
//               الاسم
//             </Text>
//             <TextInput
//               placeholder="mahmoud"
//               value={name}
//               onChangeText={setName}
//               placeholderTextColor="#9CA3AF"

//               // keyboardType="phone"
//               className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50 focus:border-brand-primary"
//             />
//           </View>
//           <View>
//             <Text className="text-sm text-gray-600 mb-2 font-medium">
//               البريد الإلكتروني
//             </Text>
//             <TextInput
//               placeholder="example@email.com"
//               value={email}
//               onChangeText={setEmail}
//               placeholderTextColor="#9CA3AF"
//               cursorColor="#111827" // <-- مهم
//               keyboardType="email-address"
//               className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50 focus:border-brand-primary"
//             />
//           </View>

//           <View>
//             <Text className="text-sm text-gray-600 mb-2 font-medium">
//               كلمة المرور
//             </Text>
//             <TextInput
//               placeholder="••••••••"
//               placeholderTextColor="#9CA3AF"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}

//               className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50 focus:border-brand-primary"
//             />
//           </View>
//         </View>

//         {/* Error */}
//         {error && (
//           <Text className="text-red-500 text-center mt-4">{error}</Text>
//         )}


//         <Pressable
//           disabled={loading}
//           onPress={() => router.push('/(tabs)/home')}
//           className="mt-8 border border-brand-primary py-4 rounded-2xl shadow-lg shadow-brand-primary/30"
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text className="text-brand-primary font-bold text-center font-bold text-lg">
//               الدخول ك زائر
//             </Text>
//           )}
//         </Pressable> 

        
//         {/* Button */}
//         <Pressable
//           disabled={loading}
//           onPress={submitRegister}
//           className="mt-4 bg-brand-primary py-4 rounded-2xl shadow-lg shadow-brand-primary/30"
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text className="text-white text-center font-bold text-lg">
//               إنشاء الحساب
//             </Text>
//           )}
//         </Pressable>

//         {/* Footer */}
//         <Text className="text-center text-gray-500 mt-8 text-base">
//           لديك حساب؟{" "}
//           <Text
//             className="text-brand-accent font-extrabold"
//             onPress={() => router.replace("/(auth)/login")}
//           >
//             تسجيل الدخول
//           </Text>
//         </Text>
//       </View>

//       {/* OTP MODAL */}
//       <OTPModal
//         otpModal={otpModal}
//         setOtpModal={setOtpModal}
//         otp={otp}
//         setOtp={setOtp}
//         inputsRef={inputsRef}
//         loading={loading}
//         error={error}
//         email={email}
//         password={password}
//       />
//     </View>
//     </KeyboardAwareScrollView>
//   );
// }

// /* --------- Small Reusable Input --------- */
// const AuthInput = ({
//   label,
//   value,
//   onChange,
//   email,
//   password,
// }: any) => (
//   <View>
//     <Text className="text-sm text-gray-600 mb-2 font-medium">
//       {label}
//     </Text>
//     <TextInput
//       value={value}
//       onChangeText={onChange}
//       autoCapitalize="none"
//       keyboardType={email ? "email-address" : "default"}
//       secureTextEntry={password}
//       placeholderTextColor="#9CA3AF"
//       className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-white focus:border-brand-primary"
//     />
//   </View>
// );















import OTPModal from "@/components/OTPModal";
import { api } from "@/lib/api";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignupScreen() {
  const inputsRef = useRef<TextInput[]>([]);

  const [name, setName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("970");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [otpModal, setOtpModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- REGISTER ---------------- */
  const submitRegister = async () => {
    setError(null);

    if (!name || !phoneNumber || !password)
      return setError("جميع الحقول مطلوبة");

    if (!/^\d{9}$/.test(phoneNumber))
      return setError("رقم الهاتف يجب أن يكون 9 أرقام");

    if (password.length < 6)
      return setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");

    const fullPhoneNumber = `${phonePrefix}${phoneNumber}`;

    try {
      setLoading(true);
      console.log(fullPhoneNumber,"rrrrrrrrrrr");

      const res = await api.post("/auth/register", {
        name,
        phone_number: fullPhoneNumber,
        password,
      });

      console.log("rrrrrrrrrrrrrrr", res)

      if (!res.data)
        throw new Error(res.data?.message || "فشل إنشاء الحساب");

      // ✅ OTP sent to phone number
      setOtpModal(true);

    } catch (err: any) {
      setError(
        err.response?.data?.message || "فشل إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={30}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 bg-brand-light justify-center px-6">
        <View className="absolute inset-0 bg-brand-secondary/10" />

        {/* Card */}
        <View className="bg-gray-50 rounded-[36px] px-7 py-10 shadow-2xl border border-gray-100">
          {/* Header */}
          <View className="mb-10 items-center">
            <View className="w-14 h-14 rounded-2xl bg-brand-primary/15 items-center justify-center mb-4">
              <Image
                source={require("@/assets/images/micon.jpeg")}
                style={{ width: 120, height: 60, transform: [{ scale: 1.5 }] }}
              />
            </View>

            <Text className="text-3xl font-extrabold text-brand-dark">
              إنشاء حساب جديد
            </Text>

            <Text className="text-center text-gray-500 font-medium text-base mt-2">
              أنشئ حسابك وابدأ استخدام دكانك
            </Text>
          </View>

          {/* Inputs */}
          <View className="gap-5">
            {/* Name */}
            <View>
              <Text className="text-sm text-gray-600 mb-2 font-medium">
                الاسم
              </Text>
              <TextInput
                placeholder="Mahmoud"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#9CA3AF"
                className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50"
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-sm text-gray-600 mb-2 font-medium">
                رقم الهاتف
              </Text>

              <View className="flex-row gap-2">
                {/* Prefix Selector */}
                <Pressable
                  onPress={() =>
                    setPhonePrefix(
                      phonePrefix === "970" ? "972" : "970"
                    )
                  }
                  className="border border-gray-200 rounded-2xl px-4 py-4 bg-gray-100"
                >
                  <Text className="font-bold text-brand-dark">
                    {phonePrefix}
                  </Text>
                </Pressable>

                {/* Phone Input */}
                <TextInput
                  placeholder="599123456"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="number-pad"
                  maxLength={9}
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50"
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm text-gray-600 mb-2 font-medium">
                كلمة المرور
              </Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50"
              />
            </View>
          </View>

          {/* Error */}
          {error && (
            <Text className="text-red-500 text-center mt-4">
              {error}
            </Text>
          )}

          {/* Guest */}
          <Pressable
            disabled={loading}
            onPress={() => router.push("/(tabs)/home")}
            className="mt-8 border border-brand-primary py-4 rounded-2xl"
          >
            <Text className="text-brand-primary font-bold text-center text-lg">
              الدخول ك زائر
            </Text>
          </Pressable>

          {/* Submit */}
          <Pressable
            disabled={loading}
            onPress={submitRegister}
            className="mt-4 bg-brand-primary py-4 rounded-2xl"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">
                إنشاء الحساب
              </Text>
            )}
          </Pressable>

          {/* Footer */}
          <Text className="text-center text-gray-500 mt-8 text-base">
            لديك حساب؟{" "}
            <Text
              className="text-brand-accent font-extrabold"
              onPress={() => router.replace("/(auth)/login")}
            >
              تسجيل الدخول
            </Text>
          </Text>
        </View>

        {/* OTP MODAL */}
        <OTPModal
          otpModal={otpModal}
          setOtpModal={setOtpModal}
          otp={otp}
          setOtp={setOtp}
          inputsRef={inputsRef}
          loading={loading}
          error={error}
          phoneNumber={`${phonePrefix}${phoneNumber}`}
          password={password}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}




















































// <Modal transparent visible={otpModal} animationType="fade">
//         <TouchableWithoutFeedback onPress={() => setOtpModal(false)}>
//           <View className="flex-1 bg-black/50 justify-center px-6">
//             <TouchableWithoutFeedback>
//               <View className="bg-white rounded-3xl p-8">
//                 <Text className="text-xl font-bold text-center">
//                   أدخل رمز التحقق
//                 </Text>

//                 {/* OTP */}
//                 <View className="flex-row justify-between mt-6" style={{ flexDirection: 'row', direction: 'ltr' }}>
//                   {otp.map((_, i) => (
//                     <TextInput
//                       key={i}
//                       ref={r => (inputsRef.current[i] = r!)}
//                       maxLength={1}
//                       keyboardType="number-pad"
//                       className="w-12 h-14 text-xl text-center border rounded-xl"
//                       onChangeText={t => {
//                         const newOtp = [...otp]
//                         newOtp[i] = t
//                         setOtp(newOtp)
//                         if (t && i < 4) inputsRef.current[i + 1].focus()
//                       }}
//                     />
//                   ))}
//                 </View>

//                 {/* Timer */}
//                 <Text className="text-center mt-4 text-gray-500">
//                   {timer > 0 ? `إعادة الإرسال خلال ${timer}s` : ''}
//                 </Text>

//                 {timer === 0 && (
//                   <Pressable onPress={resendOtp}>
//                     <Text className="text-center text-[#1f3a5f] font-bold">
//                       إعادة إرسال الرمز
//                     </Text>
//                   </Pressable>
//                 )}

//                 <Pressable
//                   onPress={verifyOtp}
//                   className="mt-6 bg-[#1f3a5f] py-4 rounded-2xl"
//                 >
//                   <Text className="text-white text-center font-bold">
//                     تأكيد
//                   </Text>
//                 </Pressable>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>