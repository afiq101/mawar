<script setup>
definePageMeta({
  title: "Input Checkbox",
});

const options = ["Audi", "Mazda", "Proton", "Perodua", "BMW", "Mercedes"];
const options2 = [
  { label: "Shawshank redemption", value: "shawshank" },
  { label: "The Godfather", value: "godfather" },
  {
    label: "Casablanca (too old)",
    value: "casablanca",
    attrs: { disabled: true },
  },
  { label: "The Lord of the Rings", value: "lotr" },
  { label: "Saving Private Ryan", value: "saving-ryan" },
];
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Single Checkbox </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Terms and Conditions"
          help="Do you agree to our terms of service?"
          name="terms"
          validation="accepted"
          validation-visibility="dirty"
          input-class="icon-check"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Multiple Checkbox </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Cars"
          help="Select your favourite cars?"
          :options="options"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Disabled Checkbox Item </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Movies"
          help="What is your favourite movie?"
          :options="options2"
        />
      </template>
    </rs-card>
    <rs-card>
      <template #header> Validation </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Cars"
          help="Please select at least 3 cars?"
          :options="options"
          validation="required|min:3"
          validation-visibility="dirty"
        />
      </template>
    </rs-card>
  </div>
</template>
