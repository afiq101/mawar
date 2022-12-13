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
const fileCodeConstant = ref("");

const state = reactive({
  fullscreen: false,
  teleport: true,
});
const root = ref();

const hasError = ref(false);
const error = ref("");

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

// Call API to get the code
const { data } = await useFetch("/api/admin/content/code/file-code", {
  initialCache: false,
  method: "GET",
  query: {
    path: page.path,
  },
});

if (data.value.statusCode === 200) {
  fileCode.value = data.value.data;
  fileCodeConstant.value = data.value.data;
}

async function toggle() {
  await fullscreen.toggle(root.value.querySelector(".fullscreen-wrapper"), {
    teleport: state.teleport,
    callback: (isFullscreen) => {
      state.fullscreen = isFullscreen;
    },
  });
}

// const validateCompileVueCode = () => {
//   const codeEval = `
//     import { createApp } from 'vue'

//     createApp({
//       data() {
//         return {
//           count: 0
//         }
//       }
//     }).mount('#app')

//     <div id="app">
//       <button @click="count++">
//         Count is: {{ count }}
//       </button>
//     </div>
//   `;

//   try {
//     eval(codeEval);
//   } catch (e) {
//     hasError.value = true;
//     error.value = e.message;
//     console.log(e);
//   }
// };

const saveCode = async () => {
  const { data } = await useFetch("/api/admin/content/code/save", {
    initialCache: false,
    method: "POST",
    body: {
      path: page.path,
      code: fileCode.value,
    },
  });

  if (data.value.statusCode === 200) {
    $swal.fire({
      title: "Success",
      text: "The code has been saved successfully.",
      icon: "success",
      confirmButtonText: "Ok",
      timer: 1000,
    });

    setTimeout(() => {
      $router.go();
    }, 1000);
  }
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-alert v-if="hasError" class="mb-4" variant="primary">{{
      error
    }}</rs-alert>
    <rs-card>
      <div class="flex justify-end gap-2 p-4">
        <rs-button class="!p-2" @click="toggle">
          <Icon name="material-symbols:fullscreen-rounded" class="mr-1" />
          Immersive
        </rs-button>
        <!-- <rs-button class="!p-2" @click="toggle">
          <Icon name="material-symbols:view-column-2-outline" class="mr-1" />
          Playground
        </rs-button> -->
        <rs-button class="!p-2" @click="saveCode">
          <Icon name="material-symbols:save-outline-rounded" class="mr-1" />
          Save
        </rs-button>
      </div>
      <div ref="root">
        <div class="fullscreen-wrapper">
          <ClientOnly>
            <rs-code-mirror
              v-model="fileCode"
              :height="state.fullscreen ? '100vh' : '80vh'"
            >
            </rs-code-mirror>
          </ClientOnly>
          <!-- <ClientOnly>
            <MonacoEditor v-model="fileCode" lang="typescript" />
          </ClientOnly> -->
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
