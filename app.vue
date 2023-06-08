<script setup>
import RSTheme from "@@/theme";

const defaultTheme = RSTheme.defaultTheme;

useHead({
  title: "Mawar | Innovative solutions for captivating content",
  description: "Home page",
  htmlAttrs: {
    "data-theme": defaultTheme,
  },
  bodyAttrs: {
    class: "bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300",
  },
});

const nuxtApp = useNuxtApp();
const loading = ref(true);

const getRootColor = (type) => {
  return localStorage.getItem(type + "color");
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const setThemeGlobal = () => {
  if (localStorage.getItem("primary-color")) {
    if (localStorage.getItem("primary-color")) {
      document.documentElement.style.setProperty(
        "--primary-color",
        getRootColor("primary")
      );
    }

    if (localStorage.getItem("secondary-color")) {
      document.documentElement.style.setProperty(
        "--secondary-color",
        getRootColor("secondary")
      );
    }

    if (localStorage.getItem("info-color")) {
      document.documentElement.style.setProperty(
        "--info-color",
        getRootColor("info")
      );
    }

    if (localStorage.getItem("success-color")) {
      document.documentElement.style.setProperty(
        "--success-color",
        getRootColor("success")
      );
    }

    if (localStorage.getItem("warning-color")) {
      document.documentElement.style.setProperty(
        "--warning-color",
        getRootColor("warning")
      );
    }

    if (localStorage.getItem("danger-color")) {
      document.documentElement.style.setProperty(
        "--danger-color",
        getRootColor("danger")
      );
    }
  } else {
    document.documentElement.style.setProperty(
      "--primary-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.primary)
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.secondary)
    );
    document.documentElement.style.setProperty(
      "--info-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.info)
    );
    document.documentElement.style.setProperty(
      "--success-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.success)
    );
    document.documentElement.style.setProperty(
      "--warning-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.warning)
    );
    document.documentElement.style.setProperty(
      "--danger-color",
      hexToRgb(RSTheme.themes[defaultTheme].colors.danger)
    );
  }
};

onMounted(() => {
  setThemeGlobal();

  // Hide loading indicator if not hydrating
  if (!nuxtApp.isHydrating) {
    loading.value = false;
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <Loading v-if="loading" />
    <NuxtPage :key="$route.fullPath" v-else />
  </NuxtLayout>
</template>
