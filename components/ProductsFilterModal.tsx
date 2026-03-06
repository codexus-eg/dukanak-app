// import React from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native'
// import { useCategoriesStore } from '@/store/categories.store'

// export interface ProductsFilterValues {
//   categoryId: number | null
//   condition: 'new' | 'used' | null
// }

// interface Props {
//   visible: boolean
//   values: ProductsFilterValues
//   onApply: (values: ProductsFilterValues) => void
//   onClose: () => void
// }

// export default function ProductsFilterModal({
//   visible,
//   values,
//   onApply,
//   onClose,
// }: Props) {
//   const { categories, loading } = useCategoriesStore()

//   const [localValues, setLocalValues] =
//     React.useState<ProductsFilterValues>(values)

//   // Sync when opening
//   React.useEffect(() => {
//     if (visible) setLocalValues(values)
//   }, [visible])

//   const toggleCategory = (id: number) => {
//     console.log(id, 'yyyyyyyyy');
//     setLocalValues(prev => ({
//       ...prev,
//       categoryId: prev.categoryId === id ? null : id,
//     }))

//   }

//   const toggleCondition = (condition: 'new' | 'used') => {
//     setLocalValues(prev => ({
//       ...prev,
//       condition: prev.condition === condition ? null : condition,
//     }))
//   }

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View className="flex-1 bg-black/40 justify-end">
//         <View className="bg-white rounded-t-3xl p-6 max-h-[75%]">

//           {/* Header */}
//           <Text className="text-lg font-bold text-center mb-4">
//             تصفية المنتجات
//           </Text>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/* Categories */}
//             <Text className="font-semibold mb-2">الفئة</Text>

//             {loading ? (
//               <ActivityIndicator className="my-4" />
//             ) : (
//               <View className="flex-row flex-wrap mb-4">
//                 {categories.map(cat => (
//                   <Pressable
//                     key={cat.id}
//                     onPress={() => toggleCategory(cat.name)} //id
//                     className={`px-4 py-2 m-1 rounded-full border ${
//                       localValues.categoryId === cat.name  //id
//                         ? 'bg-[#7CC7A4]'
//                         : 'border-neutral-300'
//                     }`}
//                   >
//                     <Text
//                       className={`text-sm ${
//                         localValues.categoryId === cat.name  //id
//                           ? 'text-white'
//                           : 'text-[#1F2937]'
//                       }`}
//                     >
//                       {cat.name}
//                     </Text>
//                   </Pressable>
//                 ))}
//               </View>
//             )}

//             {/* Condition */}
//             <Text className="font-semibold mb-2">الحالة</Text>
//             <View className="flex-row gap-3 mb-4">
//               {['new', 'used'].map(cond => (
//                 <Pressable
//                   key={cond}
//                   onPress={() =>
//                     toggleCondition(cond as 'new' | 'used')
//                   }
//                   className={`px-4 py-2 rounded-full border ${
//                     localValues.condition === cond
//                       ? 'bg-[#6FB7D6]'
//                       : 'border-neutral-300'
//                   }`}
//                 >
//                   <Text
//                     className={`text-sm ${
//                       localValues.condition === cond
//                         ? 'text-white'
//                         : 'text-[#1F2937]'
//                     }`}
//                   >
//                     {cond === 'new' ? 'جديد' : 'مستعمل'}
//                   </Text>
//                 </Pressable>
//               ))}
//             </View>
//           </ScrollView>

//           {/* Actions */}
//           <View className="flex-row gap-3 mt-4">
//             <Pressable
//               onPress={onClose}
//               className="flex-1 py-3 rounded-full border border-neutral-300"
//             >
//               <Text className="text-center font-semibold">إلغاء</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => {
//                 onApply(localValues)
//                 onClose()
//               }}
//               className="flex-1 py-3 rounded-full bg-[#7CC7A4]"
//             >
//               <Text className="text-white text-center font-bold">
//                 تطبيق
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   )
// }











// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native'
// import { useCategoriesStore } from '@/store/categories.store'

// export interface ProductsFilterValues {
//   categoryId: number | null
//   condition: 'new' | 'used' | null
// }

// interface Props {
//   visible: boolean
//   values: ProductsFilterValues
//   onApply: (values: ProductsFilterValues) => void
//   onClose: () => void
// }

// export default function ProductsFilterModal({
//   visible,
//   values,
//   onApply,
//   onClose,
// }: Props) {
//   const { categories, loading } = useCategoriesStore()

