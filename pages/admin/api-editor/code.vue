<script setup>
definePageMeta({
  title: "Code Editor",
});

const { $swal, $router } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const fileCode = ref("");
const fileCodeConstant = ref("");

const hasError = ref(false);
const error = ref("");

const state = reactive({
  fullscreen: false,
  teleport: true,
});
const root = ref();

// Call API to get the code
const { data } = await useFetch("/api/admin/api/file-code", {
  initialCache: false,
  method: "GET",
  query: {
    path: route.query?.path,
  },
});

if (data.value.statusCode === 200) {
  fileCode.value = data.value.data;
  fileCodeConstant.value = data.value.data;
} else {
  $swal
    .fire({
      title: "Error",
      text: "The API you are trying to edit is not found. Please choose a API to edit.",
      icon: "error",
      confirmButtonText: "Ok",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await $router.push("/admin/api-editor");
      }
    });
}
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-alert v-if="hasError" class="mb-4" variant="primary">{{
      error
    }}</rs-alert>
    <rs-card>
      <rs-tab fill>
        <rs-tab-item title="Editor">
          <div ref="root">
            <div class="fullscreen-wrapper">
              <ClientOnly>
                <rs-code-mirror
                  v-model="fileCode"
                  mode="text/javascript"
                  :height="state.fullscreen ? '100vh' : '80vh'"
                >
                </rs-code-mirror>
              </ClientOnly>
              <!-- <ClientOnly>
            <MonacoEditor v-model="fileCode" lang="typescript" />
          </ClientOnly> -->
            </div>
          </div>
        </rs-tab-item>
        <rs-tab-item title="Test"> </rs-tab-item>
      </rs-tab>
    </rs-card>
  </div>
</template>

<style lang="scss" scoped></style>
