<script setup>
definePageMeta({
  title: "Table Basic",
});

const showCode1 = ref(false);

const field = ["Id", "Name", "Amount(RM)", "Discount(%)"];
const data = [
  {
    id: 1,
    fullName: "Margit, The Fallen Omen",
    age: 25,
    email: "margit25@gmail.com",
  },
  {
    id: 2,
    fullName: "Malenia",
    age: 50,
    email: "malenia@gmail.com",
  },
  {
    id: 3,
    fullName: "Godrick Soldier",
    age: 30,
    email: "godrick@gmail.com",
  },
  {
    id: 4,
    fullName: "Godwyn, The Graften",
    age: 70,
    email: "godwyn@gmail.com",
  },
  {
    id: 5,
    fullName: "Ranni",
    age: 26,
    email: "ranni@gmail.com",
  },
];
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
          This is a basic table template. It is a Vue component that allows you
          to create tables with a lot of different elements.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <template #header> Basic </template>
      <template #body>
        <rs-table
          :field="field"
          :data="data"
          :options="{
            variant: 'default',
            striped: true,
            borderless: true,
            hover: true,
            fixed: false,
          }"
          basic
        >
        </rs-table>
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
                &lt;rs-table
                :field="field"
                :data="data"
                :options="{
                  variant: 'default',
                  striped: true,
                  borderless: true,
                  hover: true,
                  fixed: false,
                }"
                basic
                &gt;
                &lt;/rs-table&gt;
              &lt;/template&gt;
   
              &lt;script setup&gt;
                const field = ["Id", "Name", "Amount(RM)", "Discount(%)"];
                const data = [
                  {
                    id: 1,
                    fullName: "Margit, The Fallen Omen",
                    age: 25,
                    email: "margit25@gmail.com",
                  },
                  {
                    id: 2,
                    fullName: "Malenia",
                    age: 50,
                    email: "malenia@gmail.com",
                  },
                  {
                    id: 3,
                    fullName: "Godrick Soldier",
                    age: 30,
                    email: "godrick@gmail.com",
                  },
                  {
                    id: 4,
                    fullName: "Godwyn, The Graften",
                    age: 70,
                    email: "godwyn@gmail.com",
                  },
                  {
                    id: 5,
                    fullName: "Ranni",
                    age: 26,
                    email: "ranni@gmail.com",
                  },
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
