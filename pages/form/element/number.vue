<script setup>
definePageMeta({
  title: "Input Number",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <FormKit
          type="number"
          help="What temperature should the house be?"
          label="Temperature"
          value="25"
          step="1"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Number validation </template>
      <template #body>
        <FormKit
          type="number"
          help="The temperature should be between 20 - 50 degrees"
          label="Temperature"
          value="20"
          step="1"
          validation="between:20,50"
          validation-visibility="live"
        />

        <FormKit
          type="number"
          help="Minimum temperature should be 20 degrees"
          label="Temperature"
          value="20"
          step="1"
          validation="min:20"
          validation-visibility="live"
        />

        <FormKit
          type="number"
          help="Maximum temperature should be 50 degrees"
          label="Temperature"
          value="50"
          step="1"
          validation="max:50"
          validation-visibility="live"
        />
      </template>
    </rs-card>
  </div>
</template>
