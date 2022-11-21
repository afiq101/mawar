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

const showCode = ref(false);
let i = 1;

const searchInput = ref("");

const showModal = ref(false);
const showModalEl = ref(null);
const dropdownMenu = ref([]);
const dropdownMenuValue = ref(null);

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

const checkExistSideMenuList = (path) => {
  let exist = false;
  sideMenuList.value.map((menu) => {
    // Search child path
    if (menu.child) {
      menu.child.map((child) => {
        if (child.path == path) {
          exist = true;
        }
      });
    }
  });
  return exist;
};

const menuList = computed(() => {
  // If the search input is empty, return all menus
  if (searchInput.value === "") {
    return allMenus;
  } else {
    // If the search input is not empty, filter the menus
    return allMenus.filter((menu) => {
      return menu.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });
  }
});

// Clone draggable item
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

// Add Header
const addNewHeader = () => {
  sideMenuList.value.push({
    header: "New Header",
    description: "New Description",
    child: [],
  });
};

// changeSideMenuList
const changeSideMenuList = (menus) => {
  sideMenuList.value = menus;
};

// Save the menu
const overwriteJsonFileLocal = async (menus) => {
  const res = await useFetch("/api/admin/menu-editor", {
    method: "POST",
    initialCache: false,
    body: JSON.stringify({
      menuData: menus,
    }),
  });

  const data = res.data.value;

  if (data.statusCode === 200) {
    // refresh the page
    nuxtApp.$router.go();
  }
};

const openModal = (menu) => {
  showModalEl.value = menu;

  // Get All Menu includes child and assign to dropdownMenu in one array
  let i = 0;
  dropdownMenu.value = [
    {
      label: "Choose Menu",
      value: null,
      attrs: {
        disabled: true,
      },
    },
  ];

  sideMenuList.value.map((menu) => {
    if (menu.header || menu.description) {
      dropdownMenu.value.push({
        label: `${menu.header} (Header)`,
        value: `header|${i}`,
      });
    } else if (menu.hasOwnProperty("header")) {
      dropdownMenu.value.push({
        label: `<No Header Name> (Header)`,
        value: `header|${i}`,
      });
    }

    if (menu.child) {
      menu.child.map((child) => {
        dropdownMenu.value.push({
          label: `${child.title} (Menu)`,
          value: `menu|${child.path}`,
        });
      });
    }

    i++;
  });

  showModal.value = true;
};

const addMenuFromList = () => {
  if (dropdownMenuValue.value) {
    const menuType = dropdownMenuValue.value.split("|")[0];
    const menuValue = dropdownMenuValue.value.split("|")[1];

    if (menuType === "header") {
      // Add Header
      sideMenuList.value[menuValue].child.push(clone(showModalEl.value));
    } else if (menuType === "menu") {
      // Add Menu
      sideMenuList.value.map((menu) => {
        if (menu.child) {
          menu.child.map((child) => {
            if (child.path == menuValue) {
              child.child.push(clone(showModalEl.value));
            }
          });
        }
      });
    }

    showModal.value = false;
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

    <rs-card>
      <div class="pt-2">
        <rs-tab fill>
          <rs-tab-item title="All Menu">
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
          </rs-tab-item>
          <rs-tab-item title="Manage Side Menu">
            <div class="flex justify-end items-center mb-4">
              <rs-button
                class="mr-2"
                @click="showCode ? (showCode = false) : (showCode = true)"
              >
                <Icon name="ic:baseline-code" class="mr-2"></Icon>

                Show JSON</rs-button
              >
              <rs-button @click="overwriteJsonFileLocal(sideMenuList)">
                <Icon name="mdi:content-save-outline" class="mr-2"></Icon>
                Save Menu Config File
              </rs-button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormKit
                  type="search"
                  placeholder="Search Menu..."
                  outer-class="mb-5"
                  v-model="searchInput"
                />
                <SimpleBar style="height: 625px">
                  <draggable
                    item-key="id"
                    v-model="menuList"
                    :group="{ name: 'menu', pull: 'clone', put: false }"
                    :clone="clone"
                    :sort="false"
                  >
                    <template #item="{ element }">
                      <rs-card class="p-4 mb-4">
                        <div class="flex justify-between items-center">
                          <p>
                            {{ kebabtoTitle(element.name) }} (
                            <NuxtLink
                              class="text-primary-400 hover:underline"
                              :to="element.path"
                              target="_blank"
                            >
                              {{ element.path }}
                            </NuxtLink>
                            )
                          </p>
                          <Icon
                            v-if="checkExistSideMenuList(element.path) == false"
                            name="ic:baseline-arrow-circle-right"
                            class="text-primary-400 cursor-pointer transition-all duration-150 hover:scale-110"
                            @click="openModal(element)"
                          ></Icon>
                        </div>
                      </rs-card>
                    </template>
                  </draggable>
                </SimpleBar>
              </div>
              <rs-card class="p-4 bg-gray-50" v-if="!showCode">
                <DraggableSideMenuNested
                  :menus="sideMenuList"
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

    <rs-modal
      title="Add New Menu"
      v-model="showModal"
      ok-title="Confirm"
      :ok-callback="addMenuFromList"
    >
      <FormKit
        label="Please Select Menu or Header"
        help="Select menu or header to add as their child menu"
        type="select"
        v-model="dropdownMenuValue"
        :options="dropdownMenu"
      ></FormKit>
    </rs-modal>
  </div>
</template>
