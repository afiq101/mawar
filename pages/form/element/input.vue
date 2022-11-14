<script setup>
definePageMeta({
  title: "Input",
});

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
            class="hover:underline text-primary-400"
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
            class="hover:underline text-primary-400"
            >Formkit documentation</a
          >
          for more information.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormKit type="text" label="Required" validation="?required">
            <template #label>
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >Required <span class="text-danger">*</span></label
              >
            </template>
          </FormKit>

          <FormKit type="text" label="Email" validation="email"> </FormKit>
          <FormKit type="text" label="Url" validation="url"> </FormKit>
        </div>
      </template>
    </rs-card>
  </div>
</template>