//   const [localValues, setLocalValues] =
//     useState<ProductsFilterValues>(values)

//   useEffect(() => {
//     if (visible) setLocalValues(values)
//   }, [visible])

//   const toggleCategory = (id: number) => {
//     setLocalValues(prev => ({
//       ...prev,
//       categoryId: prev.categoryId === id ? null : id,
//     }))
//   }

//   const toggleCondition = (condition: 'new' | 'used') => {
//     setLocalValues(prev => ({
//       ...prev,
//       condition: prev.condition === condition ? null : condition,
//     }))
//   }

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <Pressable
//     className="flex-1 bg-black/40 justify-end"
//     onPress={onClose}
//   >
//     {/* Stop propagation */}
//     <Pressable
//       className="bg-white rounded-t-3xl p-6 max-h-[75%]"
//       onPress={() => {}}
//     >
//       <View className="flex-1 bg-black/40 justify-end">
//         <View className="bg-white rounded-t-3xl p-6 max-h-[75%]">

//           {/* Header */}
//           <Text className="text-lg font-bold text-center mb-4">
//             تصفية المنتجات
//           </Text>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/* Categories */}
//             <Text className="font-semibold mb-2">الفئة</Text>

//             {loading ? (
//               <ActivityIndicator className="my-4" />
//             ) : (
//               <View className="flex-row flex-wrap mb-4">
//                 {categories.map(cat => {
//                   const active = localValues.categoryId === cat.name
//                   return (
//                     <Pressable
//                       key={cat.id}
//                       onPress={() => toggleCategory(cat.name)}
//                       className={`px-4 py-2 m-1 rounded-full border ${
//                         active
//                           ? 'bg-[#7CC7A4] border-[#7CC7A4]'
//                           : 'border-neutral-300'
//                       }`}
//                     >
//                       <Text
//                         className={`text-sm ${
//                           active ? 'text-white' : 'text-[#1F2937]'
//                         }`}
//                       >
//                         {cat.name}
//                       </Text>
//                     </Pressable>
//                   )
//                 })}
//               </View>
//             )}

//             {/* Condition */}
//             <Text className="font-semibold mb-2">الحالة</Text>
//             <View className="flex-row gap-3 mb-4">
//               {[
//                 { key: 'new', label: 'جديد' },
//                 { key: 'used', label: 'مستعمل' },
//               ].map(item => {
//                 const active = localValues.condition === item.key
//                 return (
//                   <Pressable
//                     key={item.key}
//                     onPress={() =>
//                       toggleCondition(item.key as 'new' | 'used')
//                     }
//                     className={`px-4 py-2 rounded-full border ${
//                       active
//                         ? 'bg-[#6FB7D6] border-[#6FB7D6]'
//                         : 'border-neutral-300'
//                     }`}
//                   >
//                     <Text
//                       className={`text-sm ${
//                         active ? 'text-white' : 'text-[#1F2937]'
//                       }`}
//                     >
//                       {item.label}
//                     </Text>
//                   </Pressable>
//                 )
//               })}
//             </View>
//           </ScrollView>

//           {/* Actions */}
//           <View className="flex-row gap-3 mt-4">
//             <Pressable
//               onPress={onClose}
//               className="flex-1 py-3 rounded-full border border-neutral-300"
//             >
//               <Text className="text-center font-semibold">إلغاء</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => {
//                 onApply(localValues)
//               }}
//               className="flex-1 py-3 rounded-full bg-[#7CC7A4]"
//             >
//               <Text className="text-white text-center font-bold">
//                 تطبيق
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Pressable>
//   </Pressable>

//     </Modal>
//   )
// }









// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native'
// import { useCategoriesStore } from '@/store/categories.store'

// export interface ProductsFilterValues {
//   categoryId: number | null
//   condition: 'new' | 'used' | null
// }

// interface Props {
//   visible: boolean
//   values: ProductsFilterValues
//   onApply: (values: ProductsFilterValues) => void
//   onClose: () => void
// }

// export default function ProductsFilterModal({
//   visible,
//   values,
//   onApply,
//   onClose,
// }: Props) {
//   const { categories, loading } = useCategoriesStore()

//   const [localValues, setLocalValues] =
//     useState<ProductsFilterValues>(values)

//   // Sync values when modal opens
//   useEffect(() => {
//     if (visible) setLocalValues(values)
//   }, [visible])

