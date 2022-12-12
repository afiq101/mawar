<script setup>
import { api as fullscreen } from "vue-fullscreen";

definePageMeta({
  title: "Code Editor",
});

const { $swal, $router } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const editor = ref();
const fileCode = ref("");

const state = reactive({
  fullscreen: false,
  teleport: true,
});

const root = ref();

const page = router.getRoutes().find((page) => {
  return page.name === route.query?.page;
});

if (!route.query.page || !page) {
  $swal
    .fire({
      title: "Error",
      text: "The page you are trying to edit is not found. Please choose a page to edit.",
      icon: "error",
      confirmButtonText: "Ok",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await $router.push("/admin/content-editor");
      }
    });
}

//   call api
const { data } = await useFetch("/api/admin/content/code/file-code", {
  initialCache: false,
  method: "GET",
  query: {
    path: page.path,
  },
});

fileCode.value = data.value.data;

async function toggle() {
  await fullscreen.toggle(root.value.querySelector(".fullscreen-wrapper"), {
    teleport: state.teleport,
    callback: (isFullscreen) => {
      state.fullscreen = isFullscreen;
    },
  });
}
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <div ref="root">
        <rs-button class="!p-2" @click="toggle">
          <Icon name="material-symbols:fullscreen-rounded" /> Immersive Mode
        </rs-button>

        <div class="fullscreen-wrapper">
          <rs-code-mirror
            v-model="fileCode"
            :height="state.fullscreen ? '100vh' : '80vh'"
          />
        </div>
      </div>
    </rs-card>
  </div>
</template>

<style lang="scss" scoped>
.fullscreen-wrapper {
  z-index: 10000;
}
</style>
