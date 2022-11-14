<script setup>
definePageMeta({
  title: "Input Radio",
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
      <template #header> Default </template>
      <template #body>
        <FormKit
          type="radio"
          label="Cars"
          help="What is your favourite car?"
          :options="options"
        />
      </template>
    </rs-card>
    <rs-card>
      <template #header> Disabled Radio Item </template>
      <template #body>
        <FormKit
          type="radio"
          label="Movies"
          help="What is your favourite movie?"
          :options="options2"
        />
      </template>
    </rs-card>
  </div>
</template>
