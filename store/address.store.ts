// import { create } from "zustand";

// type Address = {
//   id: number;
//   name: string;
//   city: string;
//   address: string;
//   isMain: boolean;
// };

// type AddressStore = {
//   addresses: Address[];
//   mainAddressId?: number;

//   setAddresses: (addresses: Address[]) => void;
//   setMainAddress: (id: number) => void;
//   clearAddresses: () => void;
// };

// export const useAddressStore = create<AddressStore>((set) => ({
//   addresses: [],
//   mainAddressId: undefined,

//   setAddresses: (addresses) =>
//     set({
//       addresses,
//       mainAddressId: addresses.find((a) => a.isMain)?.id,
//     }),

//   setMainAddress: (id) =>
//     set((state) => ({
//       mainAddressId: id,
//       addresses: state.addresses.map((a) => ({
//         ...a,
//         isMain: a.id === id,
//       })),
//     })),

//   clearAddresses: () =>
//     set({
//       addresses: [],
//       mainAddressId: undefined,
//     }),
// }));









// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { api } from "@/lib/api";
// import { getToken } from "@/lib/auth-storage";
// import { useUserStore } from "@/store/user.store";

// export interface Address {
//   id: number;
//   name: string;
//   city: string;
//   address: string;
//   isMain: boolean;
// }

// interface AddressStore {
//   addresses: Address[];
//   mainAddressId?: number;
//   loading: boolean;
//   error: string | null;

//   fetchAddresses: () => Promise<void>;
//   deleteAddress: (id: number) => Promise<void>;
//   setMainAddress: (id: number) => void;
//   clearAddresses: () => void;
// }

// export const useAddressStore = create<AddressStore>()(
//   persist(
//     (set, get) => ({
//       addresses: [],
//       mainAddressId: undefined,
//       loading: false,
//       error: null,

//       fetchAddresses: async () => {
//         // ⛔️ لا تعيد الجلب إذا كانت موجودة
//         // if (get().addresses.length > 0) return;

//         try {
//           set({ loading: true, error: null });

//           const token = await getToken();
//           const user = useUserStore.getState().user;

//           if (!user) throw new Error("User not logged in");

//           const res = await api.get("/addresses", {
//             params: { user_id: user.id },
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           const addresses = res.data.address?.data || [];

//           set({
//             addresses,
//             mainAddressId: addresses.find((a) => a.isMain)?.id,
//             loading: false,
//           });
//         } catch (e: any) {
//           set({
//             error: e.message || "Failed to load addresses",
//             loading: false,
//           });
//         }
//       },
//       deleteAddress: async (id) => {
//         try {
//           const token = await getToken();

//           await api.delete(`/addresses/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           set((state) => {
//             const remaining = state.addresses.filter((a) => a.id !== id);

//             return {
//               addresses: remaining,
//               mainAddressId:
//                 state.mainAddressId === id
//                   ? remaining.find((a) => a.isMain)?.id
//                   : state.mainAddressId,
//             };
//           });
//         } catch (e: any) {
//           set({ error: e.message || "Failed to delete address" });
//           console.log("Delete error:", e);
//         }
//       },


//       setMainAddress: (id) =>
//         set((state) => ({
//           mainAddressId: id,
//           addresses: state.addresses.map((a) => ({
//             ...a,
//             isMain: a.id === id,
//           })),
//         })),

//       clearAddresses: () =>
//         set({
//           addresses: [],
//           mainAddressId: undefined,
//         }),
//     }),
//     {
//       name: "address-storage", // 👈 AsyncStorage key
//       partialize: (state) => ({
//         addresses: state.addresses,
//         mainAddressId: state.mainAddressId,
//       }),
//     }
//   )
// );

























import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";
import { useUserStore } from "@/store/user.store";

export interface Address {
  id: number;
  name: string;
  city: string;
  address: string;
  isMain: boolean;
}

interface AddressStore {
  addresses: Address[];
  mainAddressId?: number;
  loading: boolean;
  error: string | null;

  fetchAddresses: () => Promise<void>;
  setMainAddress: (id: number) => void;
  deleteAddress: (id: number) => Promise<void>;
  clearAddresses: () => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      mainAddressId: undefined,
      loading: false,
      error: null,

      fetchAddresses: async () => {
        // if (get().addresses.length > 0) return;

        try {
          set({ loading: true, error: null });

          const token = await getToken();
          const user = useUserStore.getState().user;
          if (!user) throw new Error("User not logged in");

          const res = await api.get("/addresses", {
            params: { user_id: user.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const addresses = res.data.address?.data || [];

          set({
            addresses,
            mainAddressId: addresses.find((a) => a.isMain)?.id,
            loading: false,
          });
        } catch (e: any) {
          set({
            error: e.message || "Failed to load addresses",
            loading: false,
          });
        }
      },

      setMainAddress: (id) =>
        set((state) => ({
          mainAddressId: id,
          addresses: state.addresses.map((a) => ({
            ...a,
            isMain: a.id === id,
          })),
        })),

      deleteAddress: async (id) => {
        const token = await getToken();

        await api.delete(`/addresses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set((state) => {
          const remaining = state.addresses.filter((a) => a.id !== id);
          return {
            addresses: remaining,
            mainAddressId:
              state.mainAddressId === id
                ? remaining.find((a) => a.isMain)?.id
                : state.mainAddressId,
          };
        });
      },

      clearAddresses: () => ({
        addresses: [],
        mainAddressId: undefined,
      }),
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => AsyncStorage), // ✅ هذا هو السطر المهم
      partialize: (state) => ({
        addresses: state.addresses,
        mainAddressId: state.mainAddressId,
      }),
    }
  )
);
