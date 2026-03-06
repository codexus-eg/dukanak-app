

// import React, { useEffect, useState } from 'react'
// import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import axios from 'axios'
// import SafeView from '@/components/SafeView'
// import { getToken } from '@/lib/auth-storage'

// type OrderItem = {
//   id: string
//   name: string
//   quantity: number
//   price: number
// }

// type Order = {
//   id: string
//   status: 'pending' | 'shipped' | 'delivered'
//   date: string
//   address: string
//   paymentMethod: string
//   items: OrderItem[]
//   subtotal: number
//   shipping: number
//   total: number
// }

// const STATUS_LABELS: Record<Order['status'], string> = {
//   pending: 'قيد المعالجة',
//   shipped: 'تم الشحن',
//   delivered: 'تم التوصيل',
// }

// const API_URL = 'https://docank.mahmoudalbatran.com/api/orders'
// // const TOKEN = 'YOUR_BEARER_TOKEN_HERE'

// export default function OrderDetailsPage() {
//   const { orderId } = useLocalSearchParams<{ orderId: string }>()
//   const router = useRouter()

//   const [order, setOrder] = useState<Order | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const token = await getToken();
//         const res = await axios.get(`${API_URL}/${orderId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         })

//         const apiOrder = res.data.order;

//         console.log(apiOrder, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')

//         // حساب subtotal من العناصر
//         const subtotal = apiOrder.order_items.reduce(
//           (sum: number, item: any) =>
//             sum + Number(item.unit_price) * item.quantity,
//           0
//         )

//         setOrder({
//           id: String(apiOrder.id),
//           status: apiOrder.status,
//           date: apiOrder.created_at.split('T')[0],
//           address: `${apiOrder.adress.city} - ${apiOrder.adress.address}`,
//           paymentMethod: 'الدفع عند الاستلام',
//           items: apiOrder.order_items.map((item: any) => ({
//             id: String(item.id),
//             name: `منتج رقم ${item.product_id}`,
//             quantity: item.quantity,
//             price: Number(item.unit_price),
//           })),
//           subtotal,
//           shipping: 0,
//           total: Number(apiOrder.total_price),
//         })
//       } catch (error) {
//         console.error('Error fetching order:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrder()
//   }, [orderId])

//   if (loading || !order) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <ActivityIndicator size="large" color="#88c1c5" />
//       </View>
//     )
//   }

//   return (
//     <SafeView className="flex-1 bg-gray-50 px-4 pt-4">
//       <ScrollView className="flex-1">
//         {/* Header */}
//         <View className="mb-4">
//           <Text className="text-xl font-bold">طلب رقم {order.id}</Text>
//           <Text className="text-gray-500 mt-1">{order.date}</Text>
//         </View>

//         {/* Status */}
//         <View className="bg-white rounded-2xl p-4 mb-4">
//           <Text className="font-semibold mb-2">حالة الطلب</Text>
//           <Text className="text-[#88c1c5] font-bold">
//             {STATUS_LABELS[order.status]}
//           </Text>
//         </View>

//         {/* Items */}
//         <View className="bg-white rounded-2xl p-4 mb-4">
//           <Text className="font-semibold mb-3">المنتجات</Text>
//           {order.items.map(item => (
//             <View key={item.id} className="flex-row justify-between mb-2">
//               <Text className="text-gray-700">
//                 {item.name} × {item.quantity}
//               </Text>
//               <Text className="font-semibold">
//                 {item.price * item.quantity} ر.س
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* Address */}
//         <View className="bg-white rounded-2xl p-4 mb-4">
//           <Text className="font-semibold mb-2">عنوان التوصيل</Text>
//           <Text className="text-gray-600">{order.address}</Text>
//         </View>

//         {/* Payment */}
//         <View className="bg-white rounded-2xl p-4 mb-4">
//           <Text className="font-semibold mb-2">طريقة الدفع</Text>
//           <Text className="text-gray-600">{order.paymentMethod}</Text>
//         </View>

//         {/* Summary */}
//         <View className="bg-white rounded-2xl p-4 mb-6">
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">المجموع</Text>
//             <Text>{order.subtotal} ر.س</Text>
//           </View>
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">الشحن</Text>
//             <Text>{order.shipping} ر.س</Text>
//           </View>
//           <View className="flex-row justify-between border-t pt-3">
//             <Text className="font-bold">الإجمالي</Text>
//             <Text className="font-bold">{order.total} ر.س</Text>
//           </View>
//         </View>

//         {/* Action */}
//         <Pressable
//           onPress={() => router.push(`/(order)/order-track/${orderId}`)}
//           className="bg-[#88c1c5] py-4 rounded-full mb-10"
//         >
//           <Text className="text-white text-center font-bold">
//             تتبع الطلب
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </SafeView>
//   )
// }








import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SafeView from '@/components/SafeView'
import { getToken } from '@/lib/auth-storage'
import { RefreshControl } from 'react-native'

/* ================= TYPES ================= */

type OrderStatus = 'pending' | 'shipped' | 'complete' | 'cancel'

type OrderItem = {
  id: number
  product_id: number
  quantity: number
  unit_price: number
}

type Order = {
  id: number
  status: OrderStatus
  created_at: string
  total_price: number
  adress: {
    city: string
    address: string
    name: string
  }
  order_items: OrderItem[]
}

/* ================= STEPS ================= */

