<script setup>
definePageMeta({
  title: "Input Textarea",
});

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
        <FormKit
          type="textarea"
          placeholder="This is a placeholder"
          label="Textarea"
        />
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
              <NuxtScrollbar style="height: 200px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit type="textarea" placeholder="This is a placeholder" label="Textarea"/&gt;
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
      <template #header> Increase Row </template>
      <template #body>
        <p class="mb-4">
          Textarea can be increase row by using <code>rows</code> prop.
        </p>
        <FormKit
          type="textarea"
          placeholder="This is a placeholder"
          rows="8"
          label="Textarea"
        />
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
              <NuxtScrollbar style="height: 200px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit type="textarea" placeholder="This is a placeholder" rows="8" label="Textarea"/&gt;
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
      <template #header>Resize</template>
      <template #body>
        <p class="mb-4">
          Textarea resize can be disable using tailwind class.
          <code>resize-none</code>
        </p>
        <FormKit type="textarea" label="Textarea" input-class="resize-none" />
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
              <NuxtScrollbar style="height: 200px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit type="textarea" label="Textarea" input-class="resize-none"/&gt;
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
