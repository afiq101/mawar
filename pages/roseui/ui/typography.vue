<script setup>
definePageMeta({
  title: "Typography",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <h5>Heading</h5>
      </template>
      <template #body>
        <p class="mb-4 pb-4">
          All HTML headers are supported, from &lt;h1&gt; to &lt;h6&gt;
        </p>
        <div class="grid grid-cols-10 justify-between gap-y-2">
          <div class="col-span-5 p-2 bg-[rgb(var(--bg-1))] text-left pl-4">
            <h5 class="font-normal">Example</h5>
          </div>
          <div class="col-span-5 p-2 bg-[rgb(var(--bg-1))] text-right pr-4">
            <h5 class="font-normal">Element Tag</h5>
          </div>
          <h1 class="ml-2 col-span-7">Header h1</h1>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h1&gt;</span>
          </code>
          <h2 class="ml-2 col-span-7">Header h2</h2>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h2&gt;</span>
          </code>
          <h3 class="ml-2 col-span-7">Header h3</h3>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h3&gt;</span>
          </code>
          <h4 class="ml-2 col-span-7">Header h4</h4>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h4&gt;</span>
          </code>
          <h5 class="ml-2 col-span-7">Header h5</h5>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h5&gt;</span>
          </code>
          <h6 class="ml-2 col-span-7">Header h6</h6>
          <code class="text-right mr-2 col-span-3">
            <span class="w-full bg-[rgb(var(--bg-1))]">&lt;h6&gt;</span>
          </code>
        </div>
      </template>
    </rs-card>
    <rs-card>
      <template #header>
        <h5>Font Weight</h5>
      </template>
      <template #body>
        <p class="mb-4">
          We use <span class="text-cyan-500">tailwind</span> pre-defined class
          to change font weight of different element.
        </p>
        <div class="grid grid-cols-2 justify-between gap-y-2">
          <div class="py-1 bg-[rgb(var(--bg-1))] text-center">
            <h5 class="font-normal">Example</h5>
          </div>
          <div class="py-1 bg-[rgb(var(--bg-1))] text-center">
            <h5 class="font-normal">Class</h5>
          </div>
          <span class="font-light ml-2">This is the heading.</span>
          <code class="text-right mr-2">
            <span class="w-full bg-[rgb(var(--bg-1))]">font-light</span>
          </code>
          <span class="font-normal ml-2">This is the heading.</span>
          <code class="text-right mr-2">
            <span class="w-full bg-[rgb(var(--bg-1))]"
              >font-normal</span
            >
          </code>
          <span class="font-medium ml-2">This is the heading.</span>
          <code class="text-right mr-2">
            <span class="w-full bg-[rgb(var(--bg-1))]"
              >font-medium</span
            >
          </code>
          <span class="font-semibold ml-2">This is the heading.</span>
          <code class="text-right mr-2">
            <span class="w-full bg-[rgb(var(--bg-1))]"
              >font-semibold</span
            >
          </code>
          <span class="font-bold ml-2">This is the heading.</span>
          <code class="text-right mr-2">
            <span class="w-full bg-[rgb(var(--bg-1))]">font-bold</span>
          </code>
        </div>
      </template>
    </rs-card>
  </div>
</template>