const STEPS: { key: Exclude<OrderStatus, 'canceled'>; label: string }[] = [
  { key: 'pending', label: 'قيد الانتظار' },
  { key: 'shipped', label: 'تم الشحن' },
  { key: 'complete', label: 'مكتمل' },
]

const API_URL = 'https://docank.mahmoudalbatran.com/api/orders'

/* ================= SCREEN ================= */

export default function OrderDetailsWithTracking() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false)



  const fetchOrder = async () => {
  try {
    const token = await getToken()
    const res = await axios.get(`${API_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    setOrder(res.data.order)
  } catch (error) {
    console.error('Fetch order error:', error)
  } finally {
        setLoading(false)
      }
}



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = await getToken()
        const res = await axios.get(`${API_URL}/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })

        setOrder(res.data.order)
      } catch (error) {
        console.error('Fetch order error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId]);

  useEffect(() => {
  const load = async () => {
    setLoading(true)
    await fetchOrder()
    setLoading(false)
  }

  load()
}, [orderId])

const onRefresh = async () => {
  setRefreshing(true)
  await fetchOrder()
  setRefreshing(false)
}


  if (loading || !order) {
    return (
      <SafeView className="flex-1 items-center justify-center bg-[#F8FAFC]">
        <ActivityIndicator size="large" color="#F6A64D" />
      </SafeView>
    )
  }

  const isCanceled = order.status === 'cancel'
  const currentIndex = STEPS.findIndex(s => s.key === order.status)

  const subtotal = order.order_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  )

  /* ================= UI ================= */

  return (
    <SafeView className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="px-6 pt-8" refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#F6A64D']}
      tintColor="#F6A64D"
    />
  }>

        {/* HEADER */}
        <Text
          className="text-3xl font-extrabold text-[#1F2937]"
          style={{ writingDirection: 'rtl' }}
        >
          طلب رقم #{order.id}
        </Text>

        <Text
          className="text-neutral-500 mt-1 mb-8"
          style={{ writingDirection: 'rtl' }}
        >
          {order.created_at.split('T')[0]}
        </Text>

        {/* TRACKING */}
        {isCanceled ? (
          <View className="bg-red-50 border border-red-200 rounded-[28px] px-6 py-8 mb-8">
            <Text
              className="text-red-600 text-xl font-extrabold text-center"
              style={{ writingDirection: 'rtl' }}
            >
              ❌ تم إلغاء الطلب
            </Text>
          </View>
        ) : (
          <View className="bg-white rounded-[28px] px-6 py-8 shadow-sm mb-8">
            {STEPS.map((step, index) => {
              const completed = index < currentIndex
              const active = index === currentIndex
              const isLast = index === STEPS.length - 1

              return (
                <View key={step.key} className="flex-row">
                  <View className="items-center mr-4">
                    <View
                      className={`w-4 h-4 rounded-full ${
                        completed
                          ? 'bg-[#7CC7A4]'
                          : active
                          ? 'bg-[#F6A64D]'
                          : 'bg-neutral-300'
                      }`}
                    />

                    {!isLast && (
                      <View
                        className={`w-[2px] flex-1 mt-1 ${
                          completed || active
                            ? 'bg-[#7CC7A4]'
                            : 'bg-neutral-300'
                        }`}
                      />
                    )}
                  </View>

                  <View className="pb-8 flex-1">
                    <Text
                      className={`text-base font-semibold ${
                        completed || active
                          ? 'text-[#1F2937]'
                          : 'text-neutral-400'
                      }`}
                      style={{ writingDirection: 'rtl' }}
                    >
                      {step.label}
                    </Text>

                    {active && (
                      <View className="mt-2 self-start bg-[#F6A64D]/15 px-3 py-1 rounded-full">
                        <Text
                          className="text-xs text-[#F6A64D] font-bold"
                          style={{ writingDirection: 'rtl' }}
                        >
                          الحالة الحالية
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        )}

        {/* ITEMS */}
        <View className="bg-white rounded-[28px] px-6 py-6 mb-6">
          <Text className="font-bold text-lg mb-4" style={{ writingDirection: 'rtl' }}>
            المنتجات
          </Text>

          {order.order_items.map(item => (
            <View key={item.id} className="flex-row justify-between mb-3">
              <Text className="text-neutral-700">
                منتج #{item.product_id} × {item.quantity}
              </Text>
              <Text className="font-semibold">
                {item.unit_price * item.quantity} شيكل
              </Text>
            </View>
          ))}
        </View>

        {/* ADDRESS */}
        <View className="bg-white rounded-[28px] px-6 py-6 mb-6">
          <Text className="font-bold text-lg mb-2" style={{ writingDirection: 'rtl' }}>
            عنوان التوصيل
          </Text>
          <Text className="text-neutral-600">
            {order.adress.city} - {order.adress.address}
          </Text>
        </View>

        {/* SUMMARY */}
        <View className="bg-white rounded-[28px] px-6 py-6 mb-10">
          <View className="flex-row justify-between mb-2">
            <Text>المجموع</Text>
            <Text>{subtotal} شيكل</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text>الشحن</Text>
            <Text>{order?.total_price - subtotal} شيكل</Text>
          </View>

          <View className="flex-row justify-between border-t pt-3">
            <Text className="font-extrabold">الإجمالي</Text>
            <Text className="font-extrabold">{order.total_price} شيكل</Text>
          </View>
        </View>

      </ScrollView>
    </SafeView>
  )
}
