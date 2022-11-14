<script setup>
definePageMeta({
  title: "Input Group",
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
      <template #header>Prefix</template>
      <template #body>
        <!-- Prefix with button text -->
        <FormKit type="text" label="Text" placeholder="1.00">
          <template #prefix> <div class="p-3">RM</div> </template>
        </FormKit>

        <!-- Prefix with button text -->
        <FormKit type="text" placeholder="1.00">
          <template #prefix>
            <div class="bg-slate-100 dark:bg-slate-700 h-full rounded-l-md p-3">
              RM
            </div>
          </template>
        </FormKit>

        <!-- Prefix Icon -->
        <FormKit type="text" label="Icon" placeholder="Icon">
          <template #prefix>
            <Icon class="px-2" name="ic:outline-info"></Icon>
          </template>
        </FormKit>

        <!-- Prefix with button text -->
        <FormKit
          type="text"
          label="Button"
          v-model="computedKey"
          placeholder="Button"
        >
          <template #prefix>
            <button
              class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-900 h-full rounded-l-md p-3 flex justify-center items-center"
              @click="generateKey"
            >
              <Icon name="ic:round-refresh" size="19"></Icon>
            </button>
          </template>
        </FormKit>
      </template>
    </rs-card>

    <rs-card>
      <template #header>Suffix</template>
      <template #body>
        <!-- Prefix with button text -->
        <FormKit type="text" label="Text" placeholder="10.00">
          <template #suffix> <div class="p-3">Kg</div> </template>
        </FormKit>

        <!-- Prefix with button text -->
        <FormKit type="text" placeholder="1.00">
          <template #suffix>
            <div class="bg-slate-100 dark:bg-slate-700 h-full rounded-r-md p-3">
              Kg
            </div>
          </template>
        </FormKit>

        <!-- Prefix Icon -->
        <FormKit type="text" label="Icon" placeholder="Icon">
          <template #suffix>
            <Icon class="px-2" name="ic:outline-info"></Icon>
          </template>
        </FormKit>

        <!-- Prefix with button text -->
        <FormKit
          type="text"
          label="Button"
          v-model="computedKey"
          placeholder="Button"
        >
          <template #suffix>
            <button
              class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-900 h-full rounded-r-md p-3 flex justify-center items-center"
              @click="generateKey"
            >
              <Icon name="ic:round-refresh" size="19"></Icon>
            </button>
          </template>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>
