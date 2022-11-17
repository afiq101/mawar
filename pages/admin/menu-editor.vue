<script setup>
import Menu from "~/navigation/index.js";

definePageMeta({
  title: "Menu Editor",
  middleware: ["auth"],
  requiresAuth: true,
});

const nuxtApp = useNuxtApp();

const sideMenuList = ref(Menu);

const router = useRouter();
const getRoutes = router.getRoutes();
const getNavigation = Menu ? ref(Menu) : ref([]);

const allMenus = [];

const drag = ref(false);
const showCode = ref(false);
let i = 1;

const showModal = ref(false);

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

// Loop through the routes and add them to the menus
getRoutes.map((menu) => {
  allMenus.push({
    id: i++,
    title:
      menu.meta && menu.meta.title ? menu.meta.title : kebabtoTitle(menu.name),
    parentMenu: menu.path.split("/")[1],
    name: menu.name,
    path: menu.path,
  });
});

const clone = (obj) => {
  return JSON.parse(
    JSON.stringify({
      title: obj.title,
      path: obj.path,
      icon: obj.icon ? obj.icon : "",
      child: [],
    })
  );
};

const addNewHeader = () => {
  sideMenuList.value.push({
    header: "New Header",
    description: "New Description",
    child: [],
  });
};

// const onStart = (event) => {
//   console.log("onStart", event);
//   drag.value = true;
// };

// Modal functions
const clickOK = () => {
  showModal.value = false;
};

const clickCancel = () => {
  showModal.value = false;
};

// changeSideMenuList

const changeSideMenuList = (menus) => {
  sideMenuList.value = menus;
};

const overwriteJsonFileLocal = async (menus) => {
  const res = await useFetch("/api/admin/menu-editor", {
    method: "POST",
    initialCache: false,
    body: JSON.stringify({
      menuData: menus,
    }),
  });

  const data = res.data.value;
  console.log("data", data);

  if (data.statusCode === 200) {
    // refresh the page
    nuxtApp.$router.go();
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
            <div class="flex justify-end items-center mb-4">
              <rs-button
                class="mr-2"
                @click="showCode ? (showCode = false) : (showCode = true)"
                >Show Code</rs-button
              >
              <rs-button @click="overwriteJsonFileLocal(sideMenuList)"
                >Save Menu Config and Reload</rs-button
              >
            </div>

            <div class="grid grid-cols-2 gap-5">
              <draggable
                item-key="id"
                v-model="allMenus"
                :group="{ name: 'menu', pull: 'clone', put: false }"
                :clone="clone"
                animation="200"
                easing="cubic-bezier(1, 0, 0, 1)"
                :sort="false"
              >
                <template #item="{ element }">
                  <rs-card class="p-4 mb-4">
                    {{ kebabtoTitle(element.name) }} (
                    <NuxtLink
                      class="text-primary-400 hover:underline"
                      :to="element.path"
                      target="_blank"
                    >
                      {{ element.path }}
                    </NuxtLink>
                    )
                  </rs-card>
                </template>
              </draggable>
              <rs-card class="p-4 bg-gray-50" v-if="!showCode">
                <DraggableSideMenuNested
                  :menus="sideMenuList"
                  groupName="menu"
                  @changeSideMenu="changeSideMenuList"
                />
                <div class="flex justify-end items-center">
                  <rs-button class="!p-2 mt-3" @click="addNewHeader">
                    <Icon name="material-symbols:docs-add-on" size="16"></Icon>
                  </rs-button>
                </div>
              </rs-card>
              <pre v-else v-html="JSON.stringify(sideMenuList, null, 2)"></pre>
            </div>
          </rs-tab-item>
        </rs-tab>
      </div>
    </rs-card>
  </div>
</template>
