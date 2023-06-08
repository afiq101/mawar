import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color), <alpha-value>)",
        secondary: "rgb(var(--secondary-color), <alpha-value>)",
        success: "rgb(var(--success-color), <alpha-value>)",
        info: "rgb(var(--info-color), <alpha-value>)",
        warning: "rgb(var(--warning-color), <alpha-value>)",
        danger: "rgb(var(--danger-color), <alpha-value>)",
      },
    },
  },
};
