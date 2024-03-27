<script setup>
definePageMeta({
  title: "Database (ORM)",
  middleware: ["auth"],
  requiresAuth: true,
});

const searchText = ref("");
const tableList = ref([]);

const { data } = await useFetch("/api/devtool/orm/schema", {
  method: "GET",
  query: {
    type: "table",
  },
});

if (data.value.statusCode === 200) {
  tableList.value = data.value.data;
}
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
          This page is used to edit the ORM schema. You can add, edit, and
          delete the model and its fields. The changes will be saved to the
          database.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="p-4">
        <div class="flex justify-end items-center mb-4">
          <nuxt-link to="/devtool/orm/table/create">
            <rs-button>
              <Icon name="material-symbols:add" class="mr-1"></Icon>
              Add Table
            </rs-button>
          </nuxt-link>
        </div>

        <!-- Search Button -->
        <FormKit
          v-model="searchText"
          placeholder="Search Title..."
          type="search"
        />

        <div v-if="tableList" class="grid grid-cols-1 gap-5">
          <div v-for="tbl in tableList" class="p-5 border rounded-md">
            <div class="flex-1 flex flex-col gap-2">
              <div class="flex items-center text-primary gap-2">
                <Icon name="ph:table-fill" />
                <h4>
                  {{ tbl.name }}
                </h4>
              </div>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="field in tbl.fields"
                  class="text-xs py-1 px-3 inline-block bg-slate-100 rounded-lg ring-1 ring-slate-200"
                >
                  {{ field }}
                </span>
              </div>
            </div>

            <div class="flex justify-between mt-5">
              <NuxtLink
                :to="`/devtool/orm/${tbl.name}`"
                class="flex justify-center items-center"
              >
                <rs-button
                  variant="primary"
                  class="flex justify-center items-center"
                >
                  View Data
                </rs-button>
              </NuxtLink>

              <div v-if="!tbl.disabled" class="flex justify-between gap-3">
                <rs-button
                  variant="secondary"
                  class="flex justify-center items-center"
                >
                  <Icon name="ph:note-pencil-bold" class="w-4 h-4 mr-1" />
                  Edit
                </rs-button>
                <rs-button
                  variant="danger-outline"
                  class="flex justify-center items-center"
                >
                  <Icon name="ph:trash-simple-bold" class="w-4 h-4 mr-1" />
                  Delete
                </rs-button>
              </div>
              <div
                class="flex items-end text-xs py-1 px-3 text-slate-400 cursor-not-allowed"
                v-else
              >
                Cannot Modify System Table
              </div>
            </div>
          </div>
        </div>
      </div>
    </rs-card>
  </div>
</template>
