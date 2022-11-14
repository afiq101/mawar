<script setup>
definePageMeta({
  title: "Wizard Form",
});

const step = ref("contactInfo");
const stepNames = ["Contact Info", "Organization Info", "Application"];
const stepNames2 = ["Contact", "Organization", "Application"];

function submit() {
  alert("Form submitted");
}
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Top Step </template>
      <template #body>
        <rs-wizard
          type="top"
          :steps="stepNames"
          :form-submit="submit"
          :form-action="true"
          :form-step-required="true"
          :form-step-back="true"
          :form-navigate="true"
          :form-error-counter="false"
        >
          <template #contactinfo>
            <FormKit
              type="text"
              label="*First name"
              help="Please enter your first name"
              validation="required"
              validation-visibility="dirty"
            />
          </template>
          <template #organizationinfo>
            <FormKit
              type="text"
              label="Organization name"
              validation="required"
              validation-visibility="dirty"
            />
          </template>
        </rs-wizard>
      </template>
    </rs-card>

    <rs-card>
      <template #header> Left Step </template>
      <template #body>
        <rs-wizard
          type="left"
          :steps="stepNames2"
          :form-submit="submit"
          :form-action="true"
          :form-step-required="true"
          :form-step-back="true"
          :form-navigate="false"
          :form-error-counter="false"
        >
          <template #contact>
            <FormKit
              type="text"
              label="*First name"
              help="Please enter your first name"
              validation="required"
              validation-visibility="dirty"
            />
            <FormKit
              type="text"
              label="*First name"
              help="Please enter your first name"
              validation="required"
              validation-visibility="dirty"
            />
            <FormKit
              type="text"
              label="*First name"
              help="Please enter your first name"
              validation="required"
              validation-visibility="dirty"
            />
          </template>
          <template #organization>
            <FormKit type="text" label="Organization name" />
          </template> </rs-wizard
      ></template>
    </rs-card>
  </div>
</template>
