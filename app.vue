<script setup>
useHead({
  title: "Mawar | Innovative solutions for captivating content",
  description: "Home page",
  htmlAttrs: {
    lang: "en",
  },
});

const nuxtApp = useNuxtApp();
const loading = ref(true);

onMounted(() => {
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Get theme from localStorage
  let theme = localStorage.getItem("theme") || "default";
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <div>
    <Loading v-if="loading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
