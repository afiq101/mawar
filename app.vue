<script setup>
import { useThemeStore } from "~/stores/theme";

useHead({
  title: "Mawar | Innovative solutions for captivating content",
  description: "Home page",
  bodyAttrs: {
    class: "bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300",
  },
});

const themeStore = useThemeStore();
const loading = ref(true);

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const setThemeGlobal = () => {
  document.documentElement.style.setProperty(
    "--color-primary",
    hexToRgb(themeStore.primaryColor)
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    hexToRgb(themeStore.secondaryColor)
  );
  document.documentElement.style.setProperty(
    "--color-info",
    hexToRgb(themeStore.infoColor)
  );
  document.documentElement.style.setProperty(
    "--color-success",
    hexToRgb(themeStore.successColor)
  );
  document.documentElement.style.setProperty(
    "--color-warning",
    hexToRgb(themeStore.warningColor)
  );
  document.documentElement.style.setProperty(
    "--color-danger",
    hexToRgb(themeStore.dangerColor)
  );
};

onMounted(() => {
  setThemeGlobal();
  setTimeout(() => {
    loading.value = false;
  }, 300);
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <Loading v-if="loading" />
    <NuxtPage :key="$route.fullPath" v-else />
  </NuxtLayout>
</template>
