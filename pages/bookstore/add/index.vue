<script setup>
definePageMeta({
  title: "Add New Book",
});

const form = ref({
  bookName: "",
  bookSynopsis: "",
  bookAuthor: "",
  bookFeatured: false,
});

const submit = async () => {
  if (form.value.bookName == "" || form.value.bookAuthor == "") {
    return;
  }
  try {
    const { data } = await useFetch("/api/book/add", {
      method: "POST",
      body: {
        bookName: form.value.bookName,
        bookSynopsis: form.value.bookSynopsis,
        bookAuthor: form.value.bookAuthor,
      },
    });

    if (data.value.statusCode == 200) {
      alert("Success");
      window.location.href = `/bookstore`;
    } else {
      alert("Failed");
    }
  } catch (error) {
    return;
  }
};

// function submit() {
//   console.log(form.value);
// }
</script>
<template>
  <div>
    <rs-card>
      <template #header> Add Book </template>
      <template #body>
        <FormKit
          type="form"
          :actions="false"
          @submit="submit"
          :incomplete-message="false"
        >
          <FormKit
            v-model="form.bookName"
            type="text"
            label="Book Name"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'Nama buku tidak boleh kosong',
            }"
          >
            <template #label>
              Book Name <span class="text-red-500">*</span>
            </template>
          </FormKit>
          <FormKit
            v-model="form.bookSynopsis"
            type="textarea"
            label="Book Synopsis"
            rows="10"
          />
          <FormKit
            v-model="form.bookAuthor"
            type="text"
            label="Book Author"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'Pengarang buku tidak boleh kosong',
            }"
          />
          <rs-button> Submit </rs-button>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>
