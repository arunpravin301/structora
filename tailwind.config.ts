import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#A95C37",
        paper: "#F8F7F5",
        mist: "#F1EFEC",
        line: "#E6E4DD",
        lined: "#2B2D31",
        slate: {
          DEFAULT: "#73757A",
          900: "#151618",
          800: "#222428"
        },
        slatel: "#A8A9AB",
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
