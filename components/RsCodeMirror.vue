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
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
};

const code = props.modelValue
  ? ref(props.modelValue)
  : ref(`<template></template>`);
</script>

<template>
  <ClientOnly>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      placeholder="test placeholder"
      :height="height"
      @change="emits('update:modelValue', $event)"
    />
  </ClientOnly>
</template>
