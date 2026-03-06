// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// type SplashState = {
//   isSplashShown: boolean
//   markSplashShown: () => void
// }

// export const useSplashStore = create<SplashState>()(
//   persist(
//     (set) => ({
//       isSplashShown: false,
//       markSplashShown: () => set({ isSplashShown: true }),
//     }),
//     {
//       name: 'app-splash-storage', // AsyncStorage key
//     }
//   )
// )


import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SplashState = {
  isSplashShown: boolean
  markSplashShown: () => void
}

export const useSplashStore = create<SplashState>()(
  persist(
    (set) => ({
      isSplashShown: false,
      markSplashShown: () => set({ isSplashShown: true }),
    }),
    {
      name: 'app-splash-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
