<script setup>
definePageMeta({
  title: "login-v2",
  layout: "empty",
});
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <h3 class="mb-4">Login</h3>
        <p class="mb-6">Welcome to Rose UI. Please login to continue.</p>
        <div class="grid grid-cols-2">
          <FormKit
            type="text"
            label="Username"
            outer-class="col-span-2"
            label-class="text-left"
          />
          <FormKit
            type="password"
            label="Password"
            outer-class="col-span-2"
            label-class="text-left"
          />
          <FormKit type="checkbox" label="Remember Me" />
          <NuxtLink
            class="flex items-center justify-end h-5 mt-1 text-primary hover:underline"
            to="/auth/forgot-password-v2"
            >Forgot Password?</NuxtLink
          >
          <NuxtLink to="/" class="col-span-2">
            <FormKit type="button" input-class="w-full"> Sign In </FormKit>
          </NuxtLink>
          <rs-button
            class="w-full col-span-2 !bg-white !text-inherit shadow-md"
          >
            <img class="w-5 mr-2" src="@/assets/img/brand/google-logo.svg" />
            Sign In with Google
          </rs-button>
        </div>
        <p class="mt-3 text-center">
          Don't have an account?
          <NuxtLink to="/auth/register-v2" class="text-primary hover:underline"
            >Sign Up</NuxtLink
          >
        </p>
      </rs-card>
    </div>
  </div>
</template>
