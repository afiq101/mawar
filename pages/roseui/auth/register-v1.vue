<script setup>
definePageMeta({
  title: "register-v1",
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
          <h3 class="mb-5">Sign Up</h3>
          <p class="mb-5">Please fill in the form to create an account.</p>
          <div class="grid grid-cols-1">
            <FormKit label="Username" type="text" />
            <FormKit label="Email" type="email" />
            <FormKit label="Password" type="password" />
            <FormKit label="Re-enter Password" type="password" />
            <FormKit type="checkbox" label="agreement">
              <template #label
                >I agree to the
                <a class="text-secondary hover:underline ml-1"
                  >Term and Services</a
                >
              </template>
            </FormKit>

            <NuxtLink to="/">
              <FormKit type="button" input-class="w-full">Sign up</FormKit>
            </NuxtLink>
          </div>
          <p class="mt-3 text-center">
            Already have an account?
            <NuxtLink to="/auth/login-v1" class="text-primary hover:underline"
              >Login</NuxtLink
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
