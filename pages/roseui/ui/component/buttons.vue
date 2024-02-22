<script setup>
definePageMeta({
  title: "Buttons",
});
const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <p class="mb-4">Use the <code>rs-button</code> to show badges.</p>
        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-button> Button </rs-button>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg my-2"
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
                &lt;rs-button&gt;Button&lt;/rs-button&gt;
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
          Button variant uses props <code>variant</code> to change the color of
          the button. There are 6 variants: <code>primary</code>,
          <code>info</code>, <code>success</code>, <code>warning</code> and
          <code>danger</code>.
        </p>

        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-button variant="primary"> Primary </rs-button>
          <rs-button variant="info"> Info </rs-button>
          <rs-button variant="success"> Success </rs-button>
          <rs-button variant="warning"> Warning </rs-button>
          <rs-button variant="danger"> Danger </rs-button>
        </div>

        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg my-2"
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
                &lt;rs-button variant="primary"&gt;Primary&lt;/rs-button&gt;
                &lt;rs-button variant="info"&gt;Info&lt;/rs-button&gt;
                &lt;rs-button variant="success"&gt;Success&lt;/rs-button&gt;
                &lt;rs-button variant="warning"&gt;Warning&lt;/rs-button&gt;
                &lt;rs-button variant="danger"&gt;Danger&lt;/rs-button&gt;
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
          Button variant type uses props <code>variant</code> to change the
          shape of the button. There are 3 variant types: <code>fill</code>,
          <code>outline</code> and <code>text</code>. <code>fill</code> is the
          default. <code>outline</code> is used to create a button with a
          border. <code>text</code> is used to create a button with no border
          and no background.
        </p>

        <!-- Fill Button -->
        <div class="my-6">
          <div
            class="font-semibold text-lg bg-[rgb(var(--bg-1))] w-full mb-4 pl-2"
          >
            Fill
          </div>
          <div class="flex flex-wrap items-center justify-start gap-x-6">
            <rs-button type="fill" variant="primary"> Primary </rs-button>
            <rs-button type="fill" variant="info"> Info </rs-button>
            <rs-button type="fill" variant="success"> Success </rs-button>
            <rs-button type="fill" variant="warning"> Warning </rs-button>
            <rs-button type="fill" variant="danger"> Danger </rs-button>
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
            <rs-button variant="primary-outline"> Primary </rs-button>
            <rs-button variant="info-outline"> Info </rs-button>
            <rs-button variant="success-outline"> Success </rs-button>
            <rs-button variant="warning-outline"> Warning </rs-button>
            <rs-button variant="danger-outline"> Danger </rs-button>
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
            <rs-button variant="primary-text"> Primary </rs-button>
            <rs-button variant="info-text"> Info </rs-button>
            <rs-button variant="success-text"> Success </rs-button>
            <rs-button variant="warning-text"> Warning </rs-button>
            <rs-button variant="danger-text"> Danger </rs-button>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg my-2"
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
                &lt;!-- Fill Button --&gt;
                &lt;rs-button variant="primary"&gt;Primary&lt;/rs-button&gt;
                &lt;rs-button variant="info"&gt;Info&lt;/rs-button&gt;
                &lt;rs-button variant="success"&gt;Success&lt;/rs-button&gt;
                &lt;rs-button variant="warning"&gt;Warning&lt;/rs-button&gt;
                &lt;rs-button variant="danger"&gt;Danger&lt;/rs-button&gt;

                &lt;!-- Outline Button --&gt;
                &lt;rs-button variant="primary-outline"&gt;Primary&lt;/rs-button&gt;
                &lt;rs-button variant="info-outline"&gt;Info&lt;/rs-button&gt;
                &lt;rs-button variant="success-outline"&gt;Success&lt;/rs-button&gt;
                &lt;rs-button variant="warning-outline"&gt;Warning&lt;/rs-button&gt;
                &lt;rs-button variant="danger-outline"&gt;Danger&lt;/rs-button&gt;

                &lt;!-- Text Button --&gt;
                &lt;rs-button variant="primary-text"&gt;Primary&lt;/rs-button&gt;
                &lt;rs-button variant="info-text"&gt;Info&lt;/rs-button&gt;
                &lt;rs-button variant="success-text"&gt;Success&lt;/rs-button&gt;
                &lt;rs-button variant="warning-text"&gt;Warning&lt;/rs-button&gt;
                &lt;rs-button variant="danger-text"&gt;Danger&lt;/rs-button&gt;
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
          Button size uses props <code>size</code> to change the size of button.
          There are 3 sizes: <code>small</code>, <code>medium</code> and
          <code>large</code>.
        </p>

        <div class="flex flex-wrap items-center justify-start gap-x-6">
          <rs-button size="sm"> Small </rs-button>
          <rs-button size="md"> Medium </rs-button>
          <rs-button size="lg"> Large </rs-button>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg my-2"
            @click="showCode4 ? (showCode4 = false) : (showCode4 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div v-show="showCode4" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-button size="sm"&gt;Small&lt;/rs-button&gt;
                &lt;rs-button size="md"&gt;Medium&lt;/rs-button&gt;
                &lt;rs-button size="lg"&gt;Large&lt;/rs-button&gt;
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
