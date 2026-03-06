// import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
// import { useRouter } from 'expo-router'
// import SafeView from '@/components/SafeView'
// import SuccessCheck from '@/components/SuccessCheck'

// export default function OrderSuccessScreen() {
//   const router = useRouter()

//   return (
//     <SafeView className="flex-1 bg-neutral-50">
//       <ScrollView
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Success Icon */}
//         <View className="items-center mt-20">
//           <SuccessCheck />

//           <Text
//             className="text-2xl font-extrabold text-neutral-900 mt-6"
//             style={{ writingDirection: 'rtl' }}
//           >
//             تم تأكيد طلبك
//           </Text>

//           <Text
//             className="text-neutral-500 mt-2 text-center px-10"
//             style={{ writingDirection: 'rtl' }}
//           >
//             شكراً لتسوقك من دكانك، سيتم تجهيز طلبك وشحنه في أقرب وقت
//           </Text>
//         </View>

//         {/* Order Card */}
//         <View className="mx-6 mt-10 bg-white rounded-3xl p-6 shadow-sm">
//           <Text
//             className="text-lg font-bold text-neutral-900 mb-4"
//             style={{ writingDirection: 'rtl' }}
//           >
//             تفاصيل الطلب
//           </Text>

//           <View className="flex-row justify-between mb-3">
//             <Text className="text-neutral-500">رقم الطلب</Text>
//             <Text className="font-semibold text-neutral-900">
//               #DK-392184
//             </Text>
//           </View>

//           <View className="flex-row justify-between mb-3">
//             <Text className="text-neutral-500">عدد المنتجات</Text>
//             <Text className="font-semibold text-neutral-900">
//               3
//             </Text>
//           </View>

//           <View className="flex-row justify-between mb-3">
//             <Text className="text-neutral-500">طريقة الدفع</Text>
//             <Text className="font-semibold text-neutral-900">
//               بطاقة بنكية
//             </Text>
//           </View>

//           <View className="flex-row justify-between pt-3 border-t border-neutral-200">
//             <Text
//               className="text-base font-bold text-neutral-900"
//               style={{ writingDirection: 'rtl' }}
//             >
//               الإجمالي
//             </Text>
//             <Text className="text-xl font-extrabold text-neutral-900">
//               541.97 $
//             </Text>
//           </View>
//         </View>

//         {/* Status Timeline */}
//         <View className="mx-6 mt-8 bg-white rounded-3xl p-6 shadow-sm">
//           <Text
//             className="text-lg font-bold text-neutral-900 mb-4"
//             style={{ writingDirection: 'rtl' }}
//           >
//             حالة الطلب
//           </Text>

//           <View className="flex-row items-center mb-3">
//             <View className="w-3 h-3 rounded-full bg-[#88c1c5]" />
//             <Text className="ml-3 text-neutral-900 font-medium">
//               تم استلام الطلب
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <View className="w-3 h-3 rounded-full bg-neutral-300" />
//             <Text className="ml-3 text-neutral-500">
//               قيد التجهيز
//             </Text>
//           </View>

//           <View className="flex-row items-center">
//             <View className="w-3 h-3 rounded-full bg-neutral-300" />
//             <Text className="ml-3 text-neutral-500">
//               تم الشحن
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Actions */}
//       <View className="px-6 py-6 bg-white border-t border-neutral-200">
//         <TouchableOpacity
//           onPress={() => router.replace('/(tabs)/home')}
//           className="bg-[#88c1c5] rounded-2xl py-4 mb-3"
//         >
//           <Text
//             className="text-center text-white font-extrabold text-lg"
//             style={{ writingDirection: 'rtl' }}
//           >
//             العودة للرئيسية
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => router.push('/orders')}
//           className="border border-neutral-300 rounded-2xl py-4 mb-3"
//         >
//           <Text
//             className="text-center text-neutral-900 font-bold"
//             style={{ writingDirection: 'rtl' }}
//           >
//             عرض طلباتي
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => router.push(`/track?orderId=5`)}
//           className="border border-neutral-300 rounded-2xl py-4 mb-3"
//         >
//           <Text className="text-center text-neutral-900 font-extrabold">
//             تتبع الطلب
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeView>
//   )
// }


