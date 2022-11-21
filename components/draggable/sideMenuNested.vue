<script setup>
import DraggableSideMenuNested from "~/components/draggable/sideMenuNested.vue";
const props = defineProps({
  menus: {
    required: true,
    type: Array,
  },
  count: {
    required: false,
    default: 0,
    type: Number,
  },
  parentMenu: {
    required: false,
    default: [],
    type: Array,
  },
});

const emits = defineEmits(["changeSideMenu"]);

const showModal = ref(false);
const type = ref(null);
const formMenu = ref({
  index: null,
  name: null,
  title: null,
  path: null,
  icon: null,
});

const formHeader = ref({
  index: null,
  header: null,
  description: null,
});

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Modal functions
const openModal = () => {
  showModal.value = true;
};

const clickOK = () => {
  showModal.value = false;
};

const clickCancel = () => {
  showModal.value = false;
};

// Update the menus
const updateMenus = (menus) => {
  emits("changeSideMenu", menus);
};

// Save the menu
const saveEditChanges = () => {
  let newMenu = props.menus;

  if (type.value == "menu") {
    // Overwrite the props menus
    newMenu = props.menus.map((menu) => {
      if (menu.path == formMenu.value.path) {
        menu.title = formMenu.value.title;
        menu.icon = formMenu.value.icon;
      }
      return menu;
    });

    // Overwrite the parent child menu
    let newParentMenu = props.parentMenu.map((menu) => {
      if (menu.path == formMenu.value.path) {
        menu.title = formMenu.value.title;
        menu.icon = formMenu.value.icon;
      }
      return menu;
    });

    newMenu = newParentMenu;
  } else if (type.value == "header") {
    // Overwrite the props menus
    newMenu = props.menus.map((header, index) => {
      if (index == formHeader.value.index) {
        header.header = formHeader.value.header;
        header.description = formHeader.value.description;
      }
      return header;
    });
  }

  // Update the menus
  updateMenus(newMenu);
  showModal.value = false;
};

const removeChild = (type, data) => {
  console.log(data);
  console.log(type);
  let newMenu = props.menus;
  if (type == "menu") {
    let parentMenu = props.parentMenu;

    // Overwrite the props menus
    newMenu = props.menus.filter((menu) => {
      return menu.path == data;
    });

    // Remove the newMenu from the parentMenu child
    parentMenu = parentMenu.filter((menu) => {
      // Level 1
      if (menu.child) {
        menu.child.forEach((el) => {
          // Level 2
          if (el.child) {
            el.child = el.child.filter((child) => {
              return child.path != data;
            });
          }

          if (el.path == data) {
            menu.child.splice(menu.child.indexOf(el), 1);
          }
        });
      }
      return menu;
    });

    newMenu = parentMenu;
  } else if (type == "header") {
    // Remove the object array from the props menus
    newMenu = props.menus.filter((header, index) => {
      return index != data;
    });
  }

  // Update the menus
  updateMenus(newMenu);
};
</script>

<template>
  <div>
    <draggable
      class="dragArea"
      tag="div"
      :list="menus"
      :group="{ name: 'menu', put: props.count == 0 ? false : true }"
      :clone="clone"
      item-key="id"
    >
      <template #item="{ element }">
        <rs-card
          class="p-4 my-4 mx-0 mb-0"
          :class="{
            'py-6': count > 0,
          }"
        >
          <div class="flex justify-between items-center">
            <div class="text-left font-normal text-xs mb-2">
              <span class="uppercase text-primary-500 dark:text-primary-400">{{
                element.header
              }}</span>
              <p class="text-gray-500 dark:text-secondary">
                {{ element.description }}
              </p>
            </div>
            <div v-if="count == 0">
              <Icon
                name="material-symbols:edit-outline-rounded"
                class="text-primary-400 hover:text-primary-500 cursor-pointer"
                size="20"
                @click="
                  type = 'header';
                  formHeader.index = menus.indexOf(element);
                  formHeader.header = element.header;
                  formHeader.description = element.description;
                  openModal();
                "
              ></Icon>
              <Icon
                name="material-symbols:close-rounded"
                class="text-primary-400 hover:text-primary-500 cursor-pointer"
                size="20"
                @click="removeChild('header', menus.indexOf(element))"
              ></Icon>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p class="flex items-center gap-2">
              <Icon v-if="element.icon" :name="element.icon" size="22"></Icon>
              {{ element.title }}
            </p>
            <div v-if="count > 0">
              <Icon
                name="material-symbols:edit-outline-rounded"
                class="text-primary-400 hover:text-primary-500 cursor-pointer"
                size="20"
                @click="
                  type = 'menu';
                  formMenu.title = element.title;
                  formMenu.path = element.path;
                  formMenu.icon = element.icon;
                  openModal();
                "
              ></Icon>
              <Icon
                name="material-symbols:close-rounded"
                class="text-primary-400 hover:text-primary-500 cursor-pointer"
                size="20"
                @click="removeChild('menu', element.path)"
              ></Icon>
            </div>
          </div>

          <DraggableSideMenuNested
            :menus="element?.child ? element.child : []"
            :count="count + 1"
            :parentMenu="
              props.parentMenu && props.parentMenu.length > 0
                ? props.parentMenu
                : props.menus
            "
            @changeSideMenu="updateMenus"
          />
        </rs-card>
      </template>
    </draggable>

    <rs-modal
      :title="type == 'header' ? 'Edit Header' : 'Edit Menu'"
      v-model="showModal"
      ok-title="Save"
      :ok-callback="saveEditChanges"
      :cancel-callback="clickCancel"
    >
      <div v-if="type == 'header'">
        <FormKit
          type="hidden"
          label="Index"
          v-model="formHeader.index"
        ></FormKit>
        <FormKit type="text" label="Name" v-model="formHeader.header"></FormKit>
        <FormKit
          type="text"
          label="Description"
          v-model="formHeader.description"
        ></FormKit>
      </div>
      <div v-else-if="type == 'menu'">
        <FormKit type="text" label="Title" v-model="formMenu.title"></FormKit>
        <FormKit
          type="text"
          label="Path"
          v-model="formMenu.path"
          readonly
        ></FormKit>
        <FormKit type="text" label="Icon" v-model="formMenu.icon"></FormKit>

        <p>
          Preview Icon (<a
            href="https://icones.js.org/"
            class="text-primary-400 hover:underline"
            target="_blank"
            >list</a
          >)
        </p>
        <Icon v-if="formMenu.icon" :name="formMenu.icon"></Icon>
      </div>
    </rs-modal>
  </div>
</template>
