import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        action: "var(--color-primary)",
        ink: "var(--color-ink)",
        parchment: "var(--color-canvas-parchment)"
      },
      fontFamily: {
        display: ["SF Pro Display", "system-ui", "-apple-system", "sans-serif"],
        text: ["SF Pro Text", "system-ui", "-apple-system", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
