<script setup>
import { directive as vClickAway } from "vue3-click-away";

const props = defineProps({
  title: {
    type: String,
    default: "Default",
  },
  variant: {
    type: String,
    default: "primary",
  },
  position: {
    type: String,
    default: "bottom",
  },
  textAlign: {
    type: String,
    default: "left",
  },
  size: {
    type: String,
    default: "md",
  },
  itemSize: {
    type: String,
    default: "10rem",
  },
});

const isOpen = ref(false);

const toggle = (event) => {
  isOpen.value = !isOpen.value;
};

const closeMenu = (event) => {
  isOpen.value = false;
};
</script>

<template>
  <div class="relative inline-flex" v-click-away="closeMenu">
    <button
      @click="toggle"
      class="flex items-center gap-x-2 rounded-lg focus:outline-none focus:ring-0 whitespace-nowrap"
      :class="{
        'text-sm px-3 py-1.5': size === 'sm',
        'text-sm px-6 py-2.5': size === 'md',
        'text-base px-8 py-4': size === 'lg',

        // Filled Button
        'text-white focus:text-white bg-primary hover:bg-primary/90 focus:bg-primary/90':
          variant === 'primary',
        'text-white focus:text-white bg-secondary hover:bg-secondary/90 focus:bg-secondary/90':
          variant === 'secondary',
        'text-white focus:text-white bg-info hover:bg-info/90 focus:bg-info/90':
          variant === 'info',
        'text-white focus:text-white bg-success hover:bg-success/90 focus:bg-success/90':
          variant === 'success',
        'text-white focus:text-white bg-warning hover:bg-warning/90 focus:bg-warning/90':
          variant === 'warning',
        'text-white focus:text-white bg-danger hover:bg-danger/90 focus:bg-danger/90':
          variant === 'danger',

        // Outline Button
        'text-primary border border-primary hover:bg-primary/5 focus:bg-primary/5':
          variant === 'primary-outline',
        'text-secondary border border-secondary hover:bg-secondary/5 focus:bg-secondary/5':
          variant === 'secondary-outline',
        'text-info border border-blue-500 hover:bg-info/5 focus:bg-info/5':
          variant === 'info-outline',
        'text-success border border-success hover:bg-success/5 focus:bg-success/5':
          variant === 'success-outline',
        'text-warning border border-warning hover:bg-warning/5 focus:bg-warning/5':
          variant === 'warning-outline',
        'text-danger border border-danger hover:bg-danger/5 focus:bg-danger/5':
          variant === 'danger-outline',

        // Text Button
        'text-primary hover:bg-primary/5 focus:bg-primary/5 ':
          variant === 'primary-text',
        'text-secondary hover:bg-secondary/5 focus:bg-secondary/5 ':
          variant === 'secondary-text',
        'text-info hover:bg-info/5 focus:bg-info/5': variant === 'info-text',
        'text-success hover:bg-success/5 focus:bg-success/5':
          variant === 'success-text',
        'text-warning hover:bg-warning/5 focus:bg-warning/5':
          variant === 'warning-text',
        'text-danger hover:bg-danger/5 focus:bg-danger/5':
          variant === 'danger-text',
      }"
      type="button"
    >
      <slot v-if="$slots.title" name="title"></slot>
      <span v-else>{{ props.title }}</span>
      <Icon
        v-if="position === 'bottom'"
        name="ic:outline-keyboard-arrow-down"
      />
      <Icon
        v-else-if="position === 'top'"
        name="ic:outline-keyboard-arrow-up"
      />
      <Icon v-else-if="position === 'left'" name="ic:outline-chevron-left" />
      <Icon v-else-if="position === 'right'" name="ic:outline-chevron-right" />
    </button>
    <section
      class="absolute z-10 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-md rounded-lg py-1 whitespace-nowrap"
      :class="{
        'top-10': position == 'bottom' && size == 'sm',
        'top-12': position == 'bottom' && size == 'md',
        'top-16': position == 'bottom' && size == 'lg',
        'bottom-10': position == 'top' && size == 'sm',
        'bottom-12': position == 'top' && size == 'md',
        'bottom-16': position == 'top' && size == 'lg',
        'top-0 -left-42': position == 'left',
        'top-0 -right-42': position == 'right',
        'right-0':
          (position == 'bottom' || position == 'top') && textAlign == 'right',
      }"
      :style="`min-width: ${itemSize}`"
      v-show="isOpen"
    >
      <slot></slot>
    </section>
  </div>
</template>
