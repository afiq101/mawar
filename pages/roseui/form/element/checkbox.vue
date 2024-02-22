<script setup>
definePageMeta({
  title: "Input Checkbox",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);

const options = ["Audi", "Mazda", "Proton", "Perodua", "BMW", "Mercedes"];
const options2 = [
  { label: "Shawshank redemption", value: "shawshank" },
  { label: "The Godfather", value: "godfather" },
  {
    label: "Casablanca (too old)",
    value: "casablanca",
    attrs: { disabled: true },
  },
  { label: "The Lord of the Rings", value: "lotr" },
  { label: "Saving Private Ryan", value: "saving-ryan" },
];
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Single Checkbox </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Terms and Conditions"
          help="Do you agree to our terms of service?"
          name="terms"
          validation="accepted"
          validation-visibility="dirty"
          input-class="icon-check"
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
                  type="checkbox"
                  label="Terms and Conditions"
                  help="Do you agree to our terms of service?"
                  name="terms"
                  validation="accepted"
                  validation-visibility="dirty"
                  input-class="icon-check"
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
      <template #header> Multiple Checkbox </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Cars"
          help="Select your favourite cars?"
          :options="options"
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
                  type="checkbox"
                  label="Cars"
                  help="Select your favourite cars?"
                  :options="options"
                /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
                const options = ["Audi", "Mazda", "Proton", "Perodua", "BMW", "Mercedes"];
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
      <template #header> Disabled Checkbox Item </template>
      <template #body>
        <FormKit
          type="checkbox"
          label="Movies"
          help="What is your favourite movie?"
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
                  type="checkbox"
                  label="Movies"
                  help="What is your favourite movie?"
                  :options="options"
                /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
                const options = [
                  { label: "Shawshank redemption", value: "shawshank" },
                  { label: "The Godfather", value: "godfather" },
                  {
                    label: "Casablanca (too old)",
                    value: "casablanca",
                    attrs: { disabled: true },
                  },
                  { label: "The Lord of the Rings", value: "lotr" },
                  { label: "Saving Private Ryan", value: "saving-ryan" },
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
          type="checkbox"
          label="Cars"
          help="Please select at least 3 cars?"
          :options="options"
          validation="required|min:3"
          validation-visibility="dirty"
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
                  type="checkbox"
                  label="Cars"
                  help="Please select at least 3 cars?"
                  :options="options"
                  validation="required|min:3"
                  validation-visibility="dirty"
                /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
                const options = ["Audi", "Mazda", "Proton", "Perodua", "BMW", "Mercedes"];
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
