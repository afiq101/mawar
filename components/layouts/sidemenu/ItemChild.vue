<script setup>
import { useThemeStore } from "~/stores/theme";
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";

const route = useRoute();
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  indent: {
    type: Number,
    default: 0.1,
  },
});
const emit = defineEmits(["openMenu"]);

const themeStore = useThemeStore();
const theme = themeStore.theme;

const indent = ref(props.indent);

const menuItem = props.items ? props.items : [];

// Toggle Open/Close menu
function openMenu(event) {
  emit("openMenu", event);
}

// Active menu
function activeMenu(routePath) {
  return route.path == routePath
    ? ` shadow-lg
            shadow-primary-700/30
            dark:shadow-primary-500/10
            text-white
            bg-primary-400
            active-menu`
    : `transition-all	duration-300 hover:ml-4`;
}

const indentStyle = computed(() => {
  if (theme == "dark")
    return { "background-color": `rgba(18, 24, 37, ${indent.value})` };
  else return { "background-color": `rgba(226, 232, 240, ${indent.value})` };
});
</script>

<template>
  <ul
    class="menu-content hide transition-all duration-300"
    :style="indentStyle"
  >
    <li
      v-for="(item, index) in menuItem"
      :key="index"
      @click.stop="
        item.child !== undefined || (item.child && item.child.length !== 0)
          ? openMenu($event)
          : ''
      "
    >
      <NuxtLink
        v-if="
          item.child === undefined || (item.child && item.child.length !== 0)
        "
        class="flex items-center px-4 py-3 mx-3 rounded-lg cursor-pointer"
        :to="item.path"
        :class="activeMenu(item.path)"
      >
        <span class="mx-4 font-normal">{{ item.title }}</span>
        <Icon
          v-if="item.child && item.child.length > 0"
          class="ml-auto side-menu-arrow"
          name="material-symbols:chevron-right-rounded"
          size="18"
        ></Icon>
      </NuxtLink>
      <a
        v-else
        class="flex items-center px-4 py-3 mx-3 rounded-lg cursor-pointer"
        :class="activeMenu(item.path)"
      >
        <span class="mx-3 font-normal">{{ item.title }}</span>
        <Icon
          v-if="item.child && item.child.length > 0"
          class="ml-auto side-menu-arrow"
          name="material-symbols:chevron-right-rounded"
          size="18"
        ></Icon>
      </a>
      <RSChildItem
        v-if="item.child"
        :items="item.child"
        :indent="indent + 0.1"
        @openMenu="openMenu"
        @activeMenu="activeMenu"
      ></RSChildItem>
    </li>
  </ul>
</template>
