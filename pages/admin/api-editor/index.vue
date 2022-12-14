<script setup>
definePageMeta({
  title: "Api Editor",
});

const searchText = ref("");

// Get api list from api folder
const getApiList = async () => {
  const { data } = await useFetch("/api/admin/api/list", {
    initialCache: false,
  });
  return data;
};

const apiList = await getApiList();

const searchApi = () => {
  return apiList.value.data.filter((api) => {
    return api.name.toLowerCase().includes(searchText.value.toLowerCase());
  });
};

const kebabCasetoTitleCase = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const redirectToApiCode = (api) => {
  window.location.href = `/admin/api-editor/code?path=${api}`;
};
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This page is used to edit the api for the server side. You can edit
          the api by choosing the api to edit from the card list below.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="p-4">
        <!-- Search Button -->
        <FormKit
          v-model="searchText"
          placeholder="Search Title..."
          type="search"
          class="mb-4"
        />

        <rs-card v-for="api in searchApi()">
          <div class="relative p-4 border-l-8 border-primary-400 rounded">
            <div class="flex justify-between items-center">
              <div class="block">
                <span class="font-semibold text-lg">{{
                  kebabCasetoTitleCase(api.name)
                }}</span>
                <br />
                <span class="text-gray-400"> {{ api.url }}</span>
              </div>
              <div class="flex gap-4">
                <rs-button>
                  <Icon
                    name="material-symbols:edit-outline-rounded"
                    class="mr-2"
                  />
                  Edit
                </rs-button>
                <rs-button
                  variant="primary-outline"
                  @click="redirectToApiCode(api.url)"
                >
                  <Icon
                    name="material-symbols:code-blocks-outline-rounded"
                    class="mr-2"
                  />
                  Code Editor
                </rs-button>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </rs-card>
  </div>
</template>
