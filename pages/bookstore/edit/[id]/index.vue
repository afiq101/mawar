<script setup>
definePageMeta({
  title: "Edit Book",
});

// /edit/1
const paramID = useRoute().params.id;

// // /edit?id=1
// const queryID = useRoute().query.id;

const form = ref({
  bookName: "",
  bookSynopsis: "",
  bookAuthor: "",
  bookFeatured: false,
});

const { data } = await useFetch("/api/book/getbook", {
  method: "GET",
  query: {
    bookID: paramID,
  },
});

if (data.value.statusCode == 200) {
  form.value.bookName = data.value.data.bookName;
  form.value.bookSynopsis = data.value.data.bookSynopsis;
  form.value.bookAuthor = data.value.data.bookAuthor;
  form.value.bookFeatured = data.value.data.bookFeatured;
} else {
  alert("Tiada Buku Dengan ID Ini");
}

const submit = async () => {
  if (form.value.bookName == "" || form.value.bookAuthor == "") {
    return;
  }

  try {
    const { data } = await useFetch("/api/book/edit", {
      method: "POST",
      body: {
        bookId: paramID,
        bookName: form.value.bookName,
        bookSynopsis: form.value.bookSynopsis,
        bookAuthor: form.value.bookAuthor,
      },
    });

    if (data.value.statusCode == 200) {
      alert("Success");
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
      <template #header> Edit Book </template>
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