//   const toggleCategory = (id: number) => {
//     setLocalValues(prev => ({
//       ...prev,
//       categoryId: prev.categoryId === id ? null : id,
//     }))
//   }

//   const toggleCondition = (condition: 'new' | 'used') => {
//     setLocalValues(prev => ({
//       ...prev,
//       condition: prev.condition === condition ? null : condition,
//     }))
//   }

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose} // ANDROID BACK BUTTON
//     >
//       {/* Overlay (tap to dismiss) */}
//       <Pressable
//         className="flex-1 bg-black/40 justify-end"
//         onPress={onClose}
//       >
//         {/* Bottom Sheet (stop propagation) */}
//         <Pressable
//           className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[75%]"
//           onPress={() => {}}
//         >
//           {/* Header */}
//           <Text className="text-lg font-bold text-center mb-4">
//             تصفية المنتجات
//           </Text>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/* Categories */}
//             <Text className="font-semibold mb-2">الفئة</Text>

//             {loading ? (
//               <ActivityIndicator className="my-4" />
//             ) : (
//               <View className="flex-row flex-wrap mb-4">
//                 {categories.map(cat => {
//                   const active = localValues.categoryId === cat.name
//                   return (
//                     <Pressable
//                       key={cat.id}
//                       onPress={() => toggleCategory(cat.name)}
//                       className={`px-4 py-2 m-1 rounded-full border ${
//                         active
//                           ? 'bg-[#7CC7A4] border-[#7CC7A4]'
//                           : 'border-neutral-300'
//                       }`}
//                     >
//                       <Text
//                         className={`text-sm ${
//                           active ? 'text-white' : 'text-[#1F2937]'
//                         }`}
//                       >
//                         {cat.name}
//                       </Text>
//                     </Pressable>
//                   )
//                 })}
//               </View>
//             )}

//             {/* Condition */}
//             <Text className="font-semibold mb-2">الحالة</Text>
//             <View className="flex-row gap-3 mb-6">
//               {[
//                 { key: 'new', label: 'جديد' },
//                 { key: 'used', label: 'مستعمل' },
//               ].map(item => {
//                 const active = localValues.condition === item.key
//                 return (
//                   <Pressable
//                     key={item.key}
//                     onPress={() =>
//                       toggleCondition(item.key as 'new' | 'used')
//                     }
//                     className={`flex-1 py-3 rounded-full border ${
//                       active
//                         ? 'bg-[#6FB7D6] border-[#6FB7D6]'
//                         : 'border-neutral-300'
//                     }`}
//                   >
//                     <Text
//                       className={`text-center font-semibold ${
//                         active ? 'text-white' : 'text-[#1F2937]'
//                       }`}
//                     >
//                       {item.label}
//                     </Text>
//                   </Pressable>
//                 )
//               })}
//             </View>
//           </ScrollView>

//           {/* Actions */}
//           <View className="flex-row gap-3">
//             <Pressable
//               onPress={onClose}
//               className="flex-1 py-3 rounded-full border border-neutral-300"
//             >
//               <Text className="text-center font-semibold">إلغاء</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => {
//                 onApply(localValues)
//                 onClose()
//               }}
//               className="flex-1 py-3 rounded-full bg-[#7CC7A4]"
//             >
//               <Text className="text-white text-center font-bold">
//                 تطبيق
//               </Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Pressable>
//     </Modal>
//   )
// }








// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native'
// import { useCategoriesStore } from '@/store/categories.store'

// export interface ProductsFilterValues {
//   categoryId: number | null
//   condition: 'new' | 'used' | null
// }

// interface Props {
//   visible: boolean
//   values: ProductsFilterValues
//   onApply: (values: ProductsFilterValues) => void
//   onClose: () => void
// }

// export default function ProductsFilterModal({
//   visible,
//   values,
//   onApply,
//   onClose,
// }: Props) {
//   const { categories, loading } = useCategoriesStore()
//   const [localValues, setLocalValues] = useState(values)

//   useEffect(() => {
//     if (visible) setLocalValues(values)
//   }, [visible])

//   const toggleCategory = (id: number) => {
//     setLocalValues(prev => ({
//       ...prev,
//       categoryId: prev.categoryId === id ? null : id,
//     }))
//   }

