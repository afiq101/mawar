<script setup>
definePageMeta({
  title: "404",
  layout: "empty",
});
</script>

<template>
  <div class="flex h-screen p-6 md:p-10">
    <div class="m-auto">
      <div class="flex items-center flex-col md:flex-row gap-10">
        <img
          class="w-80 flex-shrink"
          src="@/assets/img/illustration/404-2.svg"
          alt=""
        />
        <div class="flex-1 text-center md:text-left items-center">
          <span class="block mb-2 font-bold text-2xl md:text-3xl">Oops!</span>
          <p class="text-lg md:text-xl font-base">
            The page you are looking for does not exist.
          </p>
          <NuxtLink to="/">
            <button
              class="inline-block align-middle md:align-baseline w-full md:w-fit mt-7 md:mt-4 px-4 py-3 rounded-lg shadow-lg shadow-primary/30 text-white bg-primary hover:bg-primary/90"
            >
              Back to Home
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
