import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#EA580C",
        paper: "#FAFAF9",
        mist: "#F5F5F4",
        line: "#E7E5E4",
        lined: "#21364F",
        slate: {
          DEFAULT: "#5E6B7E",
          900: "#0F172A",
          800: "#1E293B"
        },
        slatel: "#92A0B2",
        wa: "#25D366"
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      maxWidth: { wrap: "1240px" }
    }
  },
  plugins: []
};
export default config;
