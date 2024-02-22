<script setup>
definePageMeta({
  title: "Badges",
});
const showCode = ref(false);
const showCode2 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <h5>Default Badges</h5>
      </template>
      <template #body>
        <p class="mb-2">Use the <code>rs-badge</code> to show badges.</p>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4 gap-y-0">
          <rs-badge variant="primary" class="mb-4"> Primary </rs-badge>
          <rs-badge variant="info" class="mb-4"> Info </rs-badge>
          <rs-badge variant="success" class="mb-4"> Success </rs-badge>
          <rs-badge variant="warning" class="mb-4"> Warning </rs-badge>
          <rs-badge variant="danger" class="mb-4"> Danger </rs-badge>
        </div>
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode ? (showCode = false) : (showCode = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div v-show="showCode" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-badge variant="primary"&gt;Primary&lt;/rs-badge&gt;
                &lt;rs-badge variant="info"&gt;Info&lt;/rs-badge&gt;
                &lt;rs-badge variant="success"&gt;Success&lt;/rs-badge&gt;
                &lt;rs-badge variant="warning"&gt;Warning&lt;/rs-badge&gt;
                &lt;rs-badge variant="danger"&gt;Danger&lt;/rs-badge&gt;
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
    <!-- Badges with icon -->
    <rs-card>
      <template #header>
        <h5>Badges With Icon</h5>
      </template>
      <template #body>
        <p class="mb-2">
          Include props <code>icon</code> to <code>rs-badge</code> to show
          badges.
        </p>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4 gap-y-0">
          <rs-badge variant="primary" icon="material-symbols:star-outline-rounded" class="mb-4">
            Primary
          </rs-badge>
          <rs-badge variant="info" icon="material-symbols:star-outline-rounded" class="mb-4"> Info </rs-badge>
          <rs-badge variant="success" icon="material-symbols:star-outline-rounded" class="mb-4">
            Success
          </rs-badge>
          <rs-badge variant="warning" icon="material-symbols:star-outline-rounded" class="mb-4">
            Warning
          </rs-badge>
          <rs-badge variant="danger" icon="material-symbols:star-outline-rounded" class="mb-4">
            Danger
          </rs-badge>
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
            <div v-show="showCode2" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;rs-badge variant="primary" icon="material-symbols:star-outline-rounded"&gt;Primary&lt;/rs-badge&gt;
                &lt;rs-badge variant="info" icon="material-symbols:star-outline-rounded"&gt;Info&lt;/rs-badge&gt;
                &lt;rs-badge variant="success" icon="material-symbols:star-outline-rounded"&gt;Success&lt;/rs-badge&gt;
                &lt;rs-badge variant="warning" icon="material-symbols:star-outline-rounded"&gt;Warning&lt;/rs-badge&gt;
                &lt;rs-badge variant="danger" icon="material-symbols:star-outline-rounded"&gt;Danger&lt;/rs-badge&gt;
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
