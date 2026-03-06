import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RTL_KEY = "RTL_CONFIGURED";

export async function setupRTL() {
  const isConfigured = await AsyncStorage.getItem(RTL_KEY);

  if (!isConfigured) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    await AsyncStorage.setItem(RTL_KEY, "true");
  }
}
