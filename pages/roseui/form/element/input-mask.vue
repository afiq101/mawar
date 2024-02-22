<script setup>
definePageMeta({
  title: "Input Mask",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This template uses
          <a
            href="https://beholdr.github.io/maska/#/"
            target="_blank"
            class="hover:underline text-primary"
            >Maska</a
          >
          which is a powerfull input mask for Vue. It is a Vue component that
          allows you to create forms with a lot of different elements.
        </p>
      </template>
    </rs-card>
    <rs-card>
      <template #header> Mask </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <FormKit
            type="mask"
            label="Phone with 012-34567890"
            mask="###-########"
          />
          <FormKit type="mask" label="Date with MM/DD/YYYY" mask="##/##/####" />
          <FormKit
            type="mask"
            label="Credit / Debit Card"
            mask="#### #### #### ####"
          />
          <FormKit
            type="mask"
            label="Identity Card (IC)"
            mask="######-##-####"
          />
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
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;!-- Phone with 012-34567890 --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Phone with 012-34567890"
                  mask="###-########"
                /&gt;

                &lt;!-- Date with MM/DD/YYYY --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Date with MM/DD/YYYY"
                  mask="##/##/####"
                /&gt;

                &lt;!-- Credit / Debit Card --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Credit / Debit Card"
                  mask="#### #### #### ####"
                /&gt;

                &lt;!-- Identity Card (IC) --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Identity Card (IC)"
                  mask="######-##-####"
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
      <template #header> Advanced </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <!-- Mask Only A-Z -->
          <FormKit
            type="mask"
            label="Mask Letter A-F"
            mask="@@@@@@@"
            :maskOptions="{ tokens: '@:[a-fA-F]' }"
          />

          <!-- Mask Only 0-9 -->
          <FormKit
            type="mask"
            label="Mask Digit 1-5"
            mask="########"
            :maskOptions="{ tokens: '#:[1-5]' }"
          />

          <!-- Mask Only 0-9 and A-Z -->
          <FormKit
            type="mask"
            label="Mask 4 Letter A-Z and 6 Digit 0-9"
            mask="@@@@@ ######"
            :maskOptions="{ tokens: '@:[a-zA-Z]|#:[0-9]' }"
          />

          <FormKit
            type="mask"
            label="ATM Cash Withdrawal"
            mask="#,###,###.##"
            :maskOptions="{ reversed: true, eager: true }"
          />
        </div>
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
                &lt;!-- Mask Only A-Z --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Mask Letter A-F"
                  mask="@@@@@@@"
                  :maskOptions="{ tokens: '@:[a-fA-F]' }"
                /&gt;

                &lt;!-- Mask Only 0-9 --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Mask Digit 1-5"
                  mask="########"
                  :maskOptions="{ tokens: '#:[1-5]' }"
                /&gt;

                &lt;!-- Mask Only 0-9 and A-Z --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="Mask 4 Letter A-Z and 6 Digit 0-9"
                  mask="@@@@@ ######"
                  :maskOptions="{ tokens: '@:[a-zA-Z]|#:[0-9]' }"
                /&gt;

                &lt;!-- ATM Cash Withdrawal --&gt;
                &lt;FormKit 
                  type="mask" 
                  label="ATM Cash Withdrawal"
                  mask="#,###,###.##"
                  :maskOptions="{ reversed: true , eager: true }"
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
