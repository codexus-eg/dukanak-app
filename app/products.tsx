
// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import {
//   View,
//   TextInput,
//   FlatList,
//   ActivityIndicator,
//   Pressable,
// } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import SafeView from '@/components/SafeView'
// import { getToken } from '@/lib/auth-storage'
// import axios from 'axios'

// import ProductsFilterModal, {
//   ProductsFilterValues,
// } from '@/components/ProductsFilterModal'
// import { useLocalSearchParams } from 'expo-router'
// import ProductCard from '@/components/ProductCard'

// export default function ProductsPage() {
//   const { categoryName } = useLocalSearchParams<{ categoryName?: string }>()

//   const [search, setSearch] = useState('')
//   const [debouncedSearch, setDebouncedSearch] = useState('')
//   const [products, setProducts] = useState<any[]>([])
//   const [filters, setFilters] = useState<ProductsFilterValues>({
//     categoryId: null,
//     condition: null,
//   })

//   const [page, setPage] = useState(1)
//   const [hasMore, setHasMore] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [filterVisible, setFilterVisible] = useState(false)
//   const [refreshing, setRefreshing] = useState(false)

//   const requestLock = useRef(false)

//   /* ---------------- Debounce Search ---------------- */
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(search), 500)
//     return () => clearTimeout(t)
//   }, [search])

//   /* ---------------- Fetch Function ---------------- */
//   const fetchProducts = async (pageToFetch: number, reset = false) => {
//     if (requestLock.current) return
//     requestLock.current = true
//     setLoading(true)

//     try {
//       const token = await getToken()

//       const res = await axios.get(
//         'https://docank.mahmoudalbatran.com/api/products',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//             page: pageToFetch,
//             per_page: 20,
//             type: filters.categoryId || categoryName,
//             condition: filters.condition,
//             search: debouncedSearch,
//           },
//         }
//       )

//       const pagination = res.data.products
//       const newProducts = pagination.data

//       setProducts(prev =>
//         reset ? newProducts : [...prev, ...newProducts]
//       )

//       setHasMore(!!pagination.next_page_url)
//       setPage(pageToFetch)
//     } catch (e) {
//       console.log('Fetch error:', e)
//     } finally {
//       requestLock.current = false
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }

//   /* ---------------- Initial + Filters + Search ---------------- */
//   useEffect(() => {
//     setHasMore(true)
//     fetchProducts(1, true)
//   }, [filters, debouncedSearch])

//   /* ---------------- Pagination ---------------- */
//   const loadMore = () => {
//     if (loading || !hasMore) return
//     fetchProducts(page + 1)
//   }

//   /* ---------------- Pull to Refresh ---------------- */
//   const onRefresh = () => {
//     setRefreshing(true)
//     setHasMore(true)
//     fetchProducts(1, true)
//   }

//   const renderItem = useCallback(
//     ({ item }) => <ProductCard item={item} />,
//     []
//   )

//   return (
//     <SafeView className="flex-1 bg-[#F8FAFC] pt-4">
//       {/* Header */}
//       <View className="flex-row px-4 mb-4 items-center gap-2">
//         <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 h-12 shadow-sm">
//           <Ionicons name="search-outline" size={18} color="#9CA3AF" />
//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             placeholder="ابحث عن المنتجات"
//             className="flex-1 text-sm text-[#1F2937]"
//           />
//         </View>

//         <Pressable
//           onPress={() => setFilterVisible(true)}
//           className="bg-[#7CC7A4] p-3 rounded-2xl shadow-sm"
//         >
//           <Ionicons name="options-outline" size={20} color="#fff" />
//         </Pressable>
//       </View>

//       <FlatList
//         data={products}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 120 }}
//         showsVerticalScrollIndicator={false}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//         ListFooterComponent={
//           loading && products.length > 0 ? (
//             <ActivityIndicator className="my-6" />
//           ) : null
//         }
//       />

//       <ProductsFilterModal
//         visible={filterVisible}
//         values={filters}
//         onClose={() => setFilterVisible(false)}
//         onApply={setFilters}
//       />

//       {loading && products.length === 0 && (
//         <ActivityIndicator size="large" className="mt-20" />
//       )}
//     </SafeView>
//   )
// }









import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import SafeView from '@/components/SafeView'
import ProductCard from '@/components/ProductCard'
import ProductsFilterModal, {
  ProductsFilterValues,
} from '@/components/ProductsFilterModal'
import { useLocalSearchParams } from 'expo-router'
import { getToken } from '@/lib/auth-storage'
import { useCategoriesStore } from '@/store/categories.store'

