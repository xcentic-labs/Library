import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary : "#dad5be",
        secondary : "#eae6d7",
        greenleast : "#1c3f3a",
        orangeleast : "#fc7651",
        greenleastshade : "#32524D"
      },
      boxShadow : {
        reviwcard: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        featurecard : "rgba(0, 0, 0, 0.16) 0px 1px 4px"
      },
      fontFamily : {
        ubuntu : ["var(--font-ubuntu)"]
      }
    },
  },
  plugins: [],
} satisfies Config;
