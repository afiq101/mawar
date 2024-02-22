<script setup>
definePageMeta({
  title: "Input Number",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <FormKit
          type="number"
          help="What temperature should the house be?"
          label="Temperature"
          value="25"
          step="1"
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
                &lt;FormKit type="number" label="Temperature" value="25" step="1"/&gt;
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
      <template #header> Number validation </template>
      <template #body>
        <FormKit
          type="number"
          help="The temperature should be between 20 - 50 degrees"
          label="Temperature"
          value="20"
          step="1"
          validation="between:20,50"
          validation-visibility="live"
        />

        <FormKit
          type="number"
          help="Minimum temperature should be 20 degrees"
          label="Temperature"
          value="20"
          step="1"
          validation="min:20"
          validation-visibility="live"
        />

        <FormKit
          type="number"
          help="Maximum temperature should be 50 degrees"
          label="Temperature"
          value="50"
          step="1"
          validation="max:50"
          validation-visibility="live"
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

                &lt;!-- Number between 20 - 50 validation --&gt;
                &lt;FormKit 
                  type="number" 
                  label="Temperature" 
                  value="20" 
                  step="1" 
                  validation="between:20,50" 
                  validation-visibility="live"
                /&gt;

                &lt;!-- Number minimum 20 --&gt;
                &lt;FormKit 
                  type="number" 
                  label="Temperature" 
                  value="20" 
                  step="1" 
                  validation="min:20" 
                  validation-visibility="live"
                /&gt;

                &lt;!-- Number maximum 50 --&gt;
                &lt;FormKit 
                  type="number" 
                  label="Temperature" 
                  value="50" 
                  step="1" 
                  validation="max:50" 
                  validation-visibility="live"
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
