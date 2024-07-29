import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lime: {
          500: '#a3e635',
          600: '#84d12e',
        },
        indigo: {
          500: '#4f46e5',
          600: '#3730a3',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
      },
      patterns: {
        opacities: {
          100: "1",
          80: ".80",
          60: ".60",
          40: ".40",
          20: ".20",
          10: ".10",
          5: ".05",
        },
        sizes: {
          1: "0.25rem",
          2: "0.5rem",
          4: "1rem",
          6: "1.5rem",
          8: "2rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          32: "8rem",
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-bg-patterns'),
  ],
};
export default config;