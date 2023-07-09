<script setup>
definePageMeta({
  title: "Form List",
  middleware: ["auth"],
  requiresAuth: true,
});

const { $swal, $router } = useNuxtApp();
const router = useRouter();

const searchText = ref("");

const formList = formBuilderList();

const searchForm = () => {
  // Search for array formList.value
  return formList.filter((form) => {
    return form.name.toLowerCase().includes(searchText.value.toLowerCase());
  });
};

const generatedRandomUUID = () => {
  const chars = "0123456789abcdef";
  let uuid = "";

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uuid += chars[randomIndex];
    if (i === 7 || i === 11 || i === 15) {
      uuid += "-";
    }
  }

  return uuid;
};

const addForm = async () => {
  const id = generatedRandomUUID();
  const name = `Untitled Form`;
  const form = {
    id,
    name,
    bannerImg: "/img/background/bg2.jpg",
  };

  const { data: addForm } = await useFetch("/api/devtool/form-builder/add", {
    method: "POST",
    body: {
      form,
    },
  });

  if (addForm.value.statusCode == 200) {
    $router.push(`/devtool/form-builder/edit/${id}`);
  }
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
          This page is used to edit the form of a page. You can edit the form of
          the page by choosing the page to edit from the card list below.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="p-4">
        <div class="flex justify-end items-center mb-4">
          <rs-button @click="addForm">
            <Icon name="material-symbols:add" class="mr-1"></Icon>
            Add Form
          </rs-button>
        </div>
        <!-- Search Button -->
        <FormKit
          v-model="searchText"
          placeholder="Search Title..."
          type="search"
        />

        <div
          class="page-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          v-auto-animate
        >
          <div
            v-for="form in searchForm()"
            class="page shadow-md shadow-black/5 p-5 ring-1 ring-slate-700/10 rounded-lg"
          >
            <nuxt-link :to="`/devtool/form-builder/edit/${form.id}`">
              <div class="pb-4">
                <h4 class="font-semibold">
                  {{ form.id }}
                </h4>
                <p>
                  {{ form.name }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </rs-card>
  </div>
</template>
