/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["22px", "28px"],
      cs: ["24px", "32px"],
      xl: ["28px", "36px"],
      "1xl": ["36px", "44px"],
      "2xl": ["64px", "64px"],
    },
    extend: {
      colors: {
        primary: "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "1xl": "5px 5px 5px 0 rgba(0, 0, 0, 0.2)",
        "2xl": "0px 9px 20px 0px rgba(0, 0, 0, 0.10)",
        custom: "0px 0px 20px 2px #DC143C",
        customWhite: "0px 0px 10px 0px #fff",
      },
      backgroundImage: {
        hero: "url('assets/images/banner.png')",
      },
      screens: {
        wide: "1170px",
        md: "700px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
