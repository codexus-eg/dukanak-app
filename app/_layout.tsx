
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, router, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";
import { CustomToast } from "@/components/CustomToast";
import { useColorScheme } from "@/hooks/use-color-scheme";
import SplashOverlay from "@/components/SplashOverlay";
import { useSplashStore } from "@/store/splash.store";
import { setupRTL } from "@/utils/rtl";
import * as Notifications from "expo-notifications";
import "@/global.css";
import "react-native-reanimated";



import "@/firebase.background";
import { notificationService } from "@/services/notification.service";


import { Platform } from "react-native";







async function setupNotificationChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
    });
  }
}


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});



/* -------------------------------------------------------------------------- */
/*                               GLOBAL CONFIG                                */
/* -------------------------------------------------------------------------- */

// ✅ Toast config
export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  warning: (props: any) => <CustomToast {...props} type="warning" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
};


// ✅ Expo Router setting
export const unstable_settings = {
  anchor: "(tabs)",
};














/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type NotificationData = {
  type: "ORDER" | "MESSAGE" | "PROMOTION" | "SYSTEM";
  orderId?: string | number;
  chatId?: string | number;
};

/* -------------------------------------------------------------------------- */
/*                         CENTRALIZED NAVIGATION                              */
/* -------------------------------------------------------------------------- */

function handleNotificationNavigation(data: NotificationData) {
  if (data.orderId) {
        router.push(`/(order)/order-details/${String(data.orderId)}`);
      }
}

/* -------------------------------------------------------------------------- */
/*                                 ROOT LAYOUT                                */
/* -------------------------------------------------------------------------- */

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navState = useRootNavigationState();

  const { isSplashShown, markSplashShown } = useSplashStore();
  const [showSplash, setShowSplash] = useState(false);

  // 🧠 Prevent double handling (especially iOS)
  const handledInitialNotification = useRef(false);

  /* ---------------------------------------------------------------------- */
  /*                               SPLASH                                    */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!isSplashShown) {
      setShowSplash(true);
    }
  }, [isSplashShown]);

  const handleSplashFinish = () => {
    markSplashShown();
    setShowSplash(false);
  };


  useEffect(() => {
  if (!navState?.key) return;

  
  // 🔥 REQUIRED: create Android channel BEFORE FCM
  setupNotificationChannel();

  notificationService.registerForPushNotifications();

  const unsubscribeOnMessage = notificationService.onReceive(async message => {
  console.log("🟢 Foreground:", message);

  // Show system notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: String(message.notification?.title) || "New Notification",
      body: String(message.notification?.body) || "",
      data: message.data, // keep data for navigation
      sound: "default",
    },
    trigger: null, // null = immediate
  });
});



  // 2️⃣ App opened from background
  const unsubscribeOnOpen =
    notificationService.onNotificationOpened(message => {
      handledInitialNotification.current = true;

      const data = message.data as NotificationData;
      console.log("🟡 Opened from background:", data);

      if (data) {
        handleNotificationNavigation(data);
      }
    });

  // 3️⃣ App opened from killed state
  (async () => {
    const initialMessage =
      await notificationService.getInitialNotification();

    if (initialMessage && !handledInitialNotification.current) {
      handledInitialNotification.current = true;

      const data = initialMessage.data as NotificationData;
      console.log("🔴 Cold start:", data);

      if (data) {
        handleNotificationNavigation(data);
      }
    }
  })();

  return () => {
    unsubscribeOnMessage();
    unsubscribeOnOpen();
  };
}, [navState?.key]);



useEffect(() => {
  setupRTL();
}, []);



  /* ---------------------------------------------------------------------- */
  /*                         INTERNET CONNECTION                              */
  /* ---------------------------------------------------------------------- */


  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     if (!state.isConnected || !state.isInternetReachable) {
  //       router.replace("/no-internet");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  /* ---------------------------------------------------------------------- */
  /*                        INITIAL SAFE REDIRECT                             */
  /* ---------------------------------------------------------------------- */


  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */
  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>

      {/* Splash Overlay */}
      {showSplash && <SplashOverlay onFinish={handleSplashFinish} />}

      {/* Global Toast */}
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}








