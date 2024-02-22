<script setup>
definePageMeta({
  title: "Nuxt Icon",
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
        This library include around 100,000 icons from iconify. Here shows the
        list of
        <a
          href="https://icones.js.org/"
          class="underline text-primary"
          target="_blank"
          >icon sets</a
        >
        that you can use.
      </template>
    </rs-card>

    <rs-card>
      <template #header>
        <div class="flex">How to use?</div>
      </template>
      <template #body>
        it is simple to use, just add the icon name in the name attribute. For
        example, to use the icon from the icon set
        <Icon name="ic:outline-info" />, you can use the following code:
        <div v-highlight>
          <pre class="language-html shadow-none">
          <code class="language-html">
            &lt;Icon name="ic:outline-info"&gt;&lt;/Icon&gt;
          </code>
        </pre>
        </div>
      </template>
    </rs-card>
  </div>
</template>
