<script setup>
import RSFormBuilder from "@@/assets/js/rs-form-builder";
import { Buffer } from "buffer";
import { DateTime } from "luxon";

definePageMeta({
  title: "Form",
  layout: "empty",
});

const { $swal, $router } = useNuxtApp();
const { id } = useRoute().params;

const formSchema = RSFormBuilder.formSchema.options;
const formConfig = RSFormBuilder.formSchema.config;
const formConfigOptionInputDefault = formConfig.global.input.default;

const refreshKey = ref(0);

const floatCard = ref(null);
const showModalForm = ref(false);

const bannerFile = ref(null);
const showModalAddBanner = ref(false);
const showModalAddUrl = ref(false);

const originURL = ref("");

const formId = ref("");
const form = ref({
  id: "",
  name: "",
  bannerImg: "",
  apiURL: "",
});
const mode = ref("");

formId.value = decodedFormId(id).id;
mode.value = decodedFormId(id).type;

const { data: getFormById } = await useFetch(
  "/api/devtool/form-builder/get-form",
  {
    method: "GET",
    query: {
      id: formId.value,
    },
  }
);
if (getFormById.value.statusCode == 200) {
  console.log(getFormById.value.data);
  form.value = getFormById.value.data;

  // if field is empty append
  if (!form.value?.fields) {
    form.value.fields = [
      {
        title: "Untitled Form",
        description: "",
        child: [
          {
            type: "text",
            label: formConfigOptionInputDefault.label.show
              ? formConfigOptionInputDefault.label.text
              : "",
            help: formConfigOptionInputDefault.help.show
              ? formConfigOptionInputDefault.help.text
              : "",
            placeholder: formConfigOptionInputDefault.placeholder.show
              ? formConfigOptionInputDefault.placeholder.text
              : "",
            selectValue: "text",
            modelValue: "Short answer text",
            showAdvancedOptions: false,
            options: [],
            validation: {
              rules: [],
            },
          },
        ],
      },
    ];
  }
}

function encodedFormId(type) {
  const formID = form.value.id + "." + type;
  return Buffer.from(formID).toString("base64");
}

function decodedFormId(id) {
  const formID = Buffer.from(id, "base64").toString("ascii");
  return {
    id: formID.split(".")[0],
    type: formID.split(".")[1],
  };
}

const addBannerImage = () => {
  // Convert base64 bannerFile
  const bannerFile = document.getElementById("bannerFile");

  // Assuming bannerFile.value is not directly accessible, and you need to access the selected file through the files property
  const selectedFile = bannerFile.files[0];

  // Check if a file is selected
  if (selectedFile) {
    // Convert selectedFile to base64
    const reader = new FileReader();

    reader.onload = () => {
      // Assign the base64 value to form.value.bannerImg
      form.value.bannerImg = reader.result;
      // console.log(form.value.bannerImg);
    };

    // Read the file as base64
    reader.readAsDataURL(selectedFile);
  }
};

const setAction = (e) => {
  try {
    if (e.target.closest(".rs-form-field").classList.contains("active")) {
      return;
    }

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
  } catch (error) {}
};

