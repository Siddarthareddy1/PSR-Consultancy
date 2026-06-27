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
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
          light: "#DBEAFE",
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
        franchise: "#EA580C",
        loan: "#16A34A",
        insurance: "#7C3AED",
        "real-estate": "#0891B2",
        advisory: "#D97706",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#0284C7",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        heading: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 12px rgba(0,0,0,0.1)",
        lg: "0 10px 24px rgba(0,0,0,0.15)",
        xl: "0 20px 48px rgba(0,0,0,0.2)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
