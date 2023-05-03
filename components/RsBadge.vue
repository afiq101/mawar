<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  icon: {
    type: String,
    default: "",
  },
  iconSize: {
    type: String,
    default: "18",
  },
});
</script>

<template>
  <div
    class="inline whitespace-nowrap text-center rounded-lg w-auto text-white px-3 py-1"
    :class="{
      'bg-info': variant === 'info',
      'bg-primary': variant === 'primary',
      'bg-success': variant === 'success',
      'bg-warning': variant === 'warning',
      'bg-danger': variant === 'danger',
    }"
  >
    <Icon
      class="align-middle"
      v-if="icon"
      :name="icon"
      :size="iconSize"
    ></Icon>
    <slot />
  </div>
</template>
