
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

import { useProductStore } from '@/store/useProductStore'
import { getToken } from '@/lib/auth-storage'
import ProductCard from '@/components/ProductCard'
import ProductsSliderSkeleton from '@/components/ProductsSliderSkeleton'
import { useCartStore } from '@/store/cartStore'
import Toast from 'react-native-toast-message'
import ZoomableImageModal from '@/components/ZoomableImageModal'

import ProductDetailsSkeleton from '@/components/product/ProductDetailsSkeleton'
import ProductNotFound from '@/components/product/ProductNotFound'

export default function ProductDetails() {
  const product = useProductStore((s) => s.selectedProduct)
  const setProduct = useProductStore((s) => s.setProduct)
  const [quantity, setQuantity] = useState(1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [notFound, setNotFound] = useState(false)


  const { productId: id } = useLocalSearchParams()


  console.log('Selected Product:', id);

    // console.log('Selected Product:', product.id)




  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (!product) return

    const fetchProducts = async () => {
      const token = await getToken()
      try {
        setLoading(true)
        const res = await axios.get(
          'https://docank.mahmoudalbatran.com/api/products',
          {
            headers: {
              // Authorization: `Bearer ${token}`
            },
            params: {
              type: product?.category?.name,
              per_page: 20,
            },
          }
        )
        setProducts(res.data.products.data)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []);


  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      const token = await getToken();
      try {
        setLoading(true);
        const res = await axios.get(
          `https://docank.mahmoudalbatran.com/api/products/${id}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`
          //   },
          // }
        )
        console.log('Product Data:', res.data)
        setProduct(res?.data?.product)
      } catch (e) {
        console.log('Failed to load product', e)
        setNotFound(true)
      } finally {
        setLoading(false);
      }
    }

    fetchProduct()
  }, [id])

  const addToCart = () => {
    let item = { ...product };
    if (item) {
      addItem({
        id: item?.id,
        name: item?.name,
        price: item.price,
        quantity: quantity,
        image: item.image,

      });
    }
    Toast.show({
      type: 'success',
      text1: "success",
      text2: 'تمت الإضافة إلى السلة بنجاح',
    });
    console.log('Item added to cart');
  }

  if (notFound) return <ProductNotFound />
   if (loading) return <ProductDetailsSkeleton />
   
  // if (!product) return null

 

  return (
    <View className="flex-1 bg-brand-light">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= IMAGE SECTION ================= */}
        <View className="pt-12 pb-10 bg-brand-light">
          <View className="mx-5 bg-white rounded-3xl shadow-lg shadow-black/10 overflow-hidden">
            {/* <Image
              source={{
                // uri: `https://docank.mahmoudalbatran.com/storage/${product.image}`,
                uri: `${product.image}`,
              }}
              className="w-full h-72"
              resizeMode="contain"
            /> */}
            <Pressable onPress={() => setImageOpen(true)}>
              <Image
                source={{ uri: product?.image }}
                className="w-full h-72"
                resizeMode="contain"
              />
            </Pressable>
          </View>

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow"
          >
            <Ionicons name="arrow-forward" size={22} color="#1F2937" />
          </Pressable>
        </View>

        {/* ================= INFO ================= */}
        <View className="px-5 -mt-6">
          {/* Name & Price */}
          <View className="bg-white rounded-3xl px-5 py-6 shadow shadow-black/5 space-y-3">
            <Text className="text-2xl font-extrabold text-brand-dark">
              {product?.name}
            </Text>

            <View className="flex-row items-center gap-2">
              <Text className="text-2xl font-extrabold text-brand-accent">
                ₪ {product?.price}
              </Text>
              <Text className="text-sm text-gray-400">شامل الضريبة</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {product?.description && (
          <View className="px-5 mt-5">
            <View className="bg-white rounded-3xl px-5 py-5 shadow shadow-black/5">
              <Text className="text-sm font-bold text-brand-primary mb-2">
                وصف المنتج
              </Text>
              <Text className="text-[15px] text-gray-600 leading-7">
                {product?.description}
              </Text>
            </View>
          </View>
        )}

        {/* ================= RELATED PRODUCTS ================= */}
        {products.length > 1 && (
          <View className="mt-8">
            <View className="flex-row justify-between items-center px-5 mb-3">
              <Text className="text-xl font-extrabold text-brand-dark">
                منتجات مشابهة
              </Text>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/products',
                    params: {
                      categoryId: product?.category?.id,
                      categoryName: product?.category?.name,
                    },
                  })
                }
              >
                <Text className="text-brand-primary font-bold">
                  عرض الكل
                </Text>
              </Pressable>
            </View>

            {loading ? (
              <ProductsSliderSkeleton />
            ) : (
              <FlatList
                data={products.filter((p) => p?.id !== product?.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => <ProductCard item={item} />}
              />
            )}
          </View>
        )}

        {/* Space for sticky bar */}
        <View className="h-32" />
      </ScrollView>

      {/* ================= STICKY ADD TO CART ================= */}
      <View className="absolute bottom-12 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4">
        <View className="flex-row items-center gap-3">
          {/* Quantity */}
          <View className="flex-row items-center bg-gray-100 rounded-full overflow-hidden">
            <Pressable
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-brand-primary"
            >
              <Text className="text-white text-lg font-bold">−</Text>
            </Pressable>

            <Text className="px-4 font-bold text-lg">{quantity}</Text>

            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-brand-secondary"
            >
              <Text className="text-white text-lg font-bold">+</Text>
            </Pressable>
          </View>

          {/* Add to cart */}
          <Pressable className="flex-1 bg-brand-primary py-4 rounded-2xl active:scale-95" onPress={() => addToCart()}>
            <Text className="text-white text-center font-extrabold text-lg">
              أضف إلى السلة · ₪ {product?.price * quantity}
            </Text>
          </Pressable>
        </View>
      </View>
      <ZoomableImageModal
        visible={imageOpen}
        image={product?.image}
        onClose={() => setImageOpen(false)}
      />
    </View>
  )
}







