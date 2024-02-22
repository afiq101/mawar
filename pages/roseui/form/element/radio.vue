<script setup>
definePageMeta({
  title: "Input Radio",
});

const showCode1 = ref(false);
const showCode2 = ref(false);

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
      <template #header> Default </template>
      <template #body>
        <FormKit
          type="radio"
          label="Cars"
          help="What is your favourite car?"
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
                  type="radio"
                  label="Cars"
                  help="What is your favourite car?"
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
      <template #header> Disabled Radio Item </template>
      <template #body>
        <FormKit
          type="radio"
          label="Movies"
          help="What is your favourite movie?"
          :options="options2"
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
                  type="radio"
                  label="Movies"
                  help="What is your favourite movie?"
                  :options="options2"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
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
