<script setup>
definePageMeta({
  title: "forgot-password-v2",
  layout: "empty",
});
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <h3 class="mb-4">Forgot Password</h3>
        <p class="mb-6">
          Please input the correct email to reset the password.
        </p>
        <div class="grid grid-cols-1">
          <FormKit label="Email" type="email" outer-class="text-left" />
          <NuxtLink to="/auth/reset-password-v2">
            <FormKit type="button" input-class="w-full">Validate Email</FormKit>
          </NuxtLink>
        </div>
        <p class="mt-3 text-center">
          Already have an account?
          <NuxtLink to="/auth/login-v2" class="text-primary hover:underline"
            >Login</NuxtLink
          >
        </p>
      </rs-card>
    </div>
  </div>
</template>
