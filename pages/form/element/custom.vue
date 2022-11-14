<script setup>
definePageMeta({
  title: "Custom Input",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> One-Time Password </template>
      <template #body>
        <FormKit
          type="otp"
          label="One-Time Password"
          help="We've sent code to your phone number"
          digits="6"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Dropzone</template>
      <template #body>
        <FormKit
          type="dropzone"
          label="Documents"
          help="Select as many documents as you would like."
          multiple="true"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Range</template>
      <template #body>
        <FormKit
          type="range"
          label="Volume"
          min="0"
          max="11"
          help="Select your volume level."
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Color</template>
      <template #body>
        <FormKit
          type="color"
          value="#FB7185"
          label="Select a color"
          help="Select your favorite color."
        />
      </template>
    </rs-card>
  </div>
</template>
