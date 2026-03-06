

import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import SafeView from '@/components/SafeView'
import { getToken } from '@/lib/auth-storage'
import { Ionicons } from '@expo/vector-icons'

type Order = {
  id: string | number
  date: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total: number | string
  itemsCount: number
}

const STATUS_STYLES: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function OrdersHistoryPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchOrders(1)
  }, [])

  const fetchOrders = async (pageNumber: number, isRefresh = false) => {
    pageNumber === 1 && !isRefresh ? setLoading(true) : setLoadingMore(true)

    try {
      const token = await getToken()
      const res = await fetch(`https://docank.mahmoudalbatran.com/api/orders?page=${pageNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await res.json()

      const mappedOrders: Order[] = (json.orders?.data ?? []).map((order: any) => ({
        id: order.id,
        date: order.created_at.split('T')[0],
        status: order.status,
        total: order.total_price,
        itemsCount: order.order_items.length,
      }))

      if (pageNumber === 1) {
        setOrders(mappedOrders)
      } else {
        setOrders(prev => [...prev, ...mappedOrders])
      }

      setPage(json.orders.current_page)
      setLastPage(json.orders.last_page)


    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
      setRefreshing(false)
    }
  }

  const loadMore = () => {
    if (!loadingMore && page < lastPage) {
      fetchOrders(page + 1)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchOrders(1, true)
  }

  if (loading && page === 1) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#88c1c5" />
      </View>
    )
  }

  return (
    <SafeView className="flex-1 bg-gray-50 px-4 pt-4 relative">
      <Pressable
        onPress={() => router.back()}
        className="absolute z-[99] top-12 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow"
      >
        <Ionicons name="arrow-forward" size={22} color="#1F2937" />
      </Pressable>
      <View className="flex-row items-center justify-between py-5 mb-4">
        {/* TITLE */}
        <Text className="text-2xl font-bold text-neutral-600 text-center flex-1">
          طلباتي
        </Text>
      </View>


      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/(order)/order-details/${item.id}`,
                params: { id: item.id },
              })
            }
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-semibold text-base">#{item.id}</Text>
              <View className={`px-3 py-1 rounded-full ${STATUS_STYLES[item.status]}`}>
                <Text className="text-xs font-semibold capitalize">{item.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm">{item.date}</Text>
              <Text className="text-gray-700 text-sm">{item.itemsCount} منتجات</Text>
            </View>

            <View className="mt-3 flex-row justify-between items-center">
              <Text className="text-lg font-bold">{item.total} شيكل</Text>
              <Text className="text-[#88c1c5] font-semibold">عرض التفاصيل</Text>
            </View>
          </Pressable>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color="#88c1c5" className="my-4" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#88c1c5']} />
        }
      />
    </SafeView>
  )
}
