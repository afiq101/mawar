<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: String,
    default: "400px",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const cmOptions = {
  mode: "text/x-vue", // Language mode
  theme: "material-darker", // Theme
};

const code = props.modelValue
  ? ref(props.modelValue)
  : ref(`<template></template>`);
</script>

<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    placeholder="test placeholder"
    :height="height"
    style="border-radius: 0.5rem"
    @change="emits('update:modelValue', $event)"
  />
</template>
