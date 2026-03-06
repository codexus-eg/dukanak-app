/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7CC7A4", // أخضر دكانك 
          secondary: "#6FB7D6", // أزرق سماوي 
          accent: "#F6A64D", // برتقالي 
          dark: "#1F2937",
          light: "#F8FAFC",
        },
      }
    },
  },
  plugins: [],
}