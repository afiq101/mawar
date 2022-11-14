<script setup>
definePageMeta({
  title: "Input Select",
});

const options = [
  "Malaysia",
  "Singapore",
  "Thailand",
  "Indonesia",
  "Brunei",
  "Laos",
  "Cambodia",
  "Myanmar",
  "Philippines",
  "Vietnam",
  "Timor-Leste",
];
const options2 = [
  { label: "Malaysia", value: "my", attrs: { disabled: true } },
  { label: "Singapore", value: "sg", attrs: { disabled: true } },
  { label: "Thailand", value: "th", attrs: { disabled: true } },
  { label: "Indonesia", value: "id", attrs: { disabled: true } },
  { label: "Brunei", value: "b", attrs: { disabled: true } },
  { label: "Laos", value: "ls", attrs: { disabled: true } },
  { label: "Cambodia", value: "cb", attrs: { disabled: true } },
  { label: "Japan", value: "jp" },
  { label: "Myanmar", value: "mm", attrs: { disabled: true } },
];
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Single Select </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country is the biggest?"
          :options="options"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Multiple Select </template>
      <template #body>
        <FormKit
          type="select"
          multiple
          label="Select all the country that you like?"
          help="Select all that apply by holding command (macOS) or control (PC)."
          :options="options"
          input-class="h-full"
        />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Disabled Select Item </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country you want to visit?"
          :options="options2"
        />
      </template>
    </rs-card>
    <rs-card>
      <template #header> Validation </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country is the biggest?"
          placeholder="Select a country"
          :options="options"
          validation="required|is:Indonesia"
          validation-visibility="dirty"
          :validation-messages="{
            is: 'Nope! Indonesia is the largest country in the list.',
          }"
        />
      </template>
    </rs-card>
  </div>
</template>
