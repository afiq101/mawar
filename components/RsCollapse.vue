<script setup>
const props = defineProps({
  accordion: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "default",
  },
});

const compID = ref(null);

const generateRandomID = () => {
  // Generate random id with datetimestamp
  return `accordion-${new Date().getTime()}-${Math.floor(
    Math.random() * 1000
  )}`;
};

onMounted(() => {
  try {
    compID.value = generateRandomID();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div
    :id="compID"
    class="accordion"
    :class="{
      'accordion-border': type === 'border',
    }"
  >
    <slot />
  </div>
</template>
