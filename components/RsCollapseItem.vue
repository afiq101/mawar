<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
const compID = ref(null);
const collapseGroup = ref(null);
const parentID = ref(null);

const instance = getCurrentInstance();

const isAccordion = instance.parent.props.accordion;
const type = ref(instance.parent.props.type);
const height = ref(0);
const maxHeight = ref(60);

//watch intance type
watch(
  () => instance.parent.props.type,
  (newValue) => {
    type.value = newValue;
  },
  { deep: true }
);

const onClick = () => {
  const parentElement = document.querySelector(`#${collapseGroup.value.id}`);
  parentID.value = parentElement.parentElement.id;

  const scrollHeight = parentElement.scrollHeight;
  const targetOpenCollapse = parentElement.classList.contains(
    "accordion-group--open"
  );
  const openCollapse = document.querySelector(
    `#${parentID.value} .accordion-group--open`
  );

  if (isAccordion) {
    if (openCollapse) {
      const openCollapseHeader = document.querySelector(
        `#${parentID.value} .accordion-group--open .accordion-header`
      );
      openCollapse.style.maxHeight = `${openCollapseHeader.scrollHeight}px`;
      openCollapse.classList.remove("accordion-group--open");
    }
  }
  if (targetOpenCollapse) {
    parentElement.style.maxHeight = maxHeight.value + "px";
    parentElement.classList.remove("accordion-group--open");
  } else {
    parentElement.style.maxHeight = scrollHeight + "px";
    parentElement.classList.add("accordion-group--open");
  }
};

const generateRandomID = () => {
  // Generate random id with datetimestamp
  return `accordion-${new Date().getTime()}-${Math.floor(
    Math.random() * 1000
  )}`;
};

// On mounted get height collapse header
onMounted(() => {
  try {
    compID.value = generateRandomID();

    const parentElement = document.querySelector(
      `#${collapseGroup.value.id} .accordion-header`
    );

    const scrollHeight = parentElement.scrollHeight;
    maxHeight.value = scrollHeight;
    height.value = scrollHeight;
  } catch (error) {
    // console.log(error);
    return;
  }
});
</script>

<template>
  <div
    :id="compID"
    ref="collapseGroup"
    class="accordion-group"
    :class="{
      'accordion-default': type === 'default',
      'accordion-border': type === 'border',
      'accordion-card': type === 'card',
    }"
    :style="`max-height: ${maxHeight}px; transition-property: max-height`"
  >
    <div class="accordion-header" @click="onClick">
      <slot v-if="!!$slots.title" name="title"></slot>
      <span v-else> {{ title }}</span>
    </div>
    <div class="accordion-body">
      <slot />
    </div>
  </div>
</template>
