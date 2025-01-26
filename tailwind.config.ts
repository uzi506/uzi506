import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          dark: "#7E69AB",
          light: "#B7A8FF",
        },
        dark: {
          DEFAULT: "#1A1F2C",
          lighter: "#2A2F3C",
        },
      },
      animation: {
        "color-breath": "color-breath 2s infinite alternate ease-in-out",
      },
      keyframes: {
        "color-breath": {
          "0%": { color: "#2d0845" }, // بنفسجي غامق
          "50%": { color: "#1a0b26" }, // بنفسجي يميل للأسود
          "100%": { color: "#1a0b26" }, // أسود كامل
        },
      },
      backgroundImage: {
        "saas-gradient":
          "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

