<script setup>
const changedata = ref(false);
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
const data2 = [
  {
    no: 1,
    item: "Table",
    price: "RM20",
    discount: "10%",
  },
  {
    no: 2,
    item: "Chair",
    price: "RM10",
    discount: "20%",
  },
  {
    no: 3,
    item: "Lamp",
    price: "RM30",
    discount: "30%",
  },
  {
    no: 4,
    item: "Bed",
    price: "RM50",
    discount: "40%",
  },
];
</script>

<template>
  <div>
    <rs-card>
      <template #header> Table</template>
      <template #body>
        <rs-button
          @click="changedata ? (changedata = false) : (changedata = true)"
          class="mb-4"
        >
          Change data
        </rs-button>
        <rs-table
          :field="!changedata ? [] : field"
          :data="!changedata ? data : data2"
          :options="{
            variant: 'default',
            striped: true,
            bordered: true,
            borderless: true,
            hover: true,
            fixed: false,
          }"
          basic
        >
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
