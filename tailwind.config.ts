import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Shared
        navy: "#1C2B4A",
        cream: "#F4F0E4",
        paper: "#FBFAF6",
        // Paradise Cove accents
        coral: "#E8A0B4",
        rose: "#B8606E",
        // Club Paradise inks
        terracotta: "#A83434",
        forest: "#2C5C3E",
        gold: "#D49E30",
        peach: "#E8A47C",
        sand: "#D9CDB4",
      },
      fontFamily: {
        cove: ["var(--font-grandstander)", "Arial Rounded MT Bold", "sans-serif"],
        label: ["var(--font-montserrat)", "Arial", "sans-serif"],
        club: ["var(--font-archivo)", "Arial Black", "sans-serif"],
        caslon: ["var(--font-caslon)", "Georgia", "serif"],
      },
      maxWidth: { site: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
