<script setup>
definePageMeta({
  title: "File",
});

const showCode1 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body
        ><FormKit
          type="file"
          label="Documents"
          accept=".pdf,.doc,.docx,.xml,.md,.csv"
          help="Select as many documents as you would like."
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
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit
                  type="file"
                  label="Documents"
                  accept=".pdf,.doc,.docx,.xml,.md,.csv"
                  help="Select as many documents as you would like."
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
