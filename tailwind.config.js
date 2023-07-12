/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        darkGray: "#30363D",
        secondaryBlack: "#161B22",
        primaryBlack: "#0D1117",
        offWhite: "#F4F4F4",
        transparent: "transparent",
        gray: "#8d8d8d",
        purple: "#8E4DFF",
        blue: "#0353e9",
        darkGray: "#21272E",
        darkGray1: "#21272E",
        darkGray2: "#30363D",
        graySecond: "#1C2128",
        blackOpacity: "rgba(0,0,0,0.8)",
        whiteOpacity: "rgba(255,255,255,0.6)",
        charcoal: "#414141",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        // minmax(900px, 1fr)
        // tablestruct: "30px 3fr 1fr 1fr 1fr 1fr",
        tablestruct: "4fr 2fr 1fr 1fr 1fr",

        // 9: "54px minmax(302px, 3fr) repeat(7 , minmax(100px , 1fr))",
        9: "54px minmax(280px, 2fr) 140px repeat(6 , minmax(85px , 1fr))",
        gstGrid: "47px 1fr",
        gstGridMonth: "repeat(12 ,1fr)",
      },
    },
  },
  plugins: [],
};