//   const toggleCondition = (condition: 'new' | 'used') => {
//     setLocalValues(prev => ({
//       ...prev,
//       condition: prev.condition === condition ? null : condition,
//     }))
//   }

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       {/* Overlay */}
//       <Pressable
//         className="flex-1 bg-black/40 justify-end"
//         onPress={onClose}
//       >
//         {/* Sheet */}
//         <Pressable
//           className="bg-brand-light rounded-t-3xl px-6 pt-6 pb-8 max-h-[75%]"
//           onPress={() => {}}
//         >
//           {/* Header */}
//           <View className="flex-row items-center justify-between mb-5">
//             <Text className="text-lg font-extrabold text-brand-dark">
//               تصفية المنتجات
//             </Text>

//             <Pressable
//               onPress={() =>
//                 setLocalValues({ categoryId: null, condition: null })
//               }
//             >
//               <Text className="text-sm font-bold text-brand-accent">
//                 إعادة تعيين
//               </Text>
//             </Pressable>
//           </View>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/* Categories */}
//             <Text className="font-semibold text-brand-dark mb-3">
//               الفئة
//             </Text>

//             {loading ? (
//               <ActivityIndicator className="my-4" />
//             ) : (
//               <View className="flex-row flex-wrap mb-6">
//                 {categories.map(cat => {
//                   const active = localValues.categoryId === cat.name
//                   return (
//                     <Pressable
//                       key={cat.id}
//                       onPress={() => toggleCategory(cat.name)}
//                       className={`px-4 py-2 m-1 rounded-full border ${
//                         active
//                           ? 'bg-brand-primary border-brand-primary'
//                           : 'border-brand-primary/30'
//                       }`}
//                     >
//                       <Text
//                         className={`text-sm font-semibold ${
//                           active
//                             ? 'text-white'
//                             : 'text-brand-dark'
//                         }`}
//                       >
//                         {cat.name}
//                       </Text>
//                     </Pressable>
//                   )
//                 })}
//               </View>
//             )}

//             {/* Condition */}
//             <Text className="font-semibold text-brand-dark mb-3">
//               الحالة
//             </Text>

//             <View className="flex-row gap-3 mb-8">
//               {[
//                 { key: 'new', label: 'جديد' },
//                 { key: 'used', label: 'مستعمل' },
//               ].map(item => {
//                 const active = localValues.condition === item.key
//                 return (
//                   <Pressable
//                     key={item.key}
//                     onPress={() =>
//                       toggleCondition(item.key as 'new' | 'used')
//                     }
//                     className={`flex-1 py-3 rounded-full border ${
//                       active
//                         ? 'bg-brand-secondary border-brand-secondary'
//                         : 'border-brand-secondary/40'
//                     }`}
//                   >
//                     <Text
//                       className={`text-center font-bold ${
//                         active
//                           ? 'text-white'
//                           : 'text-brand-dark'
//                       }`}
//                     >
//                       {item.label}
//                     </Text>
//                   </Pressable>
//                 )
//               })}
//             </View>
//           </ScrollView>

//           {/* Actions */}
//           <View className="flex-row gap-3">
//             <Pressable
//               onPress={onClose}
//               className="flex-1 py-3 rounded-full border border-brand-dark/20"
//             >
//               <Text className="text-center font-semibold text-brand-dark">
//                 إلغاء
//               </Text>
//             </Pressable>

//             <Pressable
//               onPress={() => {
//                 onApply(localValues)
//                 onClose()
//               }}
//               className="flex-1 py-3 rounded-full bg-brand-primary"
//             >
//               <Text className="text-white text-center font-extrabold">
//                 تطبيق
//               </Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Pressable>
//     </Modal>
//   )
// }
















import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useCategoriesStore } from '@/store/categories.store'

export interface ProductsFilterValues {
  category: string | null
  subCategory: string | null
  condition: 'new' | 'old' | null,
  priceRange: {
    min: number
    max: number
  } | null
}


interface Props {
  visible: boolean
  values: ProductsFilterValues
  onApply: (values: ProductsFilterValues) => void
  onClose: () => void
}

export default function ProductsFilterModal({
  visible,
  values,
  onApply,
  onClose,
}: Props) {
  const { categories, loading, fetchCategories } =
    useCategoriesStore()

  const [localValues, setLocalValues] = useState(values);
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    if (visible) {
      fetchCategories()
      setLocalValues(values)
    }
    setMinPrice(values.priceRange?.min?.toString() || '')
    setMaxPrice(values.priceRange?.max?.toString() || '')
  }, [visible])



  const toggleCategory = (name: string) => {
    setLocalValues(prev => ({
      ...prev,
      category: prev.category === name ? null : name,
      subCategory: null, // reset sub
    }))
  }

  const toggleCondition = (condition: 'new' | 'old') => {
    setLocalValues(prev => ({
      ...prev,
      condition: prev.condition === condition ? null : condition,
    }))
  }

  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={80}
  style={{ flex: 1 }}
