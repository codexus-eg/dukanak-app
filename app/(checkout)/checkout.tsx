
const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};

type PaymentMethod =
  | 'BankOfPalestine'
  | 'PalPay'
  | 'Jawwal'
  | 'OnReceipt'
  | 'USDT';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from 'react-native'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import SafeView from '@/components/SafeView'
import { router } from 'expo-router'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth-storage'
import { useUserStore } from '@/store/user.store'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import { useAddressStore } from "@/store/address.store";
import Toast from 'react-native-toast-message';



export default function OrderDetailsScreen() {
  const items = useCartStore(state => state.items)
  const subtotal = useCartStore(state => state.subtotal())
  const clearCart = useCartStore(state => state?.clearCart);

  const [payment, setPayment] = useState<PaymentMethod>('OnReceipt');



  const {
    items: cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    shippingCost
  } = useCartStore();




  const [delivery, setDelivery] = useState<'standard' | 'express'>('standard');

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);




  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [codeId, setCodeId] = useState(null);
  // const [addresses, setAddresses] = useState<any[]>([]);
  // const [mainAddress, setMainAddress] = useState();

  const {
    addresses,
    mainAddressId,
    setMainAddress,
    fetchAddresses,
  } = useAddressStore();



  const PAYMENT_METHODS: {
    key: PaymentMethod;
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
  }[] = [
      { key: 'OnReceipt', label: 'الدفع عند الاستلام', icon: 'cash-outline' },
      { key: 'BankOfPalestine', label: 'بنك فلسطين', icon: 'card-outline' },
      { key: 'PalPay', label: 'PalPay', icon: 'wallet-outline' },
      { key: 'Jawwal', label: 'جوال باي', icon: 'phone-portrait-outline' },
      { key: 'USDT', label: 'USDT (عملة رقمية)', icon: 'logo-bitcoin' },
    ];




  const hasItems = items.length > 0;
  const hasAddress = !!mainAddressId;
  const canOrder = hasItems && hasAddress && !ordering;



  const user = useUserStore((s) => s.user);
  const userId = user?.id;


  const shipping = shippingCost();



  const total = subtotal + shipping;

  const discountAmount =
    discount > 0 ? (subtotal * discount) / 100 : 0;

  const finalTotal = total - discountAmount;




  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      Toast.show({
        type: 'error',
        text1: '❌ رمز الخصم فارغ',
      });
      return;
    }

    try {
      setApplyingPromo(true);
      const token = await getToken();

      const res = await axios.get(
        `https://docank.mahmoudalbatran.com/api/examination-codes?code=${promoCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res?.data, 'promo response');

      const discountValue = res.data.discountcodes?.Percentage;
      setCodeId(res.data.discountcodes?.id)

      setDiscount(discountValue);
      setPromoApplied(true);

      Toast.show({
        type: 'success',
        text1: '🎉 تم تطبيق الخصم',
        text2: `تم خصم ${discountValue}% ₪`,
      });
    } catch (error: any) {
      setDiscount(0);
      setPromoApplied(false);

      Toast.show({
        type: 'error',
        text1: '❌ رمز الخصم غير صالح',
      });
    } finally {
      setApplyingPromo(false);
    }
  };



  const confirmOrder = async () => {

    if (!hasItems) {
      alert("🛒 السلة فارغة، أضف منتجات أولاً");
      return;
    }

    if (!hasAddress) {
      alert("📍 الرجاء اختيار عنوان الشحن");
      return;
    }

    const token = await getToken();
    console.log({
      address_id: mainAddressId,
      total_price: finalTotal,
      payment,
      carts: items?.map((item) => {
        return {
          unit_price: item?.price,
          quantity: item?.quantity,
          product_id: item?.id,
        }
      })
    }, 'uuuuuuuuu')

    try {
      setOrdering(true);
      const res = await axios.post("https://docank.mahmoudalbatran.com/api/orders", {
        address_id: mainAddressId,
        total_price: finalTotal,
        Price_before_discount: total,
        code_id: codeId,
        payment: payment,
        carts: items?.map((item) => {
          return {
            unit_price: item?.price,
            quantity: item?.quantity,
            product_id: item?.id,
          }
        })
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res?.data, 'ooooooooooooooooooooooooooooooooooooooooooooo');
      if (res?.data) {
        router.push('/(order)/success');
        clearCart();

      }

    } catch (error) {
      console.log(error);

    } finally {
      setOrdering(false)
    }

  }

  /* ================== LOAD ADDRESSES ================== */

  useEffect(() => {
    fetchAddresses();
  }, []);


  return (
    <SafeView className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-6 pt-6"
      >

        {/* ===== Header ===== */}
        <View className="mb-6">
          <Text
            className="text-3xl font-extrabold text-neutral-900 dark:text-white"
            style={{ writingDirection: 'rtl' }}
          >
            إتمام الطلب
          </Text>
          <Text
            className="text-neutral-500 dark:text-neutral-400 mt-1"
            style={{ writingDirection: 'rtl' }}
          >
            مراجعة سريعة قبل الدفع
          </Text>
        </View>

        {/* ===== Order Items (Compact) ===== */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
            المنتجات
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map(item => (
              <View
                key={item.id}
                className="w-44 bg-white dark:bg-neutral-800 rounded-2xl mr-4 overflow-hidden"
              >
                <Image
                  source={{
                    // uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
                    uri: `${item.image}`,

                  }}
                  className="w-28 h-28"
                  resizeMode="cover"
                />

                <View className="p-3">
                  <Text
                    numberOfLines={2}
                    className="text-sm font-semibold text-neutral-900 dark:text-white"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {item.name}
                  </Text>

                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-xs text-neutral-500">
                      × {item.quantity}
                    </Text>
                    <Text className="font-bold text-neutral-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)} ₪
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ===== Shipping Address ===== */}
        <Card title="عنوان الشحن">
          {addresses.map((a) => (
            <Pressable
              key={a.id}
              onPress={() => setMainAddress(a.id)}
              style={{
                padding: 14,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: a.id == mainAddressId
                  ? BRAND.primary
                  : "#E5E7EB",
                backgroundColor: a.id == mainAddressId
                  ? "#ECFDF5"
                  : "#fff",
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>
                  <Ionicons
                    name={
                      a.name === "Home"
                        ? "home-outline"
                        : a.name === "Work"
                          ? "briefcase-outline"
                          : "location-outline"
                    }
                    size={22}
                    color={BRAND.primary}
                  />
                </Text>

                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>{a.name}</Text>
                  <Text style={{ color: BRAND.muted, fontSize: 13 }}>
                    {a.city} - {a.address}
                  </Text>
                </View>

                {a.id == mainAddressId && (
                  <Text><Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={BRAND.primary}
                  /></Text>
                )}
              </View>
            </Pressable>
          ))}

          {/* Add New Address */}
          <Pressable
            onPress={() => router.push("/settings")}
            style={{
              padding: 14,
              borderRadius: 16,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: BRAND.primary,
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="add-circle-outline" size={22} color={BRAND.primary} />
              <Text style={{ marginLeft: 8, color: BRAND.primary, fontWeight: "700" }}>
                إضافة عنوان جديد
              </Text>
            </View>
          </Pressable>

        </Card>

        {/* ===== Delivery ===== */}
        {/* <Card title="التوصيل">
          <Option
            label="توصيل عادي"
            value="10 $"
            active={delivery === 'standard'}
            onPress={() => setDelivery('standard')}
          />
          <Option
            label="توصيل سريع"
            value="20 $"
            active={delivery === 'express'}
            onPress={() => setDelivery('express')}
          />
        </Card> */}

        {/* ===== Payment ===== */}
        <Card title="طريقة الدفع">
          {PAYMENT_METHODS.map((method) => {
            const active = payment === method.key;

            return (
              <Pressable
                key={method.key}
                onPress={() => setPayment(method.key)}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: active ? BRAND.primary : '#E5E7EB',
                  backgroundColor: active ? '#ECFDF5' : '#fff',
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {method.icon && (
                      <Ionicons
                        name={method.icon}
                        size={22}
                        color={BRAND.primary}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: '700',
                        fontSize: 15,
                      }}
                    >
                      {method.label}
                    </Text>
                  </View>

                  {/* Right (radio) */}
                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={BRAND.primary}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </Card>
        <Card title="رمز الخصم">
          <View className="flex-row items-center gap-3">
            <View className="flex-1 bg-neutral-100 rounded-xl px-4 py-3">
              <TextInput
                placeholder="أدخل رمز الخصم"
                value={promoCode}
                onChangeText={setPromoCode}
                editable={!promoApplied}
              />
            </View>

            <TouchableOpacity
              disabled={applyingPromo || promoApplied}
              onPress={applyPromoCode}
              className={`px-4 py-3 rounded-xl ${promoApplied ? 'bg-green-400' : 'bg-[#6FB7D6]'
                }`}
            >
              <Text className="text-white font-bold">
                {promoApplied ? 'تم' : 'تطبيق'}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>



        {/* ===== Summary ===== */}
        <Card title="ملخص الطلب" last>
          <Row label="المجموع الفرعي" value={`${subtotal.toFixed(2)} ₪`} />
          <Row label="الشحن" value={`${shipping.toFixed(2)} ₪`} />
          {discount > 0 && (
            <Row
              label={`الخصم (${discount}%)`}
              value={`- ${discountAmount.toFixed(2)} ₪`}
            />
          )}
          <View className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
            <Row
              label="الإجمالي"
              value={`${finalTotal.toFixed(2)} ₪`}
              bold
            />
          </View>
        </Card>
      </ScrollView>

      {/* ===== CTA ===== */}
      <View className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white ">
        <TouchableOpacity className="bg-[#6FB7D6] dark:bg-white rounded-2xl py-4 " onPress={() => confirmOrder()}>
          <Text
            className="text-center text-white dark:text-black text-lg font-extrabold"
            style={{ writingDirection: 'rtl' }}
          >
            {ordering ? "جار الطلب...." : " تأكيد الطلب"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  )
}

/* ===== Reusable Components ===== */

function Card({
  title,
  children,
  last,
}: {
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <View className={`bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-${last ? '20' : ''}`}>
      <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
        {title}
      </Text>
      {children}
    </View>
  )
}

function Option({
  label,
  value,
  active,
  onPress,
}: {
  label: string
  value?: string
  active?: boolean
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 rounded-2xl mb-3 border
        ${active
          ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-700'
          : 'border-neutral-200 dark:border-neutral-700'
        }`}
    >
      <Text className="font-medium text-neutral-900 dark:text-white">
        {label}
      </Text>
      {value && (
        <Text className="font-bold text-neutral-900 dark:text-white">
          {value}
        </Text>
      )}
    </TouchableOpacity>
  )
}

function Row({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <View className="flex-row justify-between mb-2">
      <Text className="text-neutral-500 dark:text-neutral-400">
        {label}
      </Text>
      <Text
        className={`${bold ? 'text-lg font-extrabold' : 'font-medium'
          } text-neutral-900 dark:text-white`}
      >
        {value}
      </Text>
    </View>
  )
}













