<script setup>
definePageMeta({
  title: "Collapse",
});

const type = ref("default");
const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <p class="mb-2">
          Use the <code>rs-collapse</code> to show collapse.
          <code>rs-collapse-item</code> is used to show collapse item.
        </p>
        <rs-collapse>
          <rs-collapse-item title="Collapse Item 1">
            <p class="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </rs-collapse-item>
          <rs-collapse-item title="Collapse Item 2">
            <p>Collapse Item 1 content</p>
          </rs-collapse-item>
        </rs-collapse>
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
            <div v-show="showCode1" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-collapse&gt;
                  &lt;rs-collapse-item title="Collapse Item 1"&gt;Collapse Item 1 content&lt;/rs-collapse-item&gt;
                  &lt;rs-collapse-item title="Collapse Item 2"&gt;Collapse Item 2 content&lt;/rs-collapse-item&gt;
                &lt;/rs-collapse&gt;

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
      <template #header> Accordion </template>
      <template #body>
        <p class="mb-2">
          Use the
          <code>accordion</code> prop to <code>rs-collapse</code> to make it
          accordion.
        </p>
        <rs-collapse accordion>
          <rs-collapse-item title="Accordion Item 1">
            <p class="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </rs-collapse-item>
          <rs-collapse-item title="Accordion Item 2">
            <p>Collapse Item 1 content</p>
          </rs-collapse-item>
        </rs-collapse>
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
            <div v-show="showCode2" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-collapse accordion&gt;
                  &lt;rs-collapse-item title="Collapse Item 1"&gt;Collapse Item 1 content&lt;/rs-collapse-item&gt;
                  &lt;rs-collapse-item title="Collapse Item 2"&gt;Collapse Item 2 content&lt;/rs-collapse-item&gt;
                &lt;/rs-collapse&gt;

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
      <template #header> Type </template>
      <template #body>
        <p class="mb-2">
          Use the
          <code>type</code> prop to <code>rs-collapse</code> to make it
          accordion. The type can be <code>default</code>,
          <code>border</code> and <code>card</code>.
        </p>
        <FormKit
          v-model="type"
          type="radio"
          label="Type"
          :options="[
            { label: 'Default', value: 'default' },
            { label: 'Border', value: 'border' },
            { label: 'Card', value: 'card' },
          ]"
        />
        <rs-collapse :type="type">
          <rs-collapse-item title="Collapse Item 1">
            <p class="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </rs-collapse-item>
          <rs-collapse-item title="Collapse Item 2">
            <p>Collapse Item 2 content</p>
          </rs-collapse-item>
          <rs-collapse-item title="Collapse Item 3">
            <p>Collapse Item 13 content</p>
          </rs-collapse-item>
        </rs-collapse>
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
            <div v-show="showCode3" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;!-- Default Styling('default') --&gt;
                &lt;rs-collapse&gt;
                  &lt;rs-collapse-item title="Collapse Item 1"&gt;Collapse Item 1 content&lt;/rs-collapse-item&gt;
                  &lt;rs-collapse-item title="Collapse Item 2"&gt;Collapse Item 2 content&lt;/rs-collapse-item&gt;
                &lt;/rs-collapse&gt;

                &lt;!-- Default Styling('border') --&gt;
                &lt;rs-collapse type="border"&gt;
                  &lt;rs-collapse-item title="Collapse Item 1"&gt;Collapse Item 1 content&lt;/rs-collapse-item&gt;
                  &lt;rs-collapse-item title="Collapse Item 2"&gt;Collapse Item 2 content&lt;/rs-collapse-item&gt;
                &lt;/rs-collapse&gt;

                &lt;!-- Default Styling('card') --&gt;
                &lt;rs-collapse type="card"&gt;
                  &lt;rs-collapse-item title="Collapse Item 1"&gt;Collapse Item 1 content&lt;/rs-collapse-item&gt;
                  &lt;rs-collapse-item title="Collapse Item 2"&gt;Collapse Item 2 content&lt;/rs-collapse-item&gt;
                &lt;/rs-collapse&gt;
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
