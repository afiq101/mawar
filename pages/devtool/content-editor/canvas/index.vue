<script setup>
import grapesjs from "grapesjs";

import blockPlugin from "grapesjs-blocks-basic";
import tailwindPlugin from "grapesjs-tailwind";
import rsBasePlugin from "@@/assets/js/gjs-plugin";
import rsBlockPlugin from "@@/assets/js/gjs-plugin/block/rs-component";

definePageMeta({
  title: "Canvas Editor",
});

const { $swal, $router } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const fileCode = ref("");

let editor = null;

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
        await $router.push("/devtool/content-editor");
      }
    });
}

if (page?.path)
  page.path = page.path.replace(/:(\w+)/g, "[$1]").replace(/\(\)/g, "");

// Call API to get the code
const { data } = await useFetch("/api/devtool/content/canvas/file-code", {
  initialCache: false,
  method: "GET",
  query: {
    path: page.path,
  },
});

if (data.value.statusCode === 200) {
  fileCode.value = data.value.data;

  // If its index append the path
  if (data.value?.mode == "index") page.path = page.path + "/index";
} else {
  $swal.fire({
    title: "Error",
    text: "The page you are trying to edit is not found. Please choose a page to edit. You will be redirected to the content editor page.",
    icon: "error",
    confirmButtonText: "Ok",
    timer: 3000,
  });
  setTimeout(() => {
    $router.push("/devtool/content-editor");
  }, 3000);
}

onMounted(() => {
  const escapeName = (name) =>
    `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");

  editor = grapesjs.init({
    container: "#gjs",
    height: "100%",
    fromElement: true,
    storageManager: false,
    plugins: [rsBasePlugin, rsBlockPlugin, blockPlugin],
    pluginsOpts: {
      [rsBasePlugin]: {},
    },
    selectorManager: { escapeName },
    styleManager: {
      sectors: [],
    },
  });

  // editor.addComponents(fileCode.value);
});
</script>

<template>
  <div>
    <div class="h-[55rem]">
      <div id="gjs"></div>
    </div>
  </div>
</template>