>
  <ScrollView
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
     <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/40 justify-end"
        onPress={onClose}
      >
        <Pressable
          className="bg-brand-light rounded-t-3xl px-6 pt-6 pb-8 max-h-[75%]"
          onPress={() => { }}
        >
          {/* Header */}
          <View className="flex-row justify-between mb-5">
            <Text className="text-lg font-extrabold text-brand-dark">
              تصفية المنتجات
            </Text>

            <Pressable
              onPress={() =>
                setLocalValues({
                  category: null,
                  subCategory: null,
                  condition: null,
                })
              }
            >
              <Text className="text-sm font-bold text-brand-accent">
                إعادة تعيين
              </Text>
            </Pressable>
          </View>

           {/* Price Range */}
            <Text className="font-semibold text-brand-dark mb-3">
              السعر
            </Text>

            <View className="flex-row gap-3 mb-8">
              {/* Min */}
              <View className="flex-1">
                <Text className="text-xs text-brand-dark mb-1">
                  من
                </Text>
                <View className="bg-white rounded-xl px-4 h-12 justify-center border border-brand-dark/10 shadow-sm">
                  <TextInput
                    value={minPrice}
                    onChangeText={setMinPrice}
                    placeholder="0"
                    keyboardType="numeric"
                    className="text-sm"
                  />
                </View>
              </View>

              {/* Max */}
              <View className="flex-1">
                <Text className="text-xs text-brand-dark mb-1">
                  إلى
                </Text>
                <View className="bg-white rounded-xl px-4 h-12 justify-center border border-brand-dark/10 shadow-sm">
                  <TextInput
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    placeholder="1000"
                    keyboardType="numeric"
                    className="text-sm"
                  />
                </View>
              </View>
            </View>


            {/* Categories */}
            <Text className="font-semibold text-brand-dark mb-3">
              الفئة
            </Text>

            {loading ? (
              <ActivityIndicator className="my-4" />
            ) : (
              <View className="flex-row flex-wrap mb-6">
                {categories.map(cat => {
                  const active =
                    localValues.category === cat.name

                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => toggleCategory(cat.name)}
                      className={`px-4 py-2 m-1 rounded-full border ${active
                          ? 'bg-brand-primary border-brand-primary'
                          : 'border-brand-primary/30'
                        }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${active
                            ? 'text-white'
                            : 'text-brand-dark'
                          }`}
                      >
                        {cat.name}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            )}
            

            {/* Condition */}
            <Text className="font-semibold text-brand-dark mb-3">
              الحالة
            </Text>

            <View className="flex-row gap-3 mb-8">
              {[
                { key: 'new', label: 'جديد' },
                { key: 'used', label: 'مستعمل' },
              ].map(item => {
                const active =
                  localValues.condition === item.key

                return (
                  <Pressable
                    key={item.key}
                    onPress={() =>
                      toggleCondition(
                        item.key as 'new' | 'used'
                      )
                    }
                    className={`flex-1 py-3 rounded-full border ${active
                        ? 'bg-brand-secondary border-brand-secondary'
                        : 'border-brand-secondary/40'
                      }`}
                  >
                    <Text
                      className={`text-center font-bold ${active
                          ? 'text-white'
                          : 'text-brand-dark'
                        }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>

           
          {/* Actions */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 py-3 rounded-full border border-brand-dark/20"
            >
              <Text className="text-center font-semibold text-brand-dark">
                إلغاء
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onApply({
                  ...localValues,
                  priceRange:
                    minPrice || maxPrice
                      ? {
                        min: minPrice ? Number(minPrice) : null,
                        max: maxPrice ? Number(maxPrice) : null,
                      }
                      : null,
                })
                onClose()
              }}
              className="flex-1 py-3 rounded-full bg-brand-primary"
            >
              <Text className="text-white text-center font-extrabold">
                تطبيق
              </Text>
            </Pressable>
          </View>
          <View className='h-10' />
        </Pressable>
      </Pressable>
    </Modal>
  </ScrollView>
</KeyboardAvoidingView>

   
  )
}
