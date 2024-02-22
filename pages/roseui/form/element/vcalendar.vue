<script setup>
import { DateTime } from "luxon";
definePageMeta({
  title: "VCalendar",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);

const date = ref(DateTime.now());
const range = ref({
  start: DateTime.local(2022, 6, 6),
  end: DateTime.local(2022, 6, 20),
});
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
          This template use
          <a
            href="https://vcalendar.io/"
            target="_blank"
            class="hover:underline text-primary"
            >V-Calendar</a
          >
          which is a Vue component that allows you to create a calendar.
        </p>
      </template>
    </rs-card>
    <rs-card>
      <template #header> Single Date </template>
      <template #body>
        <p class="mb-4">
          Single date calendar is a calendar that only allows you to select a
          single date. It is a good way to select a date for a datepicker.
        </p>
        <div class="flex flex-col justify-center items-center">
          <v-date-picker v-model="date" />

          <p class="py-2">
            <span class="font-semibold">Date:</span>
            {{ date }}
          </p>
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
                &lt;div class="flex flex-col justify-center items-center"&gt;
                  &lt;v-date-picker v-model="date" /&gt;
                &lt;/div&gt;
              &lt;/template&gt;
    
              &lt;script setup&gt;
                import { DateTime } from "luxon";
    
                const date = ref(DateTime.now());
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
      <template #header> Date Range </template>
      <template #body>
        <p class="mb-4">
          Date range calendar is a calendar that allows you to select a date
          range.
        </p>
        <div class="flex flex-col justify-center items-center">
          <v-date-picker v-model="range" is-range />
          <p class="py-2">
            <span class="font-semibold">Date:</span>
            {{ range }}
          </p>
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
                &lt;div class="flex flex-col justify-center items-center"&gt;
                  &lt;v-date-picker v-model="range" is-range /&gt;
                &lt;/div&gt;
              &lt;/template&gt;
    
              &lt;script setup&gt;
                import { DateTime } from "luxon";
    
                const range = ref({
                  start: DateTime.local(2022, 6, 6),
                  end: DateTime.local(2022, 6, 20),
                });
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
      <template #header> Date & Time </template>
      <template #body>
        <p class="mb-4">
          Date & time calendar is a calendar that allows you to select a date
          and time.
        </p>
        <div class="flex flex-col justify-center items-center">
          <v-date-picker v-model="date" mode="dateTime" />
          <p class="py-2">
            <span class="font-semibold">Date:</span>
            {{ date }}
          </p>
        </div>
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
                &lt;div class="flex flex-col justify-center items-center"&gt;
                  &lt;v-date-picker v-model="date" mode="dateTime" /&gt;
                &lt;/div&gt;
              &lt;/template&gt;
    
              &lt;script setup&gt;
                import { DateTime } from "luxon";
    
                const date = ref(DateTime.now());
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
