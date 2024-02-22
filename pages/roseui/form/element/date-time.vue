<script setup>
import { DateTime } from "luxon";

definePageMeta({
  title: "Date Time",
});

const showCode1 = ref(false);
const showCode2 = ref(false);

const dt = DateTime.now();

const date = dt.toISODate();
const datetime = dt.toFormat("yyyy-MM-dd'T'HH:mm");
const month = dt.toFormat("yyyy-MM");
const time = dt.toFormat("HH:mm");
const week = dt.toFormat("yyyy-'W'kk");
const dateStart = dt.plus({ days: -7 }).toFormat("yyyy-MM-dd");
const dateEnd = dt.plus({ days: 7 }).toFormat("yyyy-MM-dd");
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <FormKit type="datetime-local" :value="datetime" label="Datetime" />
        <FormKit type="date" :value="date" label="Date Only" />
        <FormKit type="month" :value="month" label="Month Only" />
        <FormKit type="time" :value="time" label="Time Only" />
        <FormKit type="week" :value="week" label="Week Only" />
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
                &lt;!-- Date Time --&gt;
                &lt;FormKit type="datetime-local" :value="datetime" label="Datetime" /&gt;

                &lt;!-- Date Only --&gt;
                &lt;FormKit type="date" :value="date" label="Date Only" /&gt;

                &lt;!-- Month Only --&gt;
                &lt;FormKit type="month" :value="month" label="Month Only" /&gt;

                &lt;!-- Time Only --&gt;
                &lt;FormKit type="time" :value="time" label="Time Only" /&gt;

                &lt;!-- Week Only --&gt;
                &lt;FormKit type="week" :value="week" label="Week Only" /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                import { DateTime } from "luxon";
  
                const dt = DateTime.now();
  
                const date = dt.toISODate();
                const datetime = dt.toFormat("yyyy-MM-dd'T'HH:mm");
                const month = dt.toFormat("yyyy-MM");
                const time = dt.toFormat("HH:mm");
                const week = dt.toFormat("yyyy-'W'kk");
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
          type="date"
          label="Date"
          help="Enter date (the date must be after 2020)"
          validation="date_after:2020-12-31"
          validation-visibility="live"
        />
        <FormKit
          type="date"
          label="Date"
          help="Enter date (the date must be before 2020)"
          validation="date_before:2020-01-01"
          validation-visibility="live"
        />
        <FormKit
          type="date"
          label="Date"
          help="Enter date (the date must be between 6/6/2022 and 20/6/2022)"
          :validation="[['date_between', dateStart, dateEnd]]"
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
                &lt;!-- Date After --&gt;
                &lt;FormKit
                  type="date"
                  label="Date"
                  help="Enter date (the date must be after 2020)"
                  validation="date_after:2020-12-31"
                  validation-visibility="live"
                /&gt;

                &lt;!-- Date Before --&gt;
                &lt;FormKit
                  type="date"
                  label="Date"
                  help="Enter date (the date must be before 2020)"
                  validation="date_before:2020-01-01"
                  validation-visibility="live"
                /&gt;

                &lt;!-- Date Between --&gt;
                &lt;FormKit
                  type="date"
                  label="Date"
                  help="Enter date (the date must be between 6/6/2022 and 20/6/2022)"
                  :validation="[['date_between', dateStart, dateEnd]]"
                  validation-visibility="live"
                /&gt;
              &lt;/template&gt;
  
              &lt;script setup&gt;
                import { DateTime } from "luxon";
  
                const dt = DateTime.now();
  
                const dateStart = dt.plus({ days: -7 }).toFormat("yyyy-MM-dd");
                const dateEnd = dt.plus({ days: 7 }).toFormat("yyyy-MM-dd");
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
