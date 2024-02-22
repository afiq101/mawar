<script setup>
definePageMeta({
  title: "Dropdown",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);
const showCode5 = ref(false);
const dropdownItems = [
  {
    label: "Item 1 - Application",
    route: { name: "dashboard" },
  },
  {
    label: "Item 2 - Dashboard",
    route: { name: "dashboard" },
  },
  {
    label: "Item 3 - Items",
    route: { name: "dashboard" },
  },
];
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default Dropdown </template>
      <template #body>
        <p class="mb-2">Use the <code>rs-dropdown</code> to show alert.</p>
        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-dropdown title="Default" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>

          <rs-dropdown title="Divider" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item divider> Option 1 </rs-dropdown-item>
          </rs-dropdown>
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
                &lt;rs-dropdown title="Default"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Default"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item divider&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
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
      <template #header> Variant </template>
      <template #body>
        <p class="mb-4">
          Dropdown variant uses props <code>variant</code> to change the color
          of the button. There are 6 variants: <code>primary</code>,
          <code>info</code>, <code>success</code>, <code>warning</code> and
          <code>danger</code>.
        </p>
        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-dropdown title="Primary" variant="primary" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Info" variant="info" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Success" variant="success" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Warning" variant="warning" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Danger" variant="danger" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
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
                &lt;rs-dropdown title="Primary" variant="primary"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Info" variant="info"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;                
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Success" variant="success"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Warning" variant="warning"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Danger" variant="danger"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
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
      <template #header> Variant Type </template>
      <template #body>
        <p class="mb-4">
          Dropdown variant uses props <code>variant</code> to change the color
          of the button. There are 6 variants: <code>primary</code>,
          <code>info</code>, <code>success</code>, <code>warning</code> and
          <code>danger</code>.
        </p>

        <!-- Fill Button -->
        <div class="my-6">
          <div
            class="font-semibold text-lg bg-[rgb(var(--bg-1))] w-full mb-4 pl-2"
          >
            Fill
          </div>
          <div class="flex flex-wrap items-center justify-start gap-x-6">
            <rs-dropdown title="Primary" variant="primary" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Info" variant="info" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Success" variant="success" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Warning" variant="warning" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Danger" variant="danger" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
          </div>
        </div>

        <!-- Outline Button -->
        <div class="my-6">
          <div
            class="font-semibold text-lg bg-[rgb(var(--bg-1))] w-full mb-4 pl-2"
          >
            Outline
          </div>
          <div class="flex flex-wrap items-center justify-start gap-x-6">
            <rs-dropdown title="Primary" variant="primary-outline" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Info" variant="info-outline" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Success" variant="success-outline" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Warning" variant="warning-outline" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Danger" variant="danger-outline" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
          </div>
        </div>

        <!-- Text Button -->
        <div class="my-6">
          <div
            class="font-semibold text-lg bg-[rgb(var(--bg-1))] w-full mb-4 pl-2"
          >
            Text
          </div>
          <div class="flex flex-wrap items-center justify-start gap-x-6">
            <rs-dropdown title="Primary" variant="primary-text" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Info" variant="info-text" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Success" variant="success-text" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Warning" variant="warning-text" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
            <rs-dropdown title="Danger" variant="danger-text" class="mb-2">
              <rs-dropdown-item> Option 1 </rs-dropdown-item>
              <rs-dropdown-item> Option 2 </rs-dropdown-item>
              <rs-dropdown-item> Option 3 </rs-dropdown-item>
            </rs-dropdown>
          </div>
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
                &lt;!-- Fill Dropdown --&gt;
                &lt;rs-dropdown title="Primary" variant="primary"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Info" variant="info"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Success" variant="success"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Warning" variant="warning"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Danger" variant="danger"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;

                &lt;!-- Outline Dropdown --&gt;
                &lt;rs-dropdown title="Primary" variant="primary-outline"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Info" variant="info-outline"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Success" variant="success-outline"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Warning" variant="warning-outline"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Danger" variant="danger-outline"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;

                &lt;!-- Text Dropdown --&gt;
                &lt;rs-dropdown title="Primary" variant="primary-text"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Info" variant="info-text"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Success" variant="success-text"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Warning" variant="warning-text"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Danger" variant="danger-text"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
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
      <template #header> Position </template>
      <template #body>
        <p class="mb-4">
          Dropdown position uses props <code>position</code> to change the
          position of dropdown item. There are 4 positions: <code>top</code>,
          <code>bottom</code>, <code>left</code> and <code>right</code>.
        </p>
        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-dropdown title="Bottom" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Top" position="top" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Left" position="left" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Right" position="right" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode4 ? (showCode4 = false) : (showCode4 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode4" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-dropdown title="Bottom"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Top" position="top"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Left" position="left"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Right" position="right"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
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
      <template #header> Size </template>
      <template #body>
        <p class="mb-4">
          Dropdown size uses props <code>size</code> to change the size of
          dropdown button. There are 3 sizes: <code>small</code>,
          <code>medium</code> and <code>large</code>.
        </p>
        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-dropdown title="Small" size="sm" class="mb-2">
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Medium" size="md" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 2 </rs-dropdown-item>
          </rs-dropdown>
          <rs-dropdown title="Large" size="lg" class="mb-2">
            <rs-dropdown-item> Option 1 </rs-dropdown-item>
            <rs-dropdown-item> Option 3 </rs-dropdown-item>
          </rs-dropdown>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode5 ? (showCode5 = false) : (showCode5 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode5" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-dropdown title="Small" size="sm"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Medium"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
                &lt;rs-dropdown title="Large" size="lg"&gt;
                  &lt;rs-dropdown-item&gt; Option 1 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 2 &lt;/rs-dropdown-item&gt;
                  &lt;rs-dropdown-item&gt; Option 3 &lt;/rs-dropdown-item&gt;
                &lt;/rs-dropdown&gt;
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