export default function ProductsPage() {
  const { categoryName, search: searchParam } =
    useLocalSearchParams<{
      categoryName?: string
      search?: string
    }>()

  const { categories } = useCategoriesStore()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [filters, setFilters] =
    useState<ProductsFilterValues>({
      category: null,
      subCategory: null,
      typeProduct: null,
      priceRange: null,

    })

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)




  const requestLock = useRef(false);
  const initialized = useRef(false);


  /* Debounce */
  useEffect(() => {
    // const t = setTimeout(
    //   () => setDebouncedSearch(search),
    //   500
    // )
    const t = setTimeout(() => {
      setDebouncedSearch(search)

      if (!initialized.current) {
        initialized.current = true
      }
    }, 500)
    return () => clearTimeout(t)
  }, [search])

  /* Sub Categories */
  const selectedCategory = categories.find(
    c => c.name === (filters.category || categoryName)
  )

  const subCategories =
    selectedCategory?.subcategory || []

  const resetSearch = () => {
    setSearch("");
    setDebouncedSearch("");
  }

  /* Fetch Products */
  const fetchProducts = async (
    pageToFetch: number,
    reset = false
  ) => {
    if (requestLock.current) return
    requestLock.current = true
    setLoading(true)

    try {
      const token = await getToken()
      const res = await axios.get(
        'https://docank.mahmoudalbatran.com/api/products',
        {
          headers: {
            //  Authorization: `Bearer ${token}` 
          },
          params: {
            page: pageToFetch,
            per_page: 5,
            type:
              filters.category || categoryName,
            typeSub: filters.subCategory,
            typeProduct: filters.condition,
            search: debouncedSearch,
            price_min: filters.priceRange?.min,
            price_max: filters.priceRange?.max,
          },
        }
      )

      const pagination = res.data.products
      const newProducts = pagination.data

      setProducts(prev =>
        reset ? newProducts : [...prev, ...newProducts]
      )
      setHasMore(!!pagination.next_page_url)
      setPage(pageToFetch)
    } catch (e) {
      console.log(e)
    } finally {
      requestLock.current = false
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (!initialized.current) return
    setHasMore(true)
    fetchProducts(1, true)
  }, [filters, debouncedSearch]);

  useEffect(() => {
    if (categoryName) {
      setFilters(prev => ({
        ...prev,
        category: categoryName,
        subCategory: null,
      }))
    }
  }, [categoryName])


  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
      // setDebouncedSearch(searchParam);
    }
  }, [searchParam])



  const loadMore = () => {
    if (!loading && hasMore) fetchProducts(page + 1)
  }

  const onRefresh = () => {
    setRefreshing(true)
    setHasMore(true)
    fetchProducts(1, true)
  }

  const renderItem = useCallback(
    ({ item }) => <ProductCard item={item} />,
    []
  )

  return (
    <SafeView className="flex-1 bg-[#F8FAFC] pt-4">
      {/* Header */}
      <View className="flex-row px-4 mb-3 gap-2">
        <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 h-12">
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="ابحث عن المنتجات"
            className="flex-1 text-sm"
          />
        </View>

        <Pressable
          onPress={() => setFilterVisible(true)}
          className="bg-[#7CC7A4] p-3 rounded-2xl"
        >
          <Ionicons
            name="options-outline"
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* Sub Categories */}
      {subCategories.length > 0 && (
        <View className="px-4 mb-3">
          <FlatList
            horizontal
            data={subCategories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const active =
                filters.subCategory === item.name

              return (
                <Pressable
                  onPress={() => {
                    resetSearch();
                    setFilters(prev => ({
                      ...prev,
                      subCategory:
                        prev.subCategory === item.name
                          ? null
                          : item.name,
                    }))
                  }
                  }
                  className={`px-4 py-2 mr-2 rounded-full border ${active
                      ? 'bg-brand-primary border-brand-primary'
                      : 'border-brand-primary/40'
                    }`}
                >
                  <Text
                    className={`text-sm font-semibold ${active
                        ? 'text-white'
                        : 'text-brand-dark'
                      }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )
            }}
          />
        </View>
      )}

      {/* Products */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !loading && (
            <View className="mt-20 items-center">
              <Text className="text-gray-500">
                لا توجد منتجات
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          loading && products.length > 0 ? (
            <ActivityIndicator className="my-6" />
          ) : null
        }
      />

      <ProductsFilterModal
        visible={filterVisible}
        values={filters}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
      />

      {loading && products.length === 0 && (
        <ActivityIndicator
          size="large"
          className="mt-20"
        />
      )}
    </SafeView>
  )
}