import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import SafeView from '@/components/SafeView'
import SuccessCheck from '@/components/SuccessCheck'

export default function OrderSuccessScreen() {
  const router = useRouter()


  const statusSteps = [
    { title: 'تم استلام الطلب', active: true },
    { title: 'قيد التجهيز', active: false },
    { title: 'تم الشحن', active: false },
  ]

  return (
    <SafeView className="flex-1 bg-[#F7FBFC]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="items-center pt-24 pb-14 px-6">
          {/* Brand Glow Background */}
          <View
            className="absolute top-0 w-full h-[260px]"
            style={{
              backgroundColor: '#88c1c5',
              opacity: 0.12,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
            }}
          />

          <SuccessCheck />

          <Text
            className="text-3xl font-extrabold text-neutral-900 mt-6"
            style={{ writingDirection: 'rtl' }}
          >
            تم تأكيد طلبك 🎉
          </Text>

          <Text
            className="text-neutral-600 mt-3 text-center text-base leading-6"
            style={{ writingDirection: 'rtl' }}
          >
            شكراً لتسوقك من دكانك، طلبك قيد المعالجة وسيصل إليك قريباً
          </Text>
        </View>

        {/* Order Summary Card */}
        {/* <View
          className="mx-6 bg-white rounded-3xl p-6 mt-3"
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 18,
            elevation: 10,
          }}
        >
          <Text
            className="text-lg font-extrabold text-neutral-900 mb-5"
            style={{ writingDirection: 'rtl' }}
          >
            ملخص الطلب
          </Text>

          {orderDetails.map((item) => (
            <View key={item.label} className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">{item.label}</Text>
              <Text className="font-bold text-neutral-900">{item.value}</Text>
            </View>
          ))}

          <View className="mt-4 pt-4 border-t border-neutral-200 flex-row justify-between">
            <Text className="text-lg font-extrabold text-neutral-900">الإجمالي</Text>
            <Text className="text-2xl font-extrabold text-[#88c1c5]">541.97 $</Text>
          </View>
        </View> */}

        {/* Status Timeline */}
        <View className="mx-6 mt-8 bg-white rounded-3xl p-6 shadow-sm">
          <Text
            className="text-lg font-extrabold text-neutral-900 mb-6"
            style={{ writingDirection: 'rtl' }}
          >
            حالة الطلب
          </Text>

          {statusSteps.map((step, i) => (
            <View key={i} className="flex-row items-center mb-5">
              <View
                className={`w-4 h-4 rounded-full ${step.active ? 'bg-[#88c1c5]' : 'bg-neutral-300'}`}
              />
              <View
                className={`flex-1 h-[2px] mx-3 ${step.active ? 'bg-[#88c1c5]' : 'bg-neutral-200'}`}
              />
              <Text
                className={`font-medium ${step.active ? 'text-neutral-900' : 'text-neutral-500'}`}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Actions */}
      <View className="px-6 py-6 mt-6">
        {/* Primary CTA */}
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/home')}
          className="rounded-2xl py-4 mb-4"
          style={{
            backgroundColor: '#88c1c5',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text
            className="text-center text-white font-extrabold text-lg"
            style={{ writingDirection: 'rtl' }}
          >
            العودة للرئيسية
          </Text>
        </TouchableOpacity>

        {/* Secondary CTA */}
        <TouchableOpacity
          onPress={() => router.push('/orders')}
          className="rounded-2xl py-4 mb-3 border border-neutral-300 bg-white"
        >
          <Text className="text-center font-bold text-neutral-800">
            عرض طلباتي
          </Text>
        </TouchableOpacity>

        {/* Tertiary CTA */}

        
        {/* <TouchableOpacity
          onPress={() => router.push(`/(order)/order-details/${id}`)}
          className="rounded-2xl py-4 border border-neutral-300 bg-white"
        >
          <Text className="text-center font-bold text-neutral-800">
            تتبع الطلب
          </Text>
        </TouchableOpacity> */}


      </View>
    </SafeView>
  )
}
