<script setup>
definePageMeta({
  title: "VueQuill",
});

const showCode1 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Info </template>
      <template #body>
        <p class="text-justify mb-4">
          <a
            href="https://vueup.github.io/vue-quill/"
            target="_blank"
            class="hover:underline text-primary"
            >VueQuill</a
          >
          is a WYSIWYG editor that can be used to create content in a visual
          manner. It is a fully-featured editor that can be used to create
          content in a visual manner. VueQuill is a Component for building rich
          text editors, powered by Vue 3 and Quill.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <template #header> How to use? </template>
      <template #body>
        <p class="mb-4">
          There are editor configuration options that can be used to customize
          the editor. For example, you can set the editor language, the editor
          theme, the editor toolbar, the editor plugins, etc. The editor
          configuration options are available in the editor configuration
          object. see this link for more information:
          <a
            href="https://vueup.github.io/vue-quill/guide/"
            target="_blank"
            class="hover:underline text-primary"
            >https://vueup.github.io/vue-quill/guide/</a
          >
        </p>

        <div class="mb-4">
          <label
            for="country"
            class="text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm"
            >Advanced List</label
          >
          <ClientOnly>
            <QuillEditor theme="snow"> </QuillEditor>
          </ClientOnly>
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
              <NuxtScrollbar style="height: 250px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;QuillEditor theme="snow"&gt; &lt;/QuillEditor&gt;
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
