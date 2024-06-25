<script setup>
definePageMeta({
  title: "Ai Chatbot",
  requiresAuth: true,
  middleware: ["auth"],
  layout: "empty",
});
</script>

<template>
  <div>
    <ChatbotAI />
  </div>
</template>
