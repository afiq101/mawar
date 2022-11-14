<script setup>
definePageMeta({
  title: "Input Textarea",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <FormKit
          type="textarea"
          placeholder="This is a placeholder"
          label="Textarea"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Increase Row </template>
      <template #body>
        <p class="mb-4">
          Textarea can be increase row by using <code>rows</code> prop.
        </p>
        <FormKit
          type="textarea"
          placeholder="This is a placeholder"
          rows="8"
          label="Textarea"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header>Resize</template>
      <template #body>
        <p class="mb-4">
          Textarea resize can be disable using tailwind class.
          <code>resize-none</code>
        </p>
        <FormKit type="textarea" label="Textarea" input-class="resize-none" />
      </template>
    </rs-card>
  </div>
</template>
