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
        <p class="text-slate-500 mb-6">
          Welcome to Mawar CMS. Please login to continue.
        </p>
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
            class="flex items-center justify-end h-5 mt-1 text-primary-400 hover:underline"
            to="/auth/forgot-password-v2"
            >Forgot Password?</NuxtLink
          >
          <NuxtLink to="/" class="col-span-2">
            <FormKit type="button" input-class="w-full"> Sign In </FormKit>
          </NuxtLink>
          <FormKit
            type="button"
            outer-class="col-span-2"
            input-class="w-full btn-white"
          >
            <div class="flex items-center justify-center gap-3">
              <img class="w-5" src="@/assets/img/brand/google-logo.svg" />
              Sign In with Google
            </div>
          </FormKit>
        </div>
        <p class="mt-3 text-center text-slate-500">
          Don't have an account?
          <NuxtLink
            to="/auth/register-v2"
            class="text-primary-400 hover:underline"
            >Sign Up</NuxtLink
          >
        </p>
      </rs-card>
    </div>
  </div>
</template>
