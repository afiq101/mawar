<script setup>
import { ref } from "vue";

// Dummy data
const totalIncome = 120000.5; // Total income in one year
const balanceIncome = 80000.75; // Balance income this year
const monthlySpending = 2000.3; // Every spending monthly
const totalBalance = 50000.45; // Total balance to date

const topSpending = ref([
  {
    id: 1,
    category: "Rent",
    amount: 1500,
    date: "2023-01-05",
    description: "Monthly Rent",
  },
  {
    id: 2,
    category: "Groceries",
    amount: 300,
    date: "2023-01-10",
    description: "Weekly Groceries",
  },
  {
    id: 3,
    category: "Utilities",
    amount: 200,
    date: "2023-01-15",
    description: "Electricity Bill",
  },
  {
    id: 4,
    category: "Transportation",
    amount: 100,
    date: "2023-01-20",
    description: "Gasoline",
  },
  {
    id: 5,
    category: "Dining",
    amount: 150,
    date: "2023-01-25",
    description: "Dinner Out",
  },
  {
    id: 6,
    category: "Entertainment",
    amount: 120,
    date: "2023-02-01",
    description: "Movie Night",
  },
  {
    id: 7,
    category: "Healthcare",
    amount: 80,
    date: "2023-02-05",
    description: "Doctor Visit",
  },
  {
    id: 8,
    category: "Insurance",
    amount: 90,
    date: "2023-02-10",
    description: "Car Insurance",
  },
  {
    id: 9,
    category: "Savings",
    amount: 400,
    date: "2023-02-15",
    description: "Monthly Savings",
  },
  {
    id: 10,
    category: "Miscellaneous",
    amount: 60,
    date: "2023-02-20",
    description: "Miscellaneous Expenses",
  },
]);

definePageMeta({
  title: "Monthly Expense",
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(value);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Card 1: Total Income in One Year -->
      <rs-card
        class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
      >
        <header class="text-lg font-semibold mb-2">
          Total Income in One Year
        </header>
        <main class="text-2xl font-bold">
          {{ formatCurrency(totalIncome) }}
        </main>
      </rs-card>

      <!-- Card 2: Balance Income This Year -->
      <rs-card
        class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
      >
        <header class="text-lg font-semibold mb-2">
          Balance Income This Year
        </header>
        <main class="text-2xl font-bold">
          {{ formatCurrency(balanceIncome) }}
        </main>
      </rs-card>

      <!-- Card 3: Every Spending Monthly -->
      <rs-card
        class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
      >
        <header class="text-lg font-semibold mb-2">
          Every Spending Monthly
        </header>
        <main class="text-2xl font-bold">
          {{ formatCurrency(monthlySpending) }}
        </main>
      </rs-card>

      <!-- Card 4: Total Balance to Date -->
      <rs-card
        class="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
      >
        <header class="text-lg font-semibold mb-2">
          Total Balance to Date
        </header>
        <main class="text-2xl font-bold">
          {{ formatCurrency(totalBalance) }}
        </main>
      </rs-card>
    </div>

    <!-- Top 10 Spending Table -->
    <rs-card class="bg-white p-4 shadow-md rounded-lg mt-8">
      <header class="text-lg font-semibold mb-4">Top 10 Spending</header>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 text-left">Category</th>
              <th class="py-2 px-4 text-left">Amount</th>
              <th class="py-2 px-4 text-left">Date</th>
              <th class="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in topSpending" :key="item.id" class="border-t">
              <td class="py-2 px-4">{{ item.category }}</td>
              <td class="py-2 px-4">{{ formatCurrency(item.amount) }}</td>
              <td class="py-2 px-4">{{ item.date }}</td>
              <td class="py-2 px-4">{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </rs-card>
  </div>
</template>

<style scoped>
/* Additional styling if necessary */
</style>
