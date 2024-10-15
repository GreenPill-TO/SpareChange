import Typography from "@tailwindcss/typography";
import DaisyUI from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      margin: {
        "1/5": "20%",
        "2/5": "40%",
      },
      maxHeight: {
        "screen4/5": "80vh",
      },
      boxShadow: {
        top: "0 0px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [DaisyUI, Typography],
};
export default config;
