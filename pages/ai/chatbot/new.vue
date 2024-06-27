<script setup>
definePageMeta({
  title: "openAI - New Project",
  description: "",
  layout: "emtpy",
  requiresAuth: true,
});

const { $swal } = useNuxtApp();

const step = ref(1);

onMounted(() => {});
</script>

<template>
  <div class="bg-black">
    <div class="h-screen flex items-center justify-center">
      <div
        v-if="step == 1"
        class="p-5 m-10 rounded-md bg-[#fff] border-[1px] border-[#2b323f] text-black"
      >
        <div class="">
          <p class="text-lg">Name</p>
          <p class="text-[12px] text-gray-500">
            Human-friendly label for your project, shown in user interfaces and
            on exports.
          </p>
          <input
            type="text"
            name=""
            value=""
            class="mt-2 block w-full rounded-md py-2 px-3 sm:text-sm sm:leading-6 bg-[#fff] border-[1px] border-[#2b323f] focus:outline-none"
          />
        </div>

        <div class="flex justify-end mt-3">
          <div
            class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            @click="step = 2"
          >
            Next
          </div>
        </div>
      </div>

      <div
        v-if="step == 2"
        class="p-5 m-10 rounded-md bg-[#fff] border-[1px] border-[#2b323f] text-black"
      >
        <div class="">
            <p class="text-[20px]">I want generate</p>
        </div>

        <div class="mt-3 flex">
          <div class="flex-grow">
            <select
              id="underline_select"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected>Choose a type</option>
              <option value="US">SRS</option>
              <option value="CA">URS</option>
              <option value="FR">DFD</option>
            </select>

            <div class="mt-2">
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#fff]"
                >
                  <div class="flex gap-3 items-center justify-center">
                    <div class="my-auto">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </div>

                    <div class="">
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        PNG or DOCX
                      </p>
                    </div>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" single />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-3">
          <div
            class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            @click="step = 1"
          >
            Back
          </div>
          <div
            class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            @click="step = 3"
          >
            Next
          </div>
        </div>
      </div>

      <div
        v-if="step == 3"
        class="p-5 m-10 rounded-md bg-[#fff] border-[1px] border-[#2b323f] text-black"
      >
        <div class="">
          <label for="Name">Upload file</label>
          <p class="text-[10px] text-gray-500">
            Human-friendly label for your project, shown in user interfaces and
            on exports.
          </p>
        </div>

        <div class="mt-3 flex">
          <div class="flex-grow">
            <select
              id="underline_select"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected>Choose a type</option>
              <option value="US">SRS</option>
              <option value="CA">URS</option>
              <option value="FR">DFD</option>
            </select>

            <div class="mt-2">
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#fff]"
                >
                  <div class="flex gap-3 items-center justify-center">
                    <div class="my-auto">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </div>

                    <div class="">
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        PNG or DOCX
                      </p>
                    </div>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" single />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-3">
          <div
            class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            @click="step = 1"
          >
            Back
          </div>
          <div
            class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            @click="step = 3"
          >
            Next
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
}
</style>