const setTypeValue = (sectionIndex, fieldIndex, value) => {
  try {
    // Set model value
    form.value.fields[sectionIndex].child[fieldIndex].modelValue =
      formConfig.global.input.default.type[value].value;

    // Set type value
    form.value.fields[sectionIndex].child[fieldIndex].type = value;

    if (value == "checkbox" || value == "radio" || value == "select") {
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
    label: formConfigOptionInputDefault.label.show
      ? formConfigOptionInputDefault.label.text
      : "",
    placeholder: formConfigOptionInputDefault.placeholder.show
      ? formConfigOptionInputDefault.placeholder.text
      : "",
    help: formConfigOptionInputDefault.help.show
      ? formConfigOptionInputDefault.help.text
      : "",
    selectValue: "text",
    modelValue: "Short answer text",
    showAdvancedOptions: false,
    options: [],
    validation: {
      rules: [],
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
  // If delete last field assign .active to previous field
  if (form.value.fields[sectionIndex].child.length == 2) {
    const field = document.querySelector(".rs-form-field.active");

    if (field) {
      field.previousElementSibling.classList.add("active");
    }

    // Move floatCard to previous field
    floatCard.value.$el.style.top =
      field.previousElementSibling.offsetTop +
      field.previousElementSibling.parentNode.offsetTop +
      "px";
  }

  // Delete field
  form.value.fields[sectionIndex].child.splice(fieldIndex, 1);
};

const searchValidationRule = (sectionIndex, fieldIndex, rule) => {
  // Check if rule is already added
  const isRuleAdded = form.value.fields[sectionIndex].child[
    fieldIndex
  ].validation.rules.some((item) => item.type === rule.label);

  if (isRuleAdded) {
    return true;
  }

  return false;
};

const selectValidationRule = (sectionIndex, fieldIndex, rule) => {
  const existValidationRule = searchValidationRule(
    sectionIndex,
    fieldIndex,
    rule
  );

  if (existValidationRule) {
    // Remove rule
    form.value.fields[sectionIndex].child[fieldIndex].validation.rules =
      form.value.fields[sectionIndex].child[fieldIndex].validation.rules.filter(
        (item) => item.type !== rule.label
      );

    return;
  }

  // Search default message from label from formConfig
  const validationMessage = formConfig.global.validation.messages.find(
    (item) => item.label == rule.label
  );

  // Get field name and overwrite [[label_name]] with input label name
  let overwriteMessage = validationMessage.value.replace(
    "[[label_name]]",
    form.value.fields[sectionIndex].child[fieldIndex].label || ""
  );

  // If exist [[ or in between ]] for no, text or date overwrite it with rule.form value, they could be two variable. ensure to loop
  if (overwriteMessage.includes("[[") && overwriteMessage.includes("]]")) {
    const regex = /\[\[(.*?)\]\]/g;
    const matches = overwriteMessage.match(regex);

    matches.forEach((item, index) => {
      overwriteMessage = overwriteMessage.replace(item, rule.form[index].value);
    });
  }

  // Add new field
  form.value.fields[sectionIndex].child[fieldIndex].validation.rules.push({
    type: rule.label,
    value: rule.value,
    form: rule.form,
    message: overwriteMessage,
    defaultMessage: validationMessage.value,
  });

  console.log(form.value.fields[sectionIndex].child[fieldIndex].validation);
};

const addOptionField = (sectionIndex, fieldIndex, options) => {
  const optionIndex = options.length;

  // Add new field
  form.value.fields[sectionIndex].child[fieldIndex].options.push({
    label: `Option ${optionIndex + 1}`,
    value: optionIndex + 1,
  });
  refreshKey.value++;
};

const changeOptionValue = (sectionIndex, fieldIndex, optionIndex) => {
  const optionModel =
    form.value.fields[sectionIndex].child[fieldIndex].options[optionIndex];

  // Set model value
  optionModel.value = optionIndex + 1;
  refreshKey.value++;
};

const onBlurChangeOptionValue = (sectionIndex, fieldIndex, optionIndex) => {
  const optionModel =
    form.value.fields[sectionIndex].child[fieldIndex].options[optionIndex];

  if (optionModel.label.length != 0) {
    return;
  }

  // Set model value
  optionModel.label = "Option " + (optionIndex + 1);
  optionModel.value = optionIndex + 1;

  refreshKey.value++;
};

const removeFieldOptions = (sectionIndex, fieldIndex, optionIndex) => {
  // Delete field
  form.value.fields[sectionIndex].child[fieldIndex].options.splice(
    optionIndex,
    1
  );
  refreshKey.value++;
};

const assignValidationRuleModel = (
  sectionIndex,
  fieldIndex,
  fieldValidationIndex,
  fieldValidationValue
) => {
  let helpMessage = "";
  const fieldValidation =
    form.value.fields[sectionIndex].child[fieldIndex].validation.rules[
      fieldValidationIndex
    ];

  if (!fieldValidationValue) {
    fieldValidation.form[1].value = "";
    fieldValidation.form[1].help = "Add your own regex pattern";
    fieldValidation.form[1].disabled = false;
    return;
  }

  // Search helpMessage from formConfig
  formConfig.global.validation.rules.forEach((item) => {
    if (item.label == fieldValidation.type) {
      item.form[0].options.forEach((option) => {
        if (option.value == fieldValidation.form[0].value) {
          helpMessage = option.help;
        }
      });
    }
  });

  // Set model value to regex 2nd field
  fieldValidation.form[1].value = fieldValidationValue;
  fieldValidation.form[1].help = "Hint: " + helpMessage;
  fieldValidation.form[1].disabled = true;
};

const validateDateValue = (value) => {
  if (DateTime.fromISO(value).isValid)
    return DateTime.fromISO(value).toFormat("dd/MM/yyyy");
  return value;
};

const changeValidationMessage = (
  sectionIndex,
  fieldIndex,
  fieldValidationIndex,
  fieldFormVariable,
  fieldFormValue
) => {
  try {
    const fieldValidation =
      form.value.fields[sectionIndex].child[fieldIndex].validation.rules[
        fieldValidationIndex
      ];

    // Set model value to regex 2nd field
    let newMessage = fieldValidation.defaultMessage.replace(
      "[[label_name]]",
      form.value.fields[sectionIndex].child[fieldIndex].label || ""
    );

    // If exist [[ or in between ]] for no, text or date overwrite it with rule.form value, they could be two variable. ensure to loop
    if (newMessage.includes("[[") && newMessage.includes("]]")) {
      const regex = /\[\[(.*?)\]\]/g;
      const matches = newMessage.match(regex);

      // Match matches with fieldVariable
      matches.forEach((item, index) => {
        if (item == `[[${fieldFormVariable}]]`) {
          newMessage = newMessage.replace(
            item,
            validateDateValue(fieldFormValue)
          );
        } else {
          newMessage = newMessage.replace(
            item,
            validateDateValue(fieldValidation.form[index].value)
          );
        }
      });

      form.value.fields[sectionIndex].child[fieldIndex].validation.rules[
        fieldValidationIndex
      ].message = newMessage;
    }
  } catch (error) {
    console.log(error);
  }
};

watchDebounced(
  form.value,
  () => {
    if (mode == "view") return;
    useFetch("/api/devtool/form-builder/save", {
      method: "POST",
      body: {
        id: formId.value,
        form: form.value,
      },
    });
  },
  { debounce: 1000, maxWait: 5000 }
);

const redirectViewForm = () => {
  window.open("/form/" + encodedFormId("view"), "_blank");
};

// ------------------------------------------------
// ---------------  MODE = VIEW  ------------------
// ------------------------------------------------

const formModelValue = ref({});
const pageSection = ref({});

const formModel = () => {
  console.log(formModelValue.value);
};

const setValidationRules = (validationRules, type) => {
  // if type is label, set validationRules as n object
  if (type == "label" && validationRules) validationRules = [validationRules];

  if (validationRules && validationRules.length > 0) {
    let returnData = [];

    if (type == "message") returnData = {};

    // Loop validationRules to get rules and message for each type
    validationRules.forEach((rule) => {
      if (type == "rule") {
        switch (rule.type) {
          default:
            break;

          case "Required":
            if (rule.form[0].value == true) returnData.push(["required"]);
            break;

          case "Email":
            if (rule.form[0].value == true) returnData.push(["email"]);
            break;

          case "Length":
            returnData.push([
              "length",
              parseInt(rule.form[0].value),
              parseInt(rule.form[1].value),
            ]);
            break;

          case "Date After":
            returnData.push(["date_after", rule.form[0].value]);
            break;

          case "Date Before":
            returnData.push(["date_before", rule.form[0].value]);
            break;

          case "Date Between":
            returnData.push([
              "date_between",
              rule.form[0].value,
              rule.form[1].value,
            ]);
            break;

          case "Matches":
            returnData.push(["matches", rule.form[1].value]);
            break;
        }
      } else if (type == "message") {
        switch (rule.type) {
          default:
            break;

          case "Required":
            if (rule.message) returnData.required = rule.message;
            break;

          case "Email":
            if (rule.message) returnData.email = rule.message;
            break;

          case "Length":
            if (rule.message) returnData.length = rule.message;
            break;

          case "Date After":
            if (rule.message) returnData.date_after = rule.message;
            break;

          case "Date Before":
            if (rule.message) returnData.date_before = rule.message;
            break;

          case "Date Between":
            if (rule.message) returnData.date_between = rule.message;
            break;

          case "Matches":
            if (rule.message) returnData.matches = rule.message;
            break;
        }
      } else if (type == "label") {
        switch (rule.type) {
          default:
            returnData = false;
            break;

          case "Required":
            if (rule.form[0].value == true) returnData = "required";
            break;
        }
      }
    });

    return returnData;
  }
  return false;
};

const changePageSection = (type, sectionIndex) => {
  if (type == "next") {
    pageSection.value[`section${sectionIndex}`] = false;
    pageSection.value[`section${sectionIndex + 1}`] = true;
  } else {
    pageSection.value[`section${sectionIndex}`] = false;
    pageSection.value[`section${sectionIndex - 1}`] = true;
  }
};

async function submitForm() {
  console.log("asdasdas");
  try {
    console.log(formModelValue.value);

    const hitAPI = await useFetch(form.value.apiURL, {
      method: "POST",
      body: formModelValue.value,
    });

    if (hitAPI.value?.data) {
      $swal.fire({
        icon: "success",
        title: "Success",
        text: "Form submitted successfully",
      });
    } else {
      $swal.fire({
        icon: "error",
        title: "Error",
        text: "Form submitted failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  originURL.value = window.location.origin;

  if (mode.value == "view") {
    let counterField = 0;
    let counterSection = 0;
    // Append formModelValue with data1 increment by field.child inside form value. field is an array of object
    form.value.fields.forEach((section) => {
      section.child.forEach((field) => {
        counterField++;
        formModelValue.value[`data${counterField}`] = null;
      });

      pageSection.value[`section${counterSection}`] =
        counterSection == 0 ? true : false;
      counterSection++;
    });
  }
});
</script>

<template>
  <div>
    <div v-if="mode == 'edit'">
      <div
        class="form-header fixed top-0 right-0 z-20 bg-white dark:bg-slate-800 px-5 py-3 shadow-md shadow-slate-200 dark:shadow-slate-900 flex justify-between items-center w-full"
      >
        <div>
          <FormKit
            type="text"
            v-model="form.name"
            placeholder="Untitled Form"
            :classes="{
              inner: '!border-0  !rounded-none',
              input: '!text-xl',
              outer: '!mb-0',
            }"
          />
        </div>
        <div class="flex items-center">
          <Icon
            @click="showModalAddBanner = true"
            name="mdi:image-plus-outline"
            class="mr-4 hover:text-primary cursor-pointer"
          />

          <Icon
            name="material-symbols:add-link"
            class="mr-4 hover:text-primary cursor-pointer"
            @click="showModalAddUrl = true"
          />

          <Icon
            name="material-symbols:preview"
            class="mr-4 hover:text-primary cursor-pointer"
            @click="redirectViewForm"
          />

          <!-- <VDropdown :distance="20">
            <button>
              <Icon
                name="mdi:dots-vertical"
                class="mr-4 hover:text-primary cursor-pointer"
              />
            </button>

            <template #popper>
              <div class="my-2">
                <div
                  class="flex py-2 px-3 cursor-pointer hover:bg-gray-300"
                  @click=""
                >
                  <Icon name="tabler:file-import" class="mr-2" /> Import Form
                </div>
                <div
                  class="flex py-2 px-3 cursor-pointer hover:bg-gray-300"
                  @click=""
                >
                  <Icon name="tabler:file-export" class="mr-2" /> Export Form
                </div>
              </div>
            </template>
          </VDropdown> -->

          <rs-button @click="showModalForm = true"> Share </rs-button>
        </div>
      </div>

      <rs-modal
        title="Add Banner Image"
        v-model="showModalAddBanner"
        cancel-only
        cancel-title="Close"
      >
        <img
          :src="form.bannerImg"
          class="mb-4 object-cover h-[250px] mx-auto"
        />
        <FormKit id="bannerFile" type="file" @input="addBannerImage" />
      </rs-modal>

      <rs-modal
        title="API URL"
        v-model="showModalAddUrl"
        cancel-only
        cancel-title="Close"
      >
        <FormKit
          v-model="form.apiURL"
          type="text"
          label="API URL"
          help="Add your own API URL that will be used to submit the form."
        />
      </rs-modal>

      <rs-modal title="Send Form" v-model="showModalForm">
        <rs-tab variant="primary" type="default" fill>
          <rs-tab-item title="Editor">
            <FormKit
              type="text"
              :value="originURL + '/form/' + encodedFormId('edit')"
            />
          </rs-tab-item>
          <rs-tab-item title="Applicant">
            <FormKit
              type="text"
              :value="originURL + '/form/' + encodedFormId('view')"
            />
          </rs-tab-item>
        </rs-tab>
      </rs-modal>

      <!-- CONTAINER FORM BUILDER -->
      <div class="pt-22 max-w-[770px] mx-auto">
        <div class="relative md:grid md:grid-cols-12 gap-x-4">
          <rs-card class="md:col-span-11">
            <img
              :src="form.bannerImg"
              class="max-h-[195px] object-cover w-full rounded-lg"
            />
          </rs-card>
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
              >
                <div
                  class="flex justify-center items-center pt-2 mb-3"
                  draggable="true"
                  @dragstart="
                    startDragField($event, field, sectionIndex, fieldIndex)
                  "
                  @drop="dropDragField($event, sectionIndex, fieldIndex)"
                  @dragover.prevent
                  @dragenter.prevent
                >
                  <Icon
                    name="material-symbols:drag-indicator"
                    class="cursor-move text-gray-300 rotate-90"
                  />
                </div>
                <div draggable="false">
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
                  <div v-else>
                    <div class="grid grid-cols-12 gap-x-4">
                      <FormKit
                        v-if="field.type"
                        type="text"
                        v-model="field.label"
                        placeholder="Label"
                        :classes="{
                          inner: '!border-0 !rounded-none',
                          outer: 'col-span-7 !mb-0',
                          input: 'text-xl font-medium !p-0 !h-7',
                        }"
                      />

                      <FormKit
                        v-if="field.type"
                        :type="field.type"
                        v-model="field.modelValue"
                        :options="field.options"
                        :key="refreshKey"
                        :classes="{
                          outer: 'col-span-7 !mb-0',
                          fieldset: 'border-0 !p-0',
                          legend: '!font-semibold !text-sm mb-0',
                        }"
                        :input-class="{
                          '!h-10':
                            field.type != 'checkbox' &&
                            field.type != 'radio' &&
                            field.type != 'file',
                          'p-3': field.type == 'file',
                        }"
                        :disabled="true"
                      />

                      <FormKit
                        type="select"
                        v-model="field.selectValue"
                        :options="formSchema.inputs"
                        @change="
                          setTypeValue(
                            sectionIndex,
                            fieldIndex,
                            field.selectValue
                          )
                        "
                        :classes="{
                          outer: 'col-span-5 !mb-0',
                          input: '!h-10',
                        }"
                      />

                      <FormKit
                        v-if="field.type"
                        type="textarea"
                        v-model="field.help"
                        placeholder="This is a help text (Optional)"
                        auto-height
                        :classes="{
                          inner: '!border-0 !rounded-none',
                          outer: 'col-span-7 !mb-0',
                          input: 'text-base !text-gray-600 !p-0 !h-5',
                        }"
                      />
                    </div>

                    <div
                      v-if="
                        field.type == 'checkbox' ||
                        field.type == 'radio' ||
                        field.type == 'select'
                      "
                      class="mb-5 mt-2"
                    >
                      <div
                        v-for="(option, optionIndex) in field.options"
                        class="flex items-center"
                      >
                        <p class="min-w-[40px] flex justify-center">
                          {{ optionIndex + 1 }}.
                        </p>
                        <FormKit
                          type="text"
                          v-model="option.label"
                          @input="
                            changeOptionValue(
                              sectionIndex,
                              fieldIndex,
                              optionIndex
                            )
                          "
                          @blur="
                            onBlurChangeOptionValue(
                              sectionIndex,
                              fieldIndex,
                              optionIndex
                            )
                          "
                          :classes="{
                            outer: '!mb-0 w-full',
                            input: '!h-8',
                          }"
                        />
                        <Icon
                          v-if="field.options.length != 1"
                          name="material-symbols:close-rounded"
                          @click="
                            removeFieldOptions(
                              sectionIndex,
                              fieldIndex,
                              optionIndex
                            )
                          "
                          class="mx-5 hover:text-primary cursor-pointer"
                        />
                      </div>
                      <div class="flex justify-end mt-2">
                        <p
                          @click="
                            addOptionField(
                              sectionIndex,
                              fieldIndex,
                              field.options
                            )
                          "
                          class="text-primary hover:underline cursor-pointer"
                        >
                          Add option
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end items-center">
                    <rs-button
                      @click="
                        field.showAdvancedOptions
                          ? (field.showAdvancedOptions = false)
                          : (field.showAdvancedOptions = true)
                      "
                      size="sm"
                      class="mt-2"
                    >
                      Validation Rules
                      <Icon
                        name="ic:round-keyboard-arrow-down"
                        class="duration-300"
                        :class="{
                          'transform rotate-180': field.showAdvancedOptions,
                        }"
                      />
                    </rs-button>
                  </div>
                  <div v-auto-animate>
                    <div
                      v-if="field.showAdvancedOptions && field.type != 'title'"
                      class="mx-4"
                    >
                      <p class="text-lg font-medium">Rules</p>
                      <hr class="my-1" />
                      <div class="flex flex-wrap gap-4 mt-3 mb-5">
                        <rs-button
                          v-for="(rule, ruleIndex) in formConfig.global
                            .validation.rules"
                          variant="primary-outline"
                          :class="{
                            'bg-primary hover:!bg-primary text-white':
                              searchValidationRule(
                                sectionIndex,
                                fieldIndex,
                                rule
                              ),
                          }"
                          size="sm"
                          @click="
                            selectValidationRule(sectionIndex, fieldIndex, rule)
                          "
                        >
                          {{ rule.label }}
                        </rs-button>
                      </div>

                      <p class="text-lg font-medium">Validation</p>
                      <hr class="my-1" />
                      <div
                        v-for="(fieldValidation, fieldValidationIndex) in field
                          .validation.rules"
                        class="grid grid-cols-3 gap-4 my-4"
                      >
                        <FormKit
                          v-for="(
                            fieldForm, fieldFormIndex
                          ) in fieldValidation.form"
                          v-model="fieldForm.value"
                          @change="
                            fieldValidation.type == 'Matches'
                              ? assignValidationRuleModel(
                                  sectionIndex,
                                  fieldIndex,
                                  fieldValidationIndex,
                                  fieldForm.value
                                )
                              : changeValidationMessage(
                                  sectionIndex,
                                  fieldIndex,
                                  fieldValidationIndex,
                                  fieldForm.variable,
                                  $event
                                )
                          "
                          @input="
                            fieldValidation.type != 'Matches'
                              ? changeValidationMessage(
                                  sectionIndex,
                                  fieldIndex,
                                  fieldValidationIndex,
                                  fieldForm.variable,
                                  $event
                                )
                              : ''
                          "
                          :type="fieldForm.input"
                          :label="fieldForm.label"
                          :help="fieldForm.help"
                          :options="fieldForm.options ? fieldForm.options : []"
                          :classes="{
                            fieldset: 'border-0 !p-0',
                            legend: '!font-semibold !text-sm mb-0',
                            options: '!flex !flex-row gap-4 mt-3',
                          }"
                          :disabled="fieldForm.disabled"
                        />
                        <FormKit
                          type="textarea"
                          auto-height
                          label="Validation Message"
                          v-model="fieldValidation.message"
                        />
                      </div>
                    </div>
                  </div>

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
    </div>
    <div v-else-if="mode == 'view'">
      <div class="py-4 max-w-[770px] mx-auto">
        <div class="relative">
          <rs-card>
            <img
              :src="form.bannerImg"
              class="max-h-[195px] object-cover w-full rounded-lg"
            />
          </rs-card>

          <div>
            <FormKit type="form" :actions="false" @submit="submitForm">
              <div
                v-auto-animate
                v-for="(section, sectionIndex) in form.fields"
                class="rs-form-section"
                :class="{
                  active: sectionIndex == 0,
                }"
              >
                <div v-show="pageSection[`section${sectionIndex}`]">
                  <rs-card
                    class="p-5 border-primary border-t-8"
                    :class="{
                      active: sectionIndex == 0,
                    }"
                  >
                    <h4 class="!text-2xl font-semibold">{{ section.title }}</h4>
                    <p>{{ section.description }}</p>
                  </rs-card>
                  <rs-card
                    v-for="(field, fieldIndex) in section.child"
                    class="rs-form-field px-5 py-5"
                  >
                    <div v-if="field.type == 'title'">
                      <h4 class="!text-2xl font-semibold">{{ field.title }}</h4>
                      <p>{{ field.description }}</p>
                    </div>
                    <FormKit
                      v-else
                      v-model="
                        formModelValue[`data${sectionIndex + fieldIndex + 1}`]
                      "
                      :type="field.type"
                      :label="field.label"
                      :help="field.help"
                      :options="
                        field.type == 'checkbox' || field.type == 'radio'
                          ? field.options
                          : ''
                      "
                      :validation="
                        setValidationRules(field?.validation?.rules, 'rule')
                      "
                      validation-visibility="dirty"
                      :validation-messages="
                        setValidationRules(field?.validation?.rules, 'message')
                      "
                      :classes="{
                        outer: 'col-span-7 !mb-0',
                        fieldset: 'border-0 !p-0',
                        legend: '!font-medium !text-base !mb-2',
                        label: '!font-medium !text-base',
                      }"
                      :input-class="{
                        '!h-10':
                          field.type != 'checkbox' &&
                          field.type != 'radio' &&
                          field.type != 'file',
                        'p-3': field.type == 'file',
                      }"
                    >
                      <template
                        v-if="
                          setValidationRules(
                            field?.validation?.rules[fieldIndex],
                            'label'
                          ) &&
                          (field.type == 'checkbox' || field.type == 'radio')
                        "
                        #legend
                      >
                        <legend
                          class="formkit-legend !font-medium !text-base !mb-2"
                        >
                          Question B <span class="text-red-600">*</span>
                        </legend>
                      </template>
                      <template
                        v-else-if="
                          setValidationRules(
                            field?.validation?.rules[fieldIndex],
                            'label'
                          )
                        "
                        #label
                      >
                        <label
                          class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 formkit-invalid:text-red-500 dark:formkit-invalid:text-danger !font-medium !text-base"
                        >
                          {{ field.label }} <span class="text-red-600">*</span>
                        </label>
                      </template>
                    </FormKit>
                  </rs-card>
                  <div class="button-section flex flex-wrap gap-4 mb-3">
                    <button
                      v-if="sectionIndex != 0"
                      type="button"
                      class="w-fit rounded-lg flex justify-center items-center h-fit text-sm px-8 py-2.5 text-primary bg-transparent hover:bg-primary/10 border border-primary"
                      @click="changePageSection('back', sectionIndex)"
                    >
                      Back
                    </button>
                    <button
                      v-if="sectionIndex != form.fields.length - 1"
                      type="button"
                      class="w-fit rounded-lg flex justify-center items-center h-fit text-sm px-8 py-2.5 text-primary bg-transparent hover:bg-primary/10 border border-primary"
                      @click="changePageSection('next', sectionIndex)"
                    >
                      Next
                    </button>
                    <button
                      v-if="sectionIndex == form.fields.length - 1"
                      type="submit"
                      class="w-fit rounded-lg flex justify-center items-center h-fit text-sm px-8 py-2.5 text-white bg-primary hover:bg-primary/90"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-header {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.v-layout .form-header {
  width: calc(100% - 256px);
}

.v-layout.menu-hide .form-header {
  width: calc(100% - 0px);
}

.rs-form-section.active .section-badge {
  background-color: rgba(var(--color-primary));
  color: #ffffff;
}

.rs-form-field.active {
  border-left: 4px solid rgba(var(--color-primary)) !important;
}
</style>
