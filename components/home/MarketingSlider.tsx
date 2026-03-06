
import { View, Text, Image, ScrollView, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth-storage";

const { width } = Dimensions.get("window")

 function SliderSkeleton() {
  return (
    <View
      style={{ width: SLIDE_WIDTH }}
      className="h-44 mr-3 rounded-3xl overflow-hidden bg-gray-100"
    >
      {/* Image placeholder */}
      <View className="absolute inset-0 bg-gray-200" />

      {/* Content placeholder */}
      <View className="absolute inset-0 px-6 py-5 justify-between">
        {/* Title & Subtitle */}
        <View className="space-y-2">
          <View className="w-60 h-4 rounded-lg bg-gray-300" />
        </View>

        {/* Button */}
        <View className="self-center mb-2">
          <View className="w-32 h-10 rounded-2xl bg-gray-300" />
        </View>
      </View>
    </View>
  );
}

const SLIDE_WIDTH = width * 0.9
const SLIDE_SPACING = 10

const COLORS = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
}

export function MarketingSlider() {

  // const [slides, setSlides] = useState(MOCK_SLIDER_DATA);
  // const [loading, setLoading] = useState(true);



  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [fetchingMore, setFetchingMore] = useState(false)

  const scrollRef = useRef<ScrollView>(null)
const [currentIndex, setCurrentIndex] = useState(0)

const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  const index = Math.round(
    e.nativeEvent.contentOffset.x / (SLIDE_WIDTH + SLIDE_SPACING)
  )
  setCurrentIndex(index)
}

  /* ---------------- Fetch Function ---------------- */
  const fetchSliders = async (pageNumber = 1) => {
    if (!hasMore && pageNumber !== 1) return

    pageNumber === 1 ? setLoading(true) : setFetchingMore(true)

    try {
      const token = await getToken()

      const res = await axios.get(
        "https://docank.mahmoudalbatran.com/api/sliders",
        {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageNumber,
            per_page: 8,
          },
        }
      )
      console.log(res?.data?.sliders?.data[1], 'ttttttttttttttttttttt')

      const pagination = res.data.sliders
      const newSlides = pagination.data || []

      setSlides(prev =>
        pageNumber === 1 ? newSlides : [...prev, ...newSlides]
      )

      setHasMore(pagination.next_page_url !== null)
      setPage(pageNumber)
    } catch (err) {
      console.log("Slider API error:", err)
    } finally {
      setLoading(false)
      setFetchingMore(false)
    }
  }



  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    fetchSliders(1)
  }, [])

  useEffect(() => {
  if (slides.length === 0) return

  const interval = setInterval(() => {
    const nextIndex =
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1

    scrollRef.current?.scrollTo({
      x: nextIndex * (SLIDE_WIDTH + SLIDE_SPACING + SLIDE_SPACING), // + extra spacing for the gap
      animated: true,
    })

    setCurrentIndex(nextIndex)
  }, 3500) // ⏱ كل 3.5 ثواني

  return () => clearInterval(interval)
}, [currentIndex, slides.length])

  /* ---------------- Pagination on Scroll ---------------- */
  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent

      const isNearEnd =
        contentOffset.x + layoutMeasurement.width >=
        contentSize.width - 80

      if (isNearEnd && hasMore && !fetchingMore) {
        fetchSliders(page + 1)
      }
    },
    [page, hasMore, fetchingMore]
  )


  return (
    <ScrollView
    className="pt-3"
      horizontal
      ref={scrollRef}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      onScroll={handleScrollEnd}
      onMomentumScrollEnd={onMomentumScrollEnd}
      scrollEventThrottle={16}
      snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
      contentContainerStyle={{
        paddingHorizontal: (width - SLIDE_WIDTH) / 2,
      }}
    >
      {
        loading ? <SliderSkeleton /> : (
          slides.map((slide, index) => (
            <View
              key={index}
              style={{
                width: SLIDE_WIDTH,
                marginRight: SLIDE_SPACING,
              }}
              className="h-44 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <Image
                source={{ uri: `${slide.image}` }}
                className="w-full h-full"
                resizeMode="cover"
              />

            </View>
          ))
        )

      }
    </ScrollView>
  )
}
