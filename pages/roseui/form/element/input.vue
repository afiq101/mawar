<script setup>
definePageMeta({
  title: "Input",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const key = ref("jg9dsk23rnfsd");

const generateKey = () => {
  key.value = Math.random().toString(36).substring(2, 15);
};

const computedKey = computed(() => {
  return key.value;
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This template uses
          <a
            href="https://formkit.com"
            target="_blank"
            class="hover:underline text-primary"
            >Formkit</a
          >
          which is a powerfull form builder for Vue. It is a Vue component that
          allows you to create forms with a lot of different elements.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <template #header>Basic Input</template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-5">
          <FormKit type="text" label="Basic" />
          <FormKit
            type="text"
            label="Placeholder"
            placeholder="This is a placeholder"
          />
          <FormKit type="text" label="Helper Text" help="This is a help text" />
          <FormKit type="text" label="Disabled Input" disabled />

          <FormKit
            type="text"
            label="Readonly Input"
            value="Readonly"
            readonly
          />
        </div>
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
                &lt;!-- Basic Input --&gt;
                &lt;FormKit type="text" label="Basic"/&gt;

                &lt;!-- Placeholder Input --&gt;
                &lt;FormKit type="text" label="Placeholder" placeholder="This is a placeholder"/&gt;

                &lt;!-- Helper Input --&gt;
                &lt;FormKit type="text" label="Helper Text" help="This is a help text"/&gt;

                &lt;!-- Disabled Input --&gt;
                &lt;FormKit type="text" label="Disabled Text" disabled/&gt;

                &lt;!-- Readonly Input --&gt;
                &lt;FormKit type="text" label="Readonly Text" value="Readonly" readonly/&gt;
              &lt;/template&gt;

              &lt;script setup&gt;&lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card>
      <template #header>Type</template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <FormKit type="text" label="Basic" />
          <FormKit
            type="text"
            label="Without Border"
            :classes="{
              input: '!border-solid border-b',
              inner: 'border-none',
            }"
          />
        </div>
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
                &lt;!-- Basic Input --&gt;
                &lt;FormKit type="text" label="Basic"/&gt;

                &lt;!-- Without Border Input --&gt;
                &lt;FormKit 
                  type="text" 
                  label="Without Border"
                  :classes="{
                    input: '!border-solid border-b',
                    inner: 'border-none',
                  }"
                /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;&lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card>
      <template #header>Validation</template>
      <template #body>
        <p class="mb-4 text-justify">
          Formkit uses easy validation prop <code>validation</code> to validate
          its form element. You can use the following validation types:
          <code>required</code>, <code>email</code>, <code> url</code>,
          <code>number</code>, <code>minLength</code>, <code>maxLength</code>,
          <code>pattern</code> and others. This validation type can also be
          combine using <code>|</code>. Visit the
          <a
            href="
            https://formkit.com/essentials/validation"
            target="_blank"
            class="hover:underline text-primary"
            >Formkit documentation</a
          >
          for more information.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormKit
            type="text"
            label="Required"
            validation="required"
            validation-visibility="dirty"
          >
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >Required <span class="text-danger">*</span></label
              >
            </template>
          </FormKit>

          <FormKit
            type="text"
            label="Email"
            validation="email"
            validation-visibility="dirty"
          >
          </FormKit>
          <FormKit
            type="text"
            label="Url"
            validation="url"
            validation-visibility="dirty"
          >
          </FormKit>
          <FormKit
            type="text"
            label="Number between 0-100"
            validation="number|between:0,100"
            validation-visibility="dirty"
          >
          </FormKit>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode3 ? (showCode3 = false) : (showCode3 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode3" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;!-- Required Validation with Required Symbol --&gt;
                &lt;FormKit 
                  type="text" 
                  label="Required Validation"
                  validation="required"
                  validation-visibility="dirty"
                &gt;
                  &lt;template #label&gt;
                    &lt;label
                      class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                    &gt;
                      Required &lt;span class="text-danger"&gt;*&lt;/span&gt;
                    &gt;/label&gt;>
                  &lt;/template&gt;
                &lt;/FormKit&gt;

                &lt;!-- Email Validation --&gt;
                &lt;FormKit 
                  type="text" 
                  label="Email Validation"
                  validation="email"
                  validation-visibility="dirty"
                /&gt;

                &lt;!-- Url Validation --&gt;
                &lt;FormKit 
                  type="text" 
                  label="Url Validation"
                  validation="url"
                  validation-visibility="dirty"
                /&gt;

                &lt;!-- Number 0-100 Validation --&gt;
                &lt;FormKit 
                  type="text" 
                  label="Number Validation"
                  validation="number|between:0,100"
                  validation-visibility="dirty"
                /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;&lt;/script&gt;
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
