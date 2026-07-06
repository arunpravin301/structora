import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1626",
        ink2: "#0E1F35",
        navy: "#1B3E6F",
        navy2: "#16335C",
        paper: "#FFFFFF",
        mist: "#F4F6F9",
        line: "#E4E8EF",
        lined: "#21364F",
        slate: "#5E6B7E",
        slatel: "#92A0B2",
        red: "#C0392B",
        wa: "#25D366"
      },
      fontFamily: {
        fr: ["var(--font-fr)", "Georgia", "serif"],
        gs: ["var(--font-gs)", "system-ui", "sans-serif"]
      },
      maxWidth: { wrap: "1240px" }
    }
  },
  plugins: []
};
export default config;
