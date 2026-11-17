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
        // Paradise Cove: one accent
        coral: "#E8A0B4",
        // Club Paradise: one accent (awnings are rust and cream only)
        rust: "#C2603A",
        // Tiny details only. Never a large area, never next to rust.
        kelp: "#1F5E3B",
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
