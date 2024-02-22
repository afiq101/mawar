<script setup>
definePageMeta({
  title: "Forbidden",
  description: "Forbidden page",
  keywords: "forbidden, page",
  middleware: () => {
    return ["auth"];
  },
});
</script>

<template>
  <div></div>
</template>
