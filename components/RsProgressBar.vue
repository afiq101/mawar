<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  showValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="progress-wrapper w-full mb-4">
    <div class="progress-label text-sm mb-1">{{ label }}</div>
    <div
      class="progress flex rounded-full"
      :class="{
        'h-3': size === 'sm',
        'h-4': size === 'md',
        'h-5': size === 'lg',
        'bg-primary/20': variant == 'primary',
        'bg-secondary/20': variant == 'secondary',
        'bg-info/20': variant == 'info',
        'bg-success/20': variant == 'success',
        'bg-warning/20': variant == 'warning',
        'bg-danger/20': variant == 'danger',
      }"
    >
      <div
        class="progressbar flex items-center justify-center rounded-full text-white"
        :class="{
          'bg-primary': variant == 'primary',
          'bg-secondary': variant == 'secondary',
          'bg-info': variant == 'info',
          'bg-success': variant == 'success',
          'bg-warning': variant == 'warning',
          'bg-danger': variant == 'danger',
        }"
        :style="{ width: (value / max) * 100 + '%' }"
      >
        <span class="text-xs" v-if="showValue">{{ value }}</span>
      </div>
    </div>
  </div>
</template>
