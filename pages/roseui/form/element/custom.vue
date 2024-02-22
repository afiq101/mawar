<script setup>
definePageMeta({
  title: "Custom Input",
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
      <template #header> One-Time Password </template>
      <template #body>
        <FormKit
          type="otp"
          label="One-Time Password"
          help="We've sent code to your phone number"
          digits="6"
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
                  type="otp"
                  label="One-Time Password"
                  help="We've sent code to your phone number"
                  digits="6"
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
      <template #header> Dropzone</template>
      <template #body>
        <FormKit
          type="dropzone"
          label="Documents"
          help="Select as many documents as you would like."
          multiple="true"
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
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit
                  type="dropzone"
                  label="Documents"
                  help="Select as many documents as you would like."
                  multiple="true"
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
      <template #header> Range</template>
      <template #body>
        <FormKit
          type="range"
          label="Volume"
          min="0"
          max="11"
          help="Select your volume level."
        />
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
                &lt;FormKit
                  type="range"
                  label="Volume"
                  min="0"
                  max="11"
                  help="Select your volume level."
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
      <template #header> Color</template>
      <template #body>
        <FormKit
          type="color"
          value="#FB7185"
          label="Select a color"
          help="Select your favorite color."
        />
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
                &lt;FormKit
                  type="color"
                  value="#FB7185"
                  label="Select a color"
                  help="Select your favorite color."
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
