<script setup>
definePageMeta({
  title: "Wizard Form",
});

const showCode1 = ref(false);
const showCode2 = ref(false);

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
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode1 ? (showCode1 = false) : (showCode1 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode1" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;rs-wizard
                  type="top"
                  :steps="stepNames"
                  :form-submit="submit"
                  :form-action="true"
                  :form-step-required="true"
                  :form-step-back="true"
                  :form-navigate="true"
                  :form-error-counter="false"
                &gt;
                  &lt;template #contactinfo&gt;
                    &lt;FormKit
                      type="text"
                      label="*First name"
                      help="Please enter your first name"
                      validation="required"
                      validation-visibility="dirty"
                    /&gt;
                  &lt;/template&gt;
                  &lt;template #organizationinfo&gt;
                    &lt;FormKit
                      type="text"
                      label="Organization name"
                      validation="required"
                      validation-visibility="dirty"
                    /&gt;
                  &lt;/template&gt;
                &lt;/rs-wizard&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
                const stepNames = ["Contact Info", "Organization Info", "Application"];

                function submit() {
                  alert("Form submitted");
                }
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
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
          </template>
        </rs-wizard>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode2 ? (showCode2 = false) : (showCode2 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode2" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;rs-wizard
                  type="left"
                  :steps="stepNames2"
                  :form-submit="submit"
                  :form-action="true"
                  :form-step-required="true"
                  :form-step-back="true"
                  :form-navigate="false"
                  :form-error-counter="false"
                &gt;
                  &lt;template #contact&gt;
                    &lt;FormKit
                      type="text"
                      label="*First name"
                      help="Please enter your first name"
                      validation="required"
                      validation-visibility="dirty"
                    /&gt;
                    &lt;FormKit
                      type="text"
                      label="*First name"
                      help="Please enter your first name"
                      validation="required"
                      validation-visibility="dirty"
                    /&gt;
                    &lt;FormKit
                      type="text"
                      label="*First name"
                      help="Please enter your first name"
                      validation="required"
                      validation-visibility="dirty"
                    /&gt;
                  &lt;/template&gt;
                  &lt;template #organization&gt;
                    &lt;FormKit type="text" label="Organization name" /&gt;
                  &lt;/template&gt;
                &lt;/rs-wizard&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
                const stepNames2 = ["Contact", "Organization", "Application"];

                function submit() {
                  alert("Form submitted");
                }
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>
