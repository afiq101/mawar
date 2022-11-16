<script setup>
import data from "./data.js";
</script>

<template>
  <div>
    <rs-card>
      <template #header> Table</template>
      <template #body>
        <rs-table
          :data="data"
          :options-advanced="{
            sortable: true,
            responsive: true,
          }"
          advanced
        >
          <template v-slot:firstName="data">
            <div class="text-blue-500">{{ data.text }}</div>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
