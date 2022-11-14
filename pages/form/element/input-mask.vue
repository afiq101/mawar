<script setup>
definePageMeta({
  title: "Input Mask",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Mask </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <FormKit
            type="mask"
            label="Phone with 012-34567890"
            mask="###-########"
          />
          <FormKit type="mask" label="Date with MM/DD/YYYY" mask="##/##/####" />
          <FormKit
            type="mask"
            label="Credit / Debit Card"
            mask="#### #### #### ####"
          />
          <FormKit
            type="mask"
            label="Identity Card (IC)"
            mask="######-##-####"
          />
        </div>
      </template>
    </rs-card>
  </div>
</template>
