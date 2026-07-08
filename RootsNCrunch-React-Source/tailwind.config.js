/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FBF2E1", 2: "#F3E4C7" },
        paper: "#FFFDF8",
        maroon: { DEFAULT: "#4A1509", 2: "#6B2211", tint: "#F6E3D8" },
        orange: { DEFAULT: "#E85D0C", 2: "#C24B08", tint: "#FCE3CE" },
        leaf: { DEFAULT: "#4B7A3E", 2: "#3C6431", tint: "#E4EEDD" },
        ink: { DEFAULT: "#2B211B", soft: "#6B5C51" },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "26px" },
      boxShadow: {
        card: "0 2px 10px rgba(74,21,9,0.07)",
        lift: "0 10px 30px rgba(74,21,9,0.12)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        fadeIn: { from: { opacity: 0, transform: "translateY(6px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        sway: { "0%,100%": { transform: "rotate(-4deg)" }, "50%": { transform: "rotate(4deg)" } },
        toastIn: { from: { opacity: 0, transform: "translateY(10px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        fadeIn: "fadeIn .35s ease both",
        sway: "sway 6s ease-in-out infinite",
        toastIn: "toastIn .25s ease both",
      },
    },
  },
  plugins: [],
};
