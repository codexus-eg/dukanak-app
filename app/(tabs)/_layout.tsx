
import { router, Tabs } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { HapticTab } from '@/components/haptic-tab'
import { getToken } from '@/lib/auth-storage'
import { checkAuth } from '@/lib/check-auth'
import { AppState } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

/* ---------------- Icon Component ---------------- */

type TabBarIconProps = {
  name: string
  focused: boolean
  color: string
}

const TabBarIcon = ({ name, focused, color }: TabBarIconProps) => {
  const translateY = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: focused ? -6 : 0,
        useNativeDriver: true,
        damping: 14,
        stiffness: 120,
      }),
      Animated.spring(scale, {
        toValue: focused ? 1.05 : 1,
        useNativeDriver: true,
      }),
    ]).start()
  }, [focused])

  return (
    <Animated.View
      style={[
        styles.iconWrapper,
        focused && styles.iconWrapperFocused,
        {
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <Ionicons
        name={name as any}
        size={22}
        color={focused ? '#FFFFFF' : color}
      />
    </Animated.View>
  )
}

/* ---------------- Tabs Layout ---------------- */

export default function TabLayout() {

  const [checking, setChecking] = useState(true);
  const appState = useRef(AppState.currentState)


  const verifyAuth = async () => {
    try {
      await checkAuth(); // 👈 تحقق من التوكن
      setChecking(false);
    } catch {
      // router.replace("/(auth)/login");
    }
    finally {
      setChecking(false);
    }
  };
  useEffect(() => {


    verifyAuth();
    // لما يرجع التطبيق للواجهة
    const appStateSub = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        verifyAuth()
      }
      appState.current = nextState
    })

    // لما يرجع الإنترنت
    const netSub = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        verifyAuth()
      }
    })

    return () => {
      appStateSub.remove()
      netSub()
    }
  }, [])

  if (checking) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#1F2937',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="home-outline" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: 'التصنيفات',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="grid-outline" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'السلة',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="cart-outline" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'المحفوظات',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="heart-outline" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'الحساب',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="person-outline" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 39,
    left: 16,
    right: 16,
    height: 72,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 28,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapperFocused: {
    backgroundColor: '#7CC7A4',
    shadowColor: '#7CC7A4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },

  label: {
    fontSize: 11,
    marginTop: 2,
  },
})
