<script setup>
definePageMeta({
  title: "Chatbot",
  description: "Chatbot page",
  layout: "emtpy",
  requiresAuth: true,
});

const { $swal } = useNuxtApp();

onMounted(() => {});
</script>

<template>
  <div>
    <div
      class="fixed py-10 w-full z-10"
      style="
        background: rgb(124, 233, 255);
        background: linear-gradient(
          0deg,
          rgba(124, 233, 255, 0) 0%,
          rgba(0, 0, 0, 0.6657256652661064) 100%
        );
      "
    ></div>
    <div
      class="h-[100dvh] flex items-center w-full bg-[#2b2a28] text-white tracking-tight"
    >
      <div class="h-full flex-1 flex flex-col items-center">
        <div class="gap-3 py-20 text-center leading-15">
          <p class="welcome-text text-[60px] drop-shadow-md">
            Welcome to

            <span>Open<span class="text-[#c9dbbb]">AjaiB </span> </span>
          </p>
          <span class="my-auto text-[16px] leading-6">
            <p>Need help or just getting started?</p>

            <i class="text-[14px]"
              >Type your question in the textbox—I'm here to assist!</i
            >
          </span>
        </div>

        <div class="flex flex-wrap gap-3">
          <div
            class="p-5 py-10 rounded-md border-[2px] border-[#c9dbbb] cursor-pointer hover:bg-[#c9dbbb] hover:text-black max-w-[200px]"
            @click="navigateTo(`/ai/chatbot/new`)"
          >
            Create new project
          </div>
          <div
            class="p-5 py-10 rounded-md border-[2px] border-[#c9dbbb] cursor-pointer hover:bg-[#c9dbbb] hover:text-black max-w-[200px]"
          >
            Open existing project
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");

body {
  font-family: "PP Neue Montreal", sans-serif !important;
}

.welcome-text {
  font-size: "70";
  font-family: "PP Editorial New";
}
</style>
