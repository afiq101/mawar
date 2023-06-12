<script setup>
import RSFormBuilder from "@@/assets/js/rs-form-builder";

console.log(RSFormBuilder);

const formSchema = RSFormBuilder.formSchema.options;
const formConfig = RSFormBuilder.formSchema.config;

const refreshKey = ref(0);

const form = ref({
  title: "Untitled Form",
  description: "",
  fields: [
    {
      type: "text",
      label: "",
      name: "",
      placeholder: "",
      selectValue: "text",
      modelValue: "Text Input",
      required: true,
      options: [],
      validation: {
        type: "text",
        rules: {
          required: true,
          min: 3,
          max: 10,
        },
      },
    },
  ],
  settings: {
    theme: "default",
    layout: "vertical",
    button: {
      text: "Submit",
      color: "primary",
    },
  },
});

const setTypeValue = (index, value) => {
  try {
    // Set model value
    form.value.fields[index].modelValue =
      formConfig.global.input.default.type[value].value;

    // Set type value
    form.value.fields[index].type = value;

    if (value == "checkbox" || value == "radio") {
      form.value.fields[index].options =
        formConfig.global.input.default.type[value].options;
    } else {
      form.value.fields[index].options = [];
    }

    refreshKey.value++;
  } catch (error) {
    console.log(error);
  }
};

const addField = () => {
  form.value.fields.push({
    type: "text",
    label: "",
    name: "",
    placeholder: "",
    selectValue: "text",
    modelValue: "Text Input",
    required: true,
    options: [],
    validation: {
      type: "text",
      rules: {
        required: true,
      },
    },
  });
};
</script>

<template>
  <div>
    <rs-card class="p-5">
      <FormKit
        type="text"
        v-model="form.title"
        placeholder="Untitled Form"
        :classes="{
          inner: '!border-0 !border-b',
          input: 'text-2xl font-semibold',
          outer: '!mb-0',
        }"
      />

      <FormKit
        type="text"
        v-model="form.description"
        placeholder="Form Description"
        :classes="{
          inner: '!border-0 !border-b',
          input: '!font-normal',
          outer: '!mb-0',
        }"
      />
    </rs-card>
    <rs-card v-for="(item, index) in form.fields" class="p-5">
      <div class="grid grid-cols-12 gap-x-4">
        <FormKit
          v-if="item.type"
          :type="item.type"
          v-model="item.modelValue"
          :options="item.options"
          :key="refreshKey"
          :classes="{
            outer: 'col-span-8 !mb-0',
            input: '!h-14',
          }"
        />

        <FormKit
          type="select"
          v-model="item.selectValue"
          :options="formSchema.inputs"
          @input="setTypeValue(index, item.selectValue)"
          :classes="{
            outer: 'col-span-4 !mb-0',
            input: '!h-14',
          }"
        />
      </div>

      <rs-collapse>
        <rs-collapse-item title="Advanced Options">
          Collapse Item 1 content
        </rs-collapse-item>
      </rs-collapse>

      <hr />

      <div class=""></div>

      <rs-button color="primary" class="w-full" @click="addField">
        Add Field
      </rs-button>
    </rs-card>
  </div>
</template>
