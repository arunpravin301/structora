import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#D60000",
        paper: "#FFFFFF",
        mist: "#F5F5F6",
        line: "#E4E4E7",
        lined: "#27272A",
        slate: {
          DEFAULT: "#52525B",
          900: "#0F0F10",
          800: "#18181B"
        },
        slatel: "#A1A1AA",
        wa: "#25D366"
      },
      fontFamily: {
        outfit: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        inter: ["'Manrope'", "system-ui", "sans-serif"]
      },
      maxWidth: { wrap: "1240px" }
    }
  },
  plugins: []
};
export default config;
