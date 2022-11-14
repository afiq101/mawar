<script setup>
definePageMeta({
  title: "Progress Bar",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <p class="mb-4">
          Use the <code>rs-progress-bar</code> component to create a progress
          bar. There are props to change the color, size, max, show value, and
          value.
        </p>
        <rs-progress-bar
          label="Primary Progress"
          :value="11"
          :max="100"
          :variant="'primary'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Secondary Progress"
          :value="43"
          :max="100"
          :variant="'secondary'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Success Progress"
          :value="45"
          :max="100"
          :variant="'success'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Danger Progress"
          :value="90"
          :max="100"
          :variant="'danger'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Warning Progress"
          :value="36"
          :max="100"
          :variant="'warning'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Info Progress"
          :value="25"
          :max="100"
          :variant="'info'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
      </template>
    </rs-card>
  </div>
</template>
