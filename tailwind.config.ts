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
        primary: "var(--text-color-primary)",
        second: "var(--text-color-second)",
        "c-border": "var(--color-border)",
        "c-grey": "var(--color-grey)",
        "c-grey-blur": "var(--grey-blur)",
      },
      height: {
        "height-input": "var(--height-input)",
      },
      padding: {
        "pd-main": "var(--padding-main)",
        "pd-detail": "var(--padding-detail)",
        "pd-spacing-cpn" : "var(--padding-y)"
      },
      keyframes: {
        shirk: {
          "50%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "shirk-grow": "shirk 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
