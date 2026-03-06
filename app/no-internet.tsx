import { Text, Pressable } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import SafeView from '@/components/SafeView'

export default function NoInternetScreen() {
  const recheckConnection = async () => {
    const state = await NetInfo.fetch()

    if (state.isConnected && state.isInternetReachable) {
      router.replace('/') // home page
    }
  }

  return (
    <SafeView className="flex-1 items-center justify-center bg-[#F8FAFC] px-6">
      <Ionicons name="wifi-outline" size={80} color="#9CA3AF" />

      <Text className="text-xl font-bold text-[#1F2937] mt-6">
        لا يوجد اتصال بالانترنت
      </Text>

      <Text className="text-center text-[#6B7280] mt-2">
        تأكد من اتصال الانترنت ثم اعد المحاوله
      </Text>

      <Pressable
        onPress={recheckConnection}
        className="mt-8 bg-[#7CC7A4] px-8 py-3 rounded-2xl"
      >
        <Text className="text-white font-semibold text-base">
          اعادة المحاوله
        </Text>
      </Pressable>
    </SafeView>
  )
}
