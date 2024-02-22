<script setup>
definePageMeta({
  title: "Input Select",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);

const options = [
  "Malaysia",
  "Singapore",
  "Thailand",
  "Indonesia",
  "Brunei",
  "Laos",
  "Cambodia",
  "Myanmar",
  "Philippines",
  "Vietnam",
  "Timor-Leste",
];
const options2 = [
  { label: "Malaysia", value: "my", attrs: { disabled: true } },
  { label: "Singapore", value: "sg", attrs: { disabled: true } },
  { label: "Thailand", value: "th", attrs: { disabled: true } },
  { label: "Indonesia", value: "id", attrs: { disabled: true } },
  { label: "Brunei", value: "b", attrs: { disabled: true } },
  { label: "Laos", value: "ls", attrs: { disabled: true } },
  { label: "Cambodia", value: "cb", attrs: { disabled: true } },
  { label: "Japan", value: "jp" },
  { label: "Myanmar", value: "mm", attrs: { disabled: true } },
];
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Single Select </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country is the biggest?"
          :options="options"
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
                  type="select"
                  label="Which country is the biggest?"
                  :options="options"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                const options = [
                  "Malaysia",
                  "Singapore",
                  "Thailand",
                  "Indonesia",
                  "Brunei",
                  "Laos",
                  "Cambodia",
                  "Myanmar",
                  "Philippines",
                  "Vietnam",
                  "Timor-Leste",
                ];
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card>
      <template #header> Multiple Select </template>
      <template #body>
        <FormKit
          type="select"
          multiple
          label="Select all the country that you like?"
          help="Select all that apply by holding command (macOS) or control (PC)."
          :options="options"
          input-class="h-full"
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
                  type="select"
                  multiple
                  label="Select all the country that you like?"
                  help="Select all that apply by holding command (macOS) or control (PC)."
                  :options="options"
                  input-class="h-full"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                const options = [
                  "Malaysia",
                  "Singapore",
                  "Thailand",
                  "Indonesia",
                  "Brunei",
                  "Laos",
                  "Cambodia",
                  "Myanmar",
                  "Philippines",
                  "Vietnam",
                  "Timor-Leste",
                ];
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card>
      <template #header> Disabled Select Item </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country you want to visit?"
          :options="options2"
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
                  type="select"
                  label="Which country you want to visit?"
                  :options="options"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                const options = [
                  { label: "Malaysia", value: "my" },
                  { label: "Singapore", value: "sg", attrs: { disabled: true } },
                  { label: "Thailand", value: "th", attrs: { disabled: true } },
                  { label: "Indonesia", value: "id", attrs: { disabled: true } },
                  { label: "Brunei", value: "b", attrs: { disabled: true } },
                  { label: "Laos", value: "ls", attrs: { disabled: true } },
                  { label: "Cambodia", value: "cb", attrs: { disabled: true } },
                  { label: "Japan", value: "jp" },
                  { label: "Myanmar", value: "mm", attrs: { disabled: true } },
                ];
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>
    <rs-card>
      <template #header> Validation </template>
      <template #body>
        <FormKit
          type="select"
          label="Which country is the biggest?"
          placeholder="Select a country"
          :options="options"
          validation="required|is:Indonesia"
          validation-visibility="dirty"
          :validation-messages="{
            is: 'Nope! Indonesia is the largest country in the list.',
          }"
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
                  type="select"
                  label="Which country is the biggest?"
                  placeholder="Select a country"
                  :options="options"
                  validation="required|is:Indonesia"
                  validation-visibility="dirty"
                  :validation-messages="{
                    is: 'Nope! Indonesia is the largest country in the list.',
                  }"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                const options = [
                  "Malaysia",
                  "Singapore",
                  "Thailand",
                  "Indonesia",
                  "Brunei",
                  "Laos",
                  "Cambodia",
                  "Myanmar",
                  "Philippines",
                  "Vietnam",
                  "Timor-Leste",
                ];
              &lt;/script&gt;
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
