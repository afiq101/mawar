<script setup>
definePageMeta({
  title: "login-v1",
  layout: "empty",
});
</script>

<template>
  <div class="flex-none lg:flex justify-center h-screen">
    <div class="flex-auto w-full md:w-full lg:w-5/12 bg-[rgb(var(--bg-2))]">
      <div
        class="flex h-screen items-start md:items-center justify-start md:justify-center"
      >
        <div class="w-full md:w-8/12 lg:w-full px-10 md:px-16 py-12 md:py-20">
          <div class="text-center">
            <!-- <img class="w-10 mb-6" src="@/assets/img/logo/logo.svg" /> -->
          </div>
          <h3 class="mb-5">Login</h3>
          <p class="mb-5">Welcome to Rose UI. Please login to continue.</p>
          <div class="grid grid-cols-2">
            <FormKit label="Username" type="text" outer-class="col-span-2" />
            <FormKit
              label="Password"
              name="password"
              type="password"
              outer-class="col-span-2"
            />
            <FormKit
              type="checkbox"
              input-class="checked:bg-primary checked:border-transparent"
              label="Remember Me"
            />
            <NuxtLink
              class="flex items-center justify-end h-5 mt-1 text-primary hover:underline"
              to="/auth/forgot-password-v1"
              >Forgot Password?</NuxtLink
            >
            <NuxtLink to="/" class="col-span-2">
              <FormKit type="button" input-class="w-full"> Sign In </FormKit>
            </NuxtLink>
            <rs-button
              class="w-full col-span-2 !bg-[rgb(var(--bg-1))] !text-inherit shadow-md"
            >
              <img class="w-5 mr-2" src="@/assets/img/brand/google-logo.svg" />
              Sign In with Google
            </rs-button>
          </div>
          <p class="mt-3 text-center">
            Don't have an account?
            <NuxtLink
              to="/auth/register-v1"
              class="text-primary hover:underline"
              >Sign Up</NuxtLink
            >
          </p>
        </div>
      </div>
      <div class="absolute bottom-5 left-5 text-xs text-slate-400">
        © Rose UI 2022
      </div>
    </div>
    <div class="flex-auto w-full lg:w-7/12 m-auto hidden md:block">
      <div class="flex justify-center items-center">
        <img class="w-96" src="@/assets/img/illustration/login.svg" />
      </div>
    </div>
  </div>
</template>
