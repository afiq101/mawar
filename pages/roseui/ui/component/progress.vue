<script setup>
definePageMeta({
  title: "Progress Bar",
});

const showCode1 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <p class="mb-4">
          Use the <code>rs-progress-bar</code> component to create a progress
          bar. There are props to change the color, size, max, show value, and
          value.
        </p>
        <rs-progress-bar
          label="Primary Progress"
          :value="11"
          :max="100"
          :variant="'primary'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Secondary Progress"
          :value="43"
          :max="100"
          :variant="'secondary'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Success Progress"
          :value="45"
          :max="100"
          :variant="'success'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Danger Progress"
          :value="90"
          :max="100"
          :variant="'danger'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Warning Progress"
          :value="36"
          :max="100"
          :variant="'warning'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
        <rs-progress-bar
          label="Info Progress"
          :value="25"
          :max="100"
          :variant="'info'"
          :size="'md'"
          :show-value="true"
        ></rs-progress-bar>
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
                &lt;rs-progress-bar 
                    label="Primary Progress"
                    :value="11"
                    :max="100"
                    variant="primary|secondary|success|danger|warning|info"
                    size="md|sm|lg"
                    :show-value="true|false"
                &gt;&lt;/rs-progress-bar&gt;
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
