import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#EA580C",
          "orange-light": "#FB923C",
          "orange-dark": "#C2410C",
          blue: "#1E3A8A",
          "blue-light": "#3B82F6",
          "blue-dark": "#1E40AF",
        },
        dark: {
          DEFAULT: "#0F172A",
          100: "#1E293B",
          200: "#334155",
          300: "#475569",
          400: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "slide-in-right": "slideInRight 0.7s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        "orange-gradient":
          "linear-gradient(135deg, #EA580C 0%, #FB923C 100%)",
        "blue-gradient":
          "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, #EA580C22 0px, transparent 50%), radial-gradient(at 80% 0%, #1E3A8A33 0px, transparent 50%), radial-gradient(at 0% 50%, #EA580C11 0px, transparent 50%)",
      },
      boxShadow: {
        "orange-glow": "0 0 30px rgba(234, 88, 12, 0.3)",
        "blue-glow": "0 0 30px rgba(30, 58, 138, 0.4)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
