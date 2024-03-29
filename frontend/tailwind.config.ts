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
        primary: "#f0f2f5",
        secondary: "#1877f2",
        "secondary-100": "#ebf5ff",
        neutral: "#42b72a",
        "primary-100": "#606770",
        "primary-content": "#050505",
        "secondary-content": "#65676B",
        "secondary-button": "#e3e6eb",
        hover: "#0000000d",
        "content-button-disabled": "#bcc0c4",
        divider: "#ced0d4",
        "card-flat": "#f7f8fa",
        "hover-overlay": "rgba(0,0,0,.05)",
      },
      fontSize: {
        s: "13px",
        m: "15px",
        l: "17px",
      },
      boxShadow: {
        lg: "0 0 16px 1px rgba(0,0,0,.3)",
        container: "0 0 3px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
export default config;
