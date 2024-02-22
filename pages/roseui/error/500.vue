<script setup>
definePageMeta({
  title: "500",
  layout: "empty",
});
</script>

<template>
  <div class="flex h-screen p-6 md:p-10">
    <div class="m-auto">
      <div class="flex items-center flex-col md:flex-row gap-10">
        <img
          class="w-80 flex-shrink"
          src="@/assets/img/illustration/500.svg"
          alt=""
        />
        <div class="flex-1 text-center md:text-left items-center">
          <span class="block mb-2 font-bold text-2xl md:text-3xl"
            >Oops, something went wrong.
          </span>
          <p class="text-lg md:text-xl font-base">
            Please try again later or contact us if the problem persists.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
