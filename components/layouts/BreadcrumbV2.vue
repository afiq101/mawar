<script setup>
const route = useRoute();

// const breadcrumb = computed(() => {
//   const matched = route.matched;
//   const breadcrumb = matched.map((item) => {
//     return {
//       name: item.meta.title,
//       path: item.path,
//     };
//   });

//   return breadcrumb;
// });

// Get breadcrumb from page meta
const breadcrumb = computed(() => {
  const matched = route.matched;
  const breadcrumb = matched[matched.length - 1].meta.breadcrumb;

  // if type current overwrite path to its own path
  if (breadcrumb) {
    breadcrumb.forEach((item) => {
      if (item.type == "current") {
        item.path = route.path;
      } else if (item.type == "parent") {
        item.path = route.path.split("/").slice(0, -item.parentNo).join("/");
      }
    });
  }
  return breadcrumb;
});

async function navigateMenu(path) {
  try {
    await navigateTo(path);
  } catch (e) {
    return;
  }
}
</script>

<template>
  <div
    v-if="breadcrumb"
    class="flex flex-col md:flex-row items-stretch justify-between"
  >
    <div class="flex items-center" v-if="breadcrumb && breadcrumb.length != 0">
      <span
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex items-center text-primary"
      >
        <Icon
          v-if="index != 0"
          name="ic:round-chevron-right"
          size="14"
          class="mr-1"
        ></Icon>
        <a
          @click="navigateMenu(item.path)"
          class="cursor-pointer hover:underline pr-1 font-normal text-sm text-gray-500"
          :class="{
            '!text-primary': breadcrumb.length - 1 == index,
          }"
          >{{ item.name }}</a
        >
      </span>
    </div>
    <slot name="right"></slot>
  </div>
</template>
