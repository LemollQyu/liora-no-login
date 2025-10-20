import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      grass: "#1B8A17",
      graysmooth: "#F7F4ED"
    },
   fontFamily: {
      figtree: ["Figtree", "sans-serif"],
      jomhuria: ["Jomhuria", "sans-serif"],
    },  
  },
},
  plugins: [],
} satisfies Config;

export default config;