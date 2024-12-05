import type { Config } from "tailwindcss";

console.log(
  "process.env.NODE_ENV",
  process.env.NODE_ENV,
  process.env.NODE_ENV === "production"
);

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myFont: ["Nunito", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mint-bg":
          "url('//jump-static.pages.dev/image/asset/mint-top-bg.jpg'), url('//jump-static.pages.dev/image/asset/mint-bottom-bg.jpg')",
      },
      animation: {
        shake: "shake 1.5s infinite",
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
