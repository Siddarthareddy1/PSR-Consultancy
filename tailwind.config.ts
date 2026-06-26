import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F4788",
          dark: "#143260",
          light: "#3164b3",
        },
        secondary: {
          DEFAULT: "#D4AF37",
          dark: "#a68521",
          light: "#e2c563",
        },
        accent: {
          DEFAULT: "#00A86B",
          dark: "#007d50",
          light: "#26cc8f",
        },
        neutralDark: "#2C2C2C",
        neutralLight: "#F5F5F5",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
        heading: ["var(--font-inter)", "Inter", "sans-serif"],
        body: ["var(--font-opensans)", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
