<script setup>
import RSFormBuilder from "@@/assets/js/rs-form-builder";
definePageMeta({
  title: "Form Builder",
});

console.log(RSFormBuilder);

const formSchema = RSFormBuilder.formSchema.options;
const formConfig = RSFormBuilder.formSchema.config;

const refreshKey = ref(0);
const floatCard = ref(null);

const form = ref({
  id: "",
  fields: [
    {
      title: "Untitled Form",
      description: "",
      child: [
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

const generatedRandomUUID = () => {
  return Math.random().toString(36).substring(2, 15);
};

onMounted(() => {
  form.value.id = generatedRandomUUID();
});

const setAction = (e) => {
  // Remove active class from all rs-form-section
  document.querySelectorAll(".rs-form-section").forEach((item) => {
    item.classList.remove("active");
  });

  // Remove active class from all rs-form-field
  document.querySelectorAll(".rs-form-field").forEach((item) => {
    item.classList.remove("active");
  });

  // Get parent .rs-form-section class
  const section = e.target.closest(".rs-form-section");
  section.classList.add("active");

  // find rs-card class and set class to rs-card-active
  const field = e.target.closest(".rs-form-field");
  field.classList.add("active");

  // Set top position of floatCard from rs-card
  floatCard.value.$el.style.top = field.offsetTop + section.offsetTop + "px";
};

const setTypeValue = (sectionIndex, fieldIndex, value) => {
  try {
    // Set model value
    form.value.fields[sectionIndex].child[fieldIndex].modelValue =
      formConfig.global.input.default.type[value].value;

    // Set type value
    form.value.fields[sectionIndex].child[fieldIndex].type = value;

    if (value == "checkbox" || value == "radio") {
      form.value.fields[sectionIndex].child[fieldIndex].options =
        formConfig.global.input.default.type[value].options;
    } else {
      form.value.fields[sectionIndex].child[fieldIndex].options = [];
    }

    refreshKey.value++;
  } catch (error) {
    console.log(error);
  }
};

const startDragField = (event, field, sectionIndex, fieldIndex) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";

  const data = {
    ...field,
    prevSectionIndex: sectionIndex,
    prevFieldIndex: fieldIndex,
  };

  event.dataTransfer.setData("text/plain", JSON.stringify(data));
};

const dropDragField = (event, sectionIndex, fieldIndex) => {
  event.preventDefault();
  event.stopPropagation();

  const data = JSON.parse(event.dataTransfer.getData("text/plain"));

  // Delete field
  form.value.fields[data.prevSectionIndex].child.splice(data.prevFieldIndex, 1);

  // Add new field
  form.value.fields[sectionIndex].child.splice(fieldIndex, 0, {
    ...data,
  });
};

const addSection = () => {
  let sectionIndex = 0;

  // Add based on position of active rs-form-section
  const section = document.querySelector(".rs-form-section.active");

  if (section) {
    sectionIndex = Array.from(section.parentNode.children).indexOf(section) + 1;
  } else {
    // Handle the case when section is null or not found
    sectionIndex = form.value.fields.length;
  }

  // Add new section
  form.value.fields.splice(sectionIndex, 0, {
    title: "Untitled Form",
    description: "",
    child: [],
  });
};

const duplicateSection = (sectionIndex) => {
  // Add new section
  form.value.fields.splice(sectionIndex, 0, {
    ...form.value.fields[sectionIndex],
  });
};

const deleteSection = (sectionIndex) => {
  // Delete section
  form.value.fields.splice(sectionIndex, 1);
};

const addField = (type) => {
  let sectionIndex = 0;
  let fieldIndex = 0;

  // Add based on position of active rs-form-section
  const section = document.querySelector(".rs-form-section.active");

  if (section) {
    sectionIndex = Array.from(section.parentNode.children).indexOf(section);
  } else {
    // Handle the case when section is null or not found
    sectionIndex = form.value.fields.length;
  }

  // Add based on position of active rs-form-field
  const field = document.querySelector(".rs-form-field.active");

  if (field) {
    fieldIndex = Array.from(field.parentNode.children).indexOf(field) - 1;
  } else {
    // Handle the case when field is null or not found
    fieldIndex = form.value.fields[sectionIndex].child.length;
  }

  // Add new field
  if (type == "title") {
    form.value.fields[sectionIndex].child.splice(fieldIndex, 0, {
      type: "title",
      title: "",
      description: "",
    });
    return;
  }

  form.value.fields[sectionIndex].child.splice(fieldIndex, 0, {
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

const duplicateField = (sectionIndex, fieldIndex, field) => {
  // Add new field
  form.value.fields[sectionIndex].child.splice(fieldIndex, 0, {
    ...field,
  });
};

const deleteField = (sectionIndex, fieldIndex) => {
  // Delete field
  form.value.fields[sectionIndex].child.splice(fieldIndex, 1);
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <div class="mb-4">FORM ID => {{ form.id }}</div>

    <div class="relative md:grid md:grid-cols-12 gap-x-4">
      <div v-auto-animate class="md:col-span-11">
        <div
          v-auto-animate
          v-for="(section, sectionIndex) in form.fields"
          class="rs-form-section mb-16"
          :class="{
            active: sectionIndex == 0,
          }"
        >
          <div
            class="section-badge font-medium py-2 px-3 text-primary border border-primary bg-white mb-3 w-fit rounded-tl-lg rounded-br-lg"
          >
            Section {{ sectionIndex + 1 }} of {{ form.fields.length }}
          </div>

          <rs-card
            @click="setAction"
            class="rs-form-field p-5"
            :class="{
              active: sectionIndex == 0,
            }"
          >
            <FormKit
              type="text"
              v-model="section.title"
              placeholder="Untitled Form"
              :classes="{
                inner: '!border-0 !border-b !rounded-none',
                input: '!text-2xl font-semibold',
                outer: '!mb-0',
              }"
            />

            <FormKit
              type="text"
              v-model="section.description"
              placeholder="Form Description"
              :classes="{
                inner: '!border-0 !border-b !rounded-none',
                input: '!font-normal',
                outer: '!mb-0',
              }"
            />
            <br />
            <div class="flex justify-end">
              <VDropdown :distance="6">
                <button>
                  <Icon name="ph:dots-three-circle-vertical" />
                </button>

                <template #popper>
                  <div class="my-2">
                    <div
                      class="py-2 px-3 cursor-pointer hover:bg-gray-300"
                      @click="duplicateSection(sectionIndex)"
                    >
                      Duplicate section
                    </div>
                    <div
                      class="py-2 px-3 cursor-pointer hover:bg-gray-300"
                      @click="deleteSection(sectionIndex)"
                    >
                      Delete section
                    </div>
                  </div>
                </template>
              </VDropdown>
            </div>
          </rs-card>
          <rs-card
            v-for="(field, fieldIndex) in section.child"
            @click="setAction"
            class="rs-form-field px-5 pb-5"
            draggable="true"
            @dragstart="startDragField($event, field, sectionIndex, fieldIndex)"
            @drop="dropDragField($event, sectionIndex, fieldIndex)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="flex justify-center items-center pt-2 mb-3">
              <Icon
                name="material-symbols:drag-indicator"
                class="cursor-move text-gray-300 rotate-90"
              />
            </div>
            <div v-if="field.type == 'title'">
              <FormKit
                type="text"
                v-model="field.title"
                placeholder="Title"
                :classes="{
                  inner: '!border-0 !border-b !rounded-none',
                  input: '!text-2xl font-semibold',
                  outer: '!mb-0',
                }"
              />

              <FormKit
                type="text"
                v-model="field.description"
                placeholder="Description"
                :classes="{
                  inner: '!border-0 !border-b !rounded-none',
                  input: '!font-normal',
                  outer: '!mb-0',
                }"
              />
            </div>
            <div v-else class="grid grid-cols-12 gap-x-4">
              <FormKit
                v-if="field.type"
                :type="field.type"
                v-model="field.modelValue"
                :options="field.options"
                :key="refreshKey"
                :classes="{
                  outer: 'col-span-8 !mb-0',
                  input: '!h-14',
                }"
              />

              <FormKit
                type="select"
                v-model="field.selectValue"
                :options="formSchema.inputs"
                @input="
                  setTypeValue(sectionIndex, fieldIndex, field.selectValue)
                "
                :classes="{
                  outer: 'col-span-4 !mb-0',
                  input: '!h-14',
                }"
              />
            </div>

            <rs-collapse v-if="field.type != 'title'" class="!mb-0">
              <rs-collapse-item>
                <template #title>
                  <span class="text-base"> Advanced Options </span>
                </template>

                Collapse Item 1 content
              </rs-collapse-item>
            </rs-collapse>

            <div class="flex justify-end gap-x-2 mt-4">
              <VTooltip>
                <Icon
                  name="ph:copy"
                  class="hover:text-primary outline-none cursor-pointer"
                  @click="duplicateField(sectionIndex, fieldIndex, field)"
                />

                <template #popper> Duplicate Field </template>
              </VTooltip>

              <VTooltip>
                <Icon
                  name="ph:trash"
                  class="hover:text-primary outline-none cursor-pointer"
                  @click="deleteField(sectionIndex, fieldIndex)"
                />

                <template #popper> Delete Field </template>
              </VTooltip>
            </div>
          </rs-card>
        </div>
      </div>
      <div class="relative md:col-span-1">
        <rs-card
          ref="floatCard"
          class="w-full sticky md:absolute md:top-[49px] p-3"
        >
          <div class="flex flex-wrap items-center justify-center gap-4">
            <VTooltip>
              <Icon
                name="material-symbols:add-box-outline-rounded"
                class="hover:text-primary outline-none cursor-pointer"
                @click="addField('form')"
              />

              <template #popper> Add Form </template>
            </VTooltip>

            <VTooltip>
              <Icon
                name="material-symbols:text-fields"
                class="hover:text-primary outline-none cursor-pointer"
                @click="addField('title')"
              />

              <template #popper> Add Title and Description </template>
            </VTooltip>

            <VTooltip>
              <Icon
                name="tabler:section"
                class="hover:text-primary outline-none cursor-pointer"
                @click="addSection"
              />

              <template #popper> Add Section </template>
            </VTooltip>
          </div>
        </rs-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rs-form-section.active .section-badge {
  background-color: rgba(var(--color-primary));
  color: #ffffff;
}

.rs-form-field.active {
  border-left: 4px solid rgba(var(--color-primary)) !important;
}
</style>
