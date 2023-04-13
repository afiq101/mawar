// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Used in EC2 development for hmr. Please refer : https://github.com/nuxt/nuxt/issues/12003
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: "wss",
  //       clientPort: 443,
  //       path: "hmr/",
  //     },
  //   },
  // },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@formkit/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
  ],
  buildModules: ["@nuxtjs/pwa"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  head: {
    title: "MawarCMS",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "MawarCMS",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  pwa: {
    icon: false, // disables the icon module
    manifest: {
      name: "MawarCMS",
      lang: "en",
      useWebmanifestExtension: false,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/style/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  colorMode: {
    // preference: "light", // default value of $colorMode.preference
    // classSuffix: "",
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  css: ["~/assets/style/scss/main.scss"],
  formkit: {
    defaultConfig: true,
  },
});
