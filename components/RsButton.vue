<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "fill",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
});
</script>

<template>
  <button
    class="w-fit rounded-lg flex justify-center items-center h-fit"
    :class="{
      'text-xs px-4 py-1': size === 'sm',
      'text-sm px-8 py-2.5': size === 'md',
      'text-base px-10 py-4': size === 'lg',

      // Filled Button
      'text-white bg-primary hover:bg-primary/90 disabled:bg-primary/30 disabled:text-primary/50 disabled:border-primary/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'primary',
      'text-white bg-secondary hover:bg-secondary/90 disabled:bg-secondary/30 disabled:text-secondary/50 disabled:border-secondary/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'secondary',
      'text-white bg-info hover:bg-info/90 disabled:bg-info/30 disabled:text-info/50 disabled:border-info/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'info',
      'text-white bg-success hover:bg-success/90 disabled:bg-success/30 disabled:text-success/50 disabled:border-success/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'success',
      'text-white bg-warning hover:bg-warning/90 disabled:bg-warning/30 disabled:text-warning/50 disabled:border-warning/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'warning',
      'text-white bg-danger hover:bg-danger/90 disabled:bg-danger/30 disabled:text-danger/50 disabled:border-danger/5 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'danger',

      // Outline Button
      'text-primary border border-primary hover:bg-primary/5 disabled:bg-primary/0 disabled:text-primary/30 disabled:border-primary/30 disabled:cursor-default dark:hover:bg-slate-700  dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'primary-outline',
      'text-secondary border border-secondary hover:bg-secondary/5 disabled:bg-secondary/0 disabled:text-secondary/30 disabled:border-secondary/30 disabled:cursor-default dark:hover:bg-slate-700  dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'secondary-outline',
      'text-info border border-info hover:bg-info/5 disabled:bg-info/0 disabled:text-info/30 disabled:border-info/30 disabled:cursor-default dark:hover:bg-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'info-outline',
      'text-success border border-success hover:bg-success/5 disabled:bg-success/0 disabled:text-success/30 disabled:border-success/30 disabled:cursor-default dark:hover:bg-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'success-outline',
      'text-warning border border-warning hover:bg-warning/5 disabled:bg-warning/0 disabled:text-warning/30 disabled:border-warning/30 disabled:cursor-default dark:hover:bg-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'warning-outline',
      'text-danger border border-danger hover:bg-danger/5 disabled:bg-danger/0 disabled:text-danger/30 disabled:border-danger/30 disabled:cursor-default dark:hover:bg-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'danger-outline',

      //Text Button
      'text-primary hover:bg-primary/10 disabled:bg-primary/5 disabled:text-primary/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'primary-text',
      'text-secondary hover:bg-secondary/10 disabled:bg-secondary/5 disabled:text-secondary/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'secondary-text',
      'text-info hover:bg-info/10 disabled:bg-info/5 disabled:text-info/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'info-text',
      'text-success hover:bg-success/10 disabled:bg-success/5 disabled:text-success/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'success-text',
      'text-warning hover:bg-warning/10 disabled:bg-warning/5 disabled:text-warning/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'warning-text',
      'text-danger hover:bg-danger/10 disabled:bg-danger/5 disabled:text-danger/30 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'danger-text',
    }"
  >
    <slot />
  </button>
</template>
