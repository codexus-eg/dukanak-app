
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import axios from "axios";
import { getToken } from "@/lib/auth-storage";


class NotificationService {

  async registerForPushNotifications(): Promise<string | null> {
    
    try {
      // 1️⃣ iOS permission (Android auto-granted)
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log("❌ Notification permission denied");
        return null;
      }

      // 2️⃣ Get REAL FCM token
      const fcmToken = await messaging().getToken();

       if (!fcmToken) {
      console.warn("⚠️ FCM token is null");
      return null;
    }


      console.log("🔥 FCM TOKEN:", fcmToken);

      // 3️⃣ Device name
      const deviceName = await DeviceInfo.getDeviceName();

      // 4️⃣ Send token to backend
      this.sendTokenToBackend(fcmToken, deviceName).catch((err) => {
      console.warn("⚠️ Failed to send FCM token to backend:", err?.message || err);
    });

      // 5️⃣ Listen for token refresh (VERY IMPORTANT)
      messaging().onTokenRefresh(async newToken => {
        console.log("🔄 FCM token refreshed:", newToken);
        this.sendTokenToBackend(newToken, deviceName).catch((err) => {
        console.warn("⚠️ Failed to refresh FCM token:", err?.message || err);
      });
      });

      return fcmToken;
    } catch (error) {
      console.error("❌ Failed to register FCM:", error);
      return null;
    }
  }

// SEND TOKEN TO BACKEND 

  private async sendTokenToBackend(token: string, deviceName: string) {
    const authToken = await getToken();

    if (!authToken) {
      return;
    }

    await axios.post(
      "https://docank.mahmoudalbatran.com/api/device-tokens",
      {
        token,
        device_name: deviceName,
        platform: Platform.OS,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("✅ FCM token sent to backend");
  }

// FOREGROUND NOTIFICATIONS
  onReceive(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
  ) {
    return messaging().onMessage(callback);
  }

// NOTIFICATION TAP (BACKGROUND) 

  onNotificationOpened(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
  ) {
    return messaging().onNotificationOpenedApp(callback);
  }

// APP OPENED FROM KILLED
  async getInitialNotification() {
    return messaging().getInitialNotification();
  }
}

export const notificationService = new NotificationService();

