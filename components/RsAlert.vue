<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: true,
  },
  autoDismiss: {
    type: Boolean,
    default: false,
  },
  timer: {
    type: Number,
    default: 1000,
  },
});

const showComponent = ref(props.show);

const autoDismiss = () => {
  setTimeout(() => {
    showComponent.value = false;
  }, props.timer);
};

onMounted(() => {
  if (props.autoDismiss) {
    autoDismiss();
  }
});
</script>

<template>
  <Transition name="fade-up">
    <div
      v-if="showComponent"
      class="visible flex items-center justify-between w-100 py-3 px-3 rounded-lg"
      :class="{
        'bg-primary/20  text-primary ': variant === 'primary',
        'bg-secondary/20  text-secondary ': variant === 'secondary',
        'bg-info/20  text-info  ': variant === 'info',
        'bg-success/20 text-success  ': variant === 'success',
        'bg-warning/20  text-warning  ': variant === 'warning',
        'bg-danger/20  text-danger  ': variant === 'danger',
      }"
    >
      <slot />
      <button @click="showComponent = false">
        <Icon name="ic:baseline-close" size="14"></Icon>
      </button>
    </div>
  </Transition>
</template>
