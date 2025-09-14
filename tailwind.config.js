/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const theme = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  extend: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
  },
};
export const plugins = [];
