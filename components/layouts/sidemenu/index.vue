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
  <div class="vertical-menu">
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
        </div>
      </nuxt-link>
    </div>
    <div
      :style="{
        maxHeight: 'calc(100vh - 150px)',
      }"
      class="scroll-menu overflow-y-hidden hover:overflow-y-scroll my-6 mr-1 duration-300"
      role="button"
      tabIndex="0"
    >
      <RSItem :items="menuItem" />
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (min-width: 768px) {
  .scroll-menu {
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  /* Show the scrollbar when the div is focused */
  .scroll-menu:hover,
  .scroll-menu:focus,
  .scroll-menu:active {
    scrollbar-color: #d0cdcd transparent !important;
  }

  /* Style for Webkit browsers (Chrome, Safari, etc.) */
  .scroll-menu::-webkit-scrollbar {
    width: 12px;
  }

  .scroll-menu::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  .scroll-menu:hover::-webkit-scrollbar-thumb,
  .scroll-menu:focus::-webkit-scrollbar-thumb,
  .scroll-menu:active::-webkit-scrollbar-thumb {
    background-color: #d0cdcd;
  }
}

.scroll-menu {
  overflow-y: auto;
}
</style>
