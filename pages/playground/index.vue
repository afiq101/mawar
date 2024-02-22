<script setup>
const count = ref(0);
</script>

<template>
  <div>
    <h1>Playground</h1>
    <p>
      Here you can play around with the code and see the result in real time.
    </p>
    <div>
      <h2>Counter</h2>
      <rs-button @click="count++">Increment</rs-button>
      <p>Count: {{ count }}</p>
    </div>
  </div>
</template>
