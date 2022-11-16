<script setup>
import Menu from "~/navigation/index.js";

definePageMeta({
  title: "Menu Editor",
  middleware: ["auth"],
  requiresAuth: true,
});

const router = useRouter();
const getRoutes = router.getRoutes();
const getNavigation = Menu ? ref(Menu) : ref([]);
const allMenus = [];
const drag = ref(false);

const kebabtoTitle = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Sort the routes into menus
getRoutes.sort((a, b) => {
  return a.path.localeCompare(b.path);
});

let i = 1;

// Loop through the routes and add them to the menus
getRoutes.map((menu) => {
  allMenus.push({
    id: i++,
    title: menu.meta.title,
    parentMenu: menu.path.split("/")[1],
    name: menu.name,
    path: menu.path,
  });
});

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

console.log("getNavigation", getNavigation.value);

const list = ref([
  {
    name: "task 1",
    tasks: [
      {
        name: "task 2",
        tasks: [],
      },
    ],
  },
  {
    name: "task 3",
    tasks: [
      {
        name: "task 4",
        tasks: [],
      },
    ],
  },
  {
    name: "task 5",
    tasks: [],
  },
]);
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
          This page is used to edit the menu of the website. You can add, edit,
          and delete menu items. You can also change the order of the menu items
          by dragging and dropping them.
        </p>
      </template>
    </rs-card>
    <!-- <rs-tab-item title="All Menu">
            <rs-table
              :data="allMenus"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              :options-advanced="{
                sortable: false,
                filterable: false,
                responsive: false,
              }"
              advanced
            >
              <template v-slot:name="data">
                <NuxtLink
                  class="text-primary-400 hover:underline"
                  :to="data.value.path"
                  target="_blank"
                  >{{ data.text }}</NuxtLink
                >
              </template>
            </rs-table>
          </rs-tab-item> -->
    <rs-card>
      <div class="pt-2">
        <rs-tab fill>
          <rs-tab-item title="Side Menu">
            <div class="grid grid-cols-2">
              <!-- <draggable
                v-model="allMenus"
                :clone="clone"
                group="menu"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
              >
                <template #item="{ element }">
                  <div>{{ element.name }}</div>
                </template>
              </draggable> -->

              <!-- <draggable
                v-model="getNavigation"
                group="menu"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
              >
                <template #item="{ element }">
                  <div>{{ element }}</div>
                </template>
              </draggable> -->
            </div>
          </rs-tab-item>
        </rs-tab>
        <ClientOnly>
          <DraggableNested :tasks="list" />
        </ClientOnly>
      </div>
    </rs-card>
  </div>
</template>
