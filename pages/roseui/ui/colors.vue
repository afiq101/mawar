<script setup>
definePageMeta({
  title: "Colors",
});
const defaultColor = {
  primary: ["bg-primary", "text-white"],
  secondary: ["bg-secondary", "text-white"],
  info: ["bg-info", "text-white"],
  success: ["bg-success", "text-white"],
  warning: ["bg-warning", "text-white"],
  danger: ["bg-danger", "text-white"],
  light: ["bg-light"],
  dark: ["bg-dark", "text-white"],
};

const color = {
  slate: [
    "bg-slate-50",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900	",
  ],
  gray: [
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
  ],
  zinc: [
    "bg-zinc-50",
    "bg-zinc-100",
    "bg-zinc-200",
    "bg-zinc-300",
    "bg-zinc-400",
    "bg-zinc-500",
    "bg-zinc-600",
    "bg-zinc-700",
    "bg-zinc-800",
    "bg-zinc-900",
  ],
  neutral: [
    "bg-neutral-50",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-neutral-800",
    "bg-neutral-900",
  ],
  stone: [
    "bg-stone-50",
    "bg-stone-100",
    "bg-stone-200",
    "bg-stone-300",
    "bg-stone-400",
    "bg-stone-500",
    "bg-stone-600",
    "bg-stone-700",
    "bg-stone-800",
    "bg-stone-900",
  ],
  red: [
    "bg-red-50",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
  ],
  orange: [
    "bg-orange-50",
    "bg-orange-100",
    "bg-orange-200",
    "bg-orange-300",
    "bg-orange-300",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-orange-800",
    "bg-orange-900",
  ],
  yellow: [
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
  ],
  green: [
    "bg-green-50",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-300",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ],
  teal: [
    "bg-teal-50",
    "bg-teal-100",
    "bg-teal-200",
    "bg-teal-300",
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
    "bg-teal-700",
    "bg-teal-800",
    "bg-teal-900",
  ],
  blue: [
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-300",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
  ],
  indigo: [
    "bg-indigo-50",
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-indigo-800",
    "bg-indigo-900",
  ],
  purple: [
    "bg-purple-50",
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-purple-800",
    "bg-purple-900",
  ],
  pink: [
    "bg-pink-50",
    "bg-pink-100",
    "bg-pink-200",
    "bg-pink-300",
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
    "bg-pink-700",
    "bg-pink-800",
    "bg-pink-900",
  ],
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default Color </template>
      <template #body>
        <p class="mb-4">
          This template also have a series of default color such as:
        </p>
        <ul class="list-disc list-inside mb-4">
          <li>Primary</li>
          <li>Secondary</li>
          <li>Info</li>
          <li>Success</li>
          <li>Warning</li>
          <li>Danger</li>
          <li>Light</li>
          <li>Dark</li>
        </ul>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div
            class=""
            v-for="(color, key, index) in defaultColor"
            :key="index"
          >
            <div
              class="h-10 w-full rounded-lg flex justify-center items-center font-medium"
              :class="`${color[0]} ${color[1]}`"
            >
              {{ `bg-${key}` }}
            </div>
          </div>
        </div>
      </template>
    </rs-card>
    <rs-card>
      <template #header>
        <h5>Tailwind Color</h5>
      </template>
      <template #body>
        <p class="mb-4">Below is the list of tailwind 3 color.</p>
        <div class="grid grid-cols-1 gap-6">
          <div
            class="flex justify-center items-center"
            v-for="(colorArr, key, index) in color"
            :key="index"
          >
            <div class="text-sm flex-shrink-0 w-10 md:w-16 capitalize">
              {{ key }}
            </div>
            <div class="flex-1 ml-4 grid grid-cols-5 md:grid-cols-10 gap-4">
              <div class="" v-for="(value, index) in colorArr" :key="index">
                <div
                  class="h-10 w-full rounded-lg text-center"
                  :class="value"
                ></div>
                <span class="flex justify-center items-center font-medium">{{
                  value.split("-")[2]
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </rs-card>
    <rs-card>
      <template #header>
        <h5>How to use it?</h5>
      </template>
      <template #body>
        <p class="mb-4">
          This ui template primarily uses the tailwind default colour. This
          color can be used for background, text, border, and more.
        </p>
        <client-only>
          <table class="w-full text-center mb-4">
            <tr class="bg-[rgb(var(--bg-1))] text-lg">
              <th class="p-2">Category</th>
              <th class="p-2">Suffix</th>
            </tr>
            <tr>
              <td class="py-2 px-6">Background</td>
              <td class="py-2 px-6"><code> bg-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Text</td>
              <td class="py-2 px-6"><code> text-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Border</td>
              <td class="py-2 px-6"><code> border-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Box Shadow</td>
              <td class="py-2 px-6"><code> shadow-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Ring</td>
              <td class="py-2 px-6"><code> ring-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Caret</td>
              <td class="py-2 px-6"><code> caret-{color}-{range}</code></td>
            </tr>
            <tr>
              <td class="py-2 px-6">Divide</td>
              <td class="py-2 px-6"><code> divide-{color}-{range}</code></td>
            </tr>
          </table>
        </client-only>
      </template>
    </rs-card>
  </div>
</template>
