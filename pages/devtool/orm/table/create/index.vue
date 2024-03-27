<script setup>
definePageMeta({
  title: "Database Create Table",
  middleware: ["auth"],
  requiresAuth: true,
});

const tableData = ref([]);
const dataTypeList = ref([]);

const { data: dbConfiguration } = await useFetch(
  "/api/devtool/orm/table/create/config"
);

if (dbConfiguration.value.statusCode === 200) {
  let tempObject = {};

  dbConfiguration.value.data.tableField.forEach((field) => {
    tempObject[field] = "";
  });

  tableData.value.push(tempObject);

  dataTypeList.value = dbConfiguration.value.data.dataTypes;
}

const submitCreateTable = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <rs-card class="p-5">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 mb-5"
      >
        <div>
          <h5 class="font-semibold">Create Table</h5>
          <span class="text-sm text-gray-500">
            Create a new table in the database.
          </span>
        </div>

        <rs-button @click="submitCreateTable" class="mb-4"> Save </rs-button>
      </div>

      <FormKit type="form" :actions="false" @submit="submitCreateTable">
        <FormKit
          type="text"
          label="Table name"
          placeholder="Enter table name"
          :classes="{ outer: 'mb-8' }"
        />

        <rs-table
          v-if="tableData && tableData.length > 0"
          :data="tableData"
          :key="tableData"
        >
          <template v-slot:columnName="data">
            <FormKit
              :classes="{
                outer: 'mb-0',
              }"
              type="text"
              placeholder="Enter column name"
            />
          </template>
          <template v-slot:type="data">
            <FormKit
              v-if="dataTypeList && dataTypeList.length > 0"
              :classes="{ outer: 'mb-0' }"
              type="select"
              :options="dataTypeList"
            />
          </template>
          <template v-slot:length="data">
            <FormKit
              :classes="{ outer: 'mb-0' }"
              type="number"
              placeholder="Enter length"
            />
          </template>
          <template v-slot:default="data">
            <FormKit
              :classes="{ outer: 'mb-0', wrapper: 'mb-0 justify-center' }"
              type="checkbox"
            />
          </template>
          <template v-slot:nullable="data">
            <FormKit
              :classes="{ outer: 'mb-0', wrapper: 'mb-0 justify-center' }"
              type="checkbox"
            />
          </template>
          <template v-slot:autoIncrement="data">
            <FormKit
              :classes="{ outer: 'mb-0', wrapper: 'mb-0 justify-center' }"
              type="radio"
            />
          </template>
          <template v-slot:actions="data">
            <div class="flex justify-center items-center gap-1">
              <rs-button type="button" class="p-1 w-6 h-6">
                <Icon name="ph:plus" />
              </rs-button>

              <rs-button type="button" class="p-1 w-6 h-6">
                <Icon name="ph:arrow-up" />
              </rs-button>
              <rs-button type="button" class="p-1 w-6 h-6">
                <Icon name="ph:arrow-down" />
              </rs-button>
              <rs-button type="button" class="p-1 w-6 h-6" variant="danger">
                <Icon name="ph:x" />
              </rs-button>
            </div>
          </template>
        </rs-table>
      </FormKit>
    </rs-card>
  </div>
</template>
