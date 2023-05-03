<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

// const menuItem = Menu;

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
});

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div
    class="vertical-menu bg-white dark:bg-slate-800 text-base h-screen fixed w-64 top-0 z-50 duration-300 border-l-0 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <div class="py-2 px-4">
      <nuxt-link to="/">
        <div class="flex flex-auto gap-3 justify-center items-center h-[48px]">
          <img
            class="h-24 block dark:hidden"
            src="@/assets/img/logo/logo-full-transparent.webp"
            alt=""
          />
          <img
            class="h-24 hidden dark:block"
            src="@/assets/img/logo/logo-full-transparent-white.webp"
            alt=""
          />
          <!-- <span class="text-xl font-semibold text-primary dark:text-white"
          >Mawar</span
        > -->
        </div>
      </nuxt-link>
    </div>
    <div class="flex flex-col justify-between my-6 max-h-[85vh]">
      <perfect-scrollbar style="max-height: 100vh">
        <RSItem :items="menuItem"></RSItem>
      </perfect-scrollbar>
    </div>
    <!-- <div class="m-6 text-sm">
      To see documentation visit
      <a
        class="text-primary hover:underline"
        href="https://mawar-cms-docs.vercel.app/"
        target="_blank"
        >mawar-cms-docs.vercel.app
      </a>
      To see ui components visit
      <a
        class="text-primary hover:underline"
        href="https://roseui-nuxt.vercel.app/"
        target="_blank"
      >
        roseui-nuxt.vercel.app
      </a>
    </div> -->
  </div>
</template>
