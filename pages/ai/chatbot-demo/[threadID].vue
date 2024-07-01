<script setup>
import Prism from "prismjs";
// import "prismjs/themes/prism.css"; // you can change

definePageMeta({
  title: "Project",
  description: "Chatbot page",
  layout: "emtpy",
  requiresAuth: true,
});

const { $swal } = useNuxtApp();
// Using require
const code = ref(false);
const history = ref(false);

const historyWidth = ref("0px");

const showProfile = ref(false);

watch(history, (newValue) => {
  historyWidth.value = newValue ? "300px" : "0px";
});

const historyList = ref([
  {
    title: "ToyyibPay Category Creation",
    value: 0,
  },
  {
    title: "Diagram API Documentation",
    value: 0,
  },
  {
    title: "Sequence Diagram Creation",
    value: 0,
  },
  {
    title: "Convert User Story URS",
    value: 0,
  },
]);

const newText = ref(true);
const currentChat = ref("");
const onGoingChat = ref([]);
const waitingResponse = ref(false);

const openedProject = ref(false);

const { threadID } = useRoute().params;

const { data: getMessage } = await useFetch("/api/demo/message-list", {
  method: "GET",
  params: {
    threadId: threadID,
  },
});

// console.log("getMessage:", getMessage.value);
if (getMessage.value.statusCode === 200) {
  onGoingChat.value = getMessage.value.data;

  if (getMessage.value.data.length > 0) newText.value = false;
}

async function handleChat(type, contentType, resp) {
  console.log("new Chat:", type);
  newText.value = false;
  waitingResponse.value = true;

  try {
    if (type === "user") {
      onGoingChat.value.push({
        type: "user",
        contentType: contentType,
        chat: resp,
      });

      currentChat.value = "";
      await getResponseAI(resp);
    } else {
      waitingResponse.value = false;
      animateText(contentType, resp);
    }
    newText.value = false;
  } catch (error) {
    console.log("error:", error);
    $swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Please login again.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
}

async function getResponseAI(resp) {
  const { data } = await useFetch("/api/demo/create-message", {
    method: "POST",
    body: {
      threadId: threadID,
      message: resp,
    },
  });

  if (data.value.statusCode !== 200) {
    console.log("Error", data.value.message);
    return;
  }

  console.log("resp:", data.value);

  const { data: latestMsg } = await useFetch("/api/demo/latest-message", {
    method: "GET",
    params: {
      threadId: threadID,
    },
  });

  if (latestMsg.value.statusCode !== 200) {
    console.log("Error", latestMsg.value.message);
    return;
  }

  await handleChat("assistant", "text", latestMsg.value.data.chat);
}

const copiedIndex = ref(false);
function copyToClipboard(text, index) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      this.copiedIndex = index;
      setTimeout(() => {
        this.copiedIndex = null;
      }, 1500); // Hide message after 2 seconds
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function animateText(contentType, text) {
  const words = text.split(" ");
  let currentIndex = 0;
  const wordsLength = words.length;

  const aiChatIndex = onGoingChat.value.length;
  onGoingChat.value.push({
    type: "assistant",
    contentType: contentType,
    chat: "",
  });

  const interval = setInterval(() => {
    if (currentIndex < wordsLength) {
      if (currentIndex > 0) {
        onGoingChat.value[aiChatIndex].chat += " "; // Add space before new word
      }
      onGoingChat.value[aiChatIndex].chat += words[currentIndex];
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  }, 5); // Increased interval for better readability
}

async function handleNewChat() {
  try {
    const { data } = await useFetch("/api/demo/create-thread", {
      method: "POST",
    });

    if (data.value.statusCode !== 200) {
      console.log("Error", data.value.message);
      return;
    }

    console.log("data:", data.value);

    // Redirect to new thread
    navigateTo(`/ai/chatbot-demo/${data.value.data.id}`);
  } catch (error) {
    console.log("error:", error);
  }
  // onGoingChat.value = [];
  // newText.value = true;
  // currentChat.value = "";
  // showModal.value = true;
  // history.value = false;
}

const showModal = ref(false);

const newChatOptionList = ref([
  {
    title: "Create SRS",
    value: "SRS",
    description: "Create a Software Requirements Specification document",
  },
  {
    title: "Create URS",
    value: "URS",
    description: "Create a User Requirements Specification document",
  },
  {
    title: "Create DFD",
    value: "DFD",
    description: "Create a Data Flow Diagram",
  },
  {
    title: "Create Use Case",
    value: "USECASE",
    description: "Create a Use Case diagram",
  },
]);

const chatOption = ref(null);

const newProject = ref(false);
const newProject1 = ref(false);

const homePage = ref(true);
const newProjectStep = ref(1);

onMounted(() => {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  Prism.highlightAll();

  // Scroll to the bottom of the chat
  const chatContainer = document.querySelector(".scrollbar");
  // console.log("chatContainer:", chatContainer);
  chatContainer.scrollTop = chatContainer.scrollHeight;
});
</script>

<template>
  <div>
    <div
      class="fixed py-10 w-full z-10"
      style="
        background: rgb(124, 233, 255);
        background: linear-gradient(
          0deg,
          rgba(124, 233, 255, 0) 0%,
          rgba(0, 0, 0, 0.6657256652661064) 100%
        );
      "
    ></div>
    <div class="bg-[#2b2a28] h-screen tracking-tight">
      <div class="flex gap-2 h-screen p-3">
        <div
          class="history-panel rounded-md overflow-hidden transition-all duration-400 ease-in-out flex flex-col h-full justify-between !bg-[#18181b]"
          :style="{ width: historyWidth }"
          style="z-index: 50"
        >
          <div>
            <div class="flex justify-between text-white p-3 gap-3">
              <!-- <img
              class="h-10 animate-spin px-2"
              src="@/assets/img/logo/logo-transparent.png"
              alt=""
            /> -->

              <div class="flex gap-3 items-center ml-3 mt-3">
                <Icon
                  name="mdi:atom-variant"
                  class="text-[#c9dbbb] animate-spin"
                ></Icon>

                <span class="my-auto" style="font-family: 'PP Editorial New'"
                  >CorradAI</span
                >
              </div>
            </div>

            <div v-if="!openedProject" class="p-3 text-white flex flex-col">
              <div
                v-if="historyList.length > 0"
                v-for="(data, index) in historyList"
                :key="index"
                class=""
              >
                <div
                  class="flex-grow rounded-md gap-2 hover:bg-[#3d3d3d] cursor-pointer px-3 p-1.5 text-[#F6F3EB] flex justify-between"
                >
                  <p class="text-[12px] truncate">
                    {{ data.title }}
                  </p>
                  <span
                    ><Icon name="material-symbols:arrow-right" size="15"></Icon
                  ></span>
                </div>
              </div>
              <div v-else class="flex">No History</div>
            </div>
          </div>

          <div>
            <div class="px-5 py-2 pb-5">
              <div
                class="flex p-2 justify-center gap-2 w-full border-2 rounded-md !border-[#C8DABB] text-[#C8DABB] hover:bg-[#C8DABB] hover:text-[#557841] cursor-pointer font-semibold"
                @click="(newProject = true), (history = false)"
              >
                <Icon
                  name="material-symbols:add"
                  class="my-auto"
                  size="18"
                ></Icon>
                <span class="text-[14px]">Create New</span>
              </div>
            </div>

            <div
              class="text-white p-3 m-2 flex justify-around"
              ref="profile"
              :style="{ display: showProfile ? 'flex' : 'none' }"
            >
              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/zah.png"
                alt=""
              />

              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/afi.png"
                alt=""
              />

              <img
                class="max-w-[50px] rounded-full"
                src="@/assets/img/logo/jul.png"
                alt=""
              />
            </div>

            <div
              class="px-5 py-2"
              ref="box1"
              @mouseenter="showProfile = true"
              @mouseleave="showProfile = false"
            >
              <div
                class="bg-[#172113] border-[1px] border-[#36482c] rounded-md p-3 flex gap-2 text-[#f4f4f5]"
              >
                <span class="rounded-full bg-[#6a9151]">
                  <Icon
                    name="material-symbols:arrow-upward-alt-rounded"
                    class="text-white my-auto"
                  ></Icon>
                </span>

                <p class="my-auto">Placeholder</p>
              </div>
            </div>

            <div class="px-5 py-2 pb-5">
              <rs-button class="w-full !bg-[#557841]" @click="navigateTo(`/`)"
                >Back To Mawar</rs-button
              >
            </div>
          </div>
        </div>

        <div class="flex-grow p-2 text-white">
          <div class="flex justify-between mt-3">
            <div
              v-if="!history"
              @click="(history = true), (code = false)"
              class="hidden flex rounded-md p-2 px-3 gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] z-50 border-[1px] border-[#2a2a27]"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-right-rounded"
                size="15"
              ></Icon>
            </div>
            <div
              v-else
              @click="(history = false), (code = false)"
              class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] z-50 border-[1px] border-[#2a2a27]"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-left-rounded"
                size="15"
              ></Icon>
            </div>
            <div class="z-50" v-if="!openedProject">
              <div
                class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] border-[1px] border-[#2a2a27]"
                @click="handleNewChat"
              >
                <Icon
                  name="material-symbols:add"
                  class="my-auto"
                  size="15"
                ></Icon>
                <span class="text-[12px]">New Chat</span>
              </div>
            </div>
          </div>

          <div
            v-if="!openedProject"
            class="flex flex-col h-full items-center justify-between"
            style="height: 90vh"
          >
            <NuxtScrollbar
              class="scrollbar flex-grow w-full"
              style="height: 100%"
            >
              <div v-if="newText && !waitingResponse" class="top">
                <div class="gap-3 py-20 text-center leading-15">
                  <p class="welcome-text text-[60px] drop-shadow-md">
                    Welcome to

                    <span> Corrad<span class="text-[#c9dbbb]">AI </span> </span>
                  </p>
                  <span class="my-auto text-[16px] leading-6">
                    <p>Need help or just getting started?</p>

                    <i class="text-[14px]"
                      >Type your question in the textbox—I'm here to assist!</i
                    >
                  </span>
                </div>
              </div>
              <div
                v-else
                class="textt flex justify-center items-center pr-[18px]"
                style=""
              >
                <div class="flex flex-col gap-5 !text-[#f5f4ee] tracking-tight">
                  <div v-for="(data, index) in onGoingChat" :key="index">
                    <div
                      class="flex gap-2"
                      :class="data.type == 'user' ? 'justify-end' : ''"
                    >
                      <div
                        v-if="data.type == 'assistant'"
                        class="flex-grow mr-3"
                      >
                        <img
                          class="max-w-[30px] rounded-full"
                          src="@/assets/img/logo/zah.png"
                          alt=""
                        />
                      </div>
                      <div
                        v-if="data.type == 'user'"
                        class="rounded-lg p-2 px-5 ai-chat bg-[#4b4a4a] text-[13px]"
                        v-html="data.chat"
                      ></div>

                      <div
                        v-if="
                          data.type == 'assistant' && data.contentType == 'text'
                        "
                        class="leading-6 w-full text-[13px]"
                      >
                        <div
                          v-html="data.chat"
                          class="flex flex-col gap-2"
                        ></div>

                        <p class="mt-2 flex gap-1">
                          <Icon
                            name="material-symbols:content-copy-outline-sharp"
                            size="25"
                            class="p-1 cursor-pointer hover:bg-[#494848] rounded-md"
                            @click="copyToClipboard(data.chat, index)"
                          ></Icon>

                          <Icon
                            name="material-symbols-light:directory-sync-rounded"
                            size="25"
                            class="p-1 cursor-pointer hover:bg-[#494848] rounded-md"
                          ></Icon>

                          <transition name="fade-slide">
                            <span
                              v-if="copiedIndex === index"
                              class="copied-message"
                            >
                              Text copied!
                            </span>
                          </transition>
                        </p>
                      </div>
                      <code
                        v-if="
                          data.type == 'assistant' && data.contentType == 'code'
                        "
                      >
                        {{ data.chat }}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtScrollbar>

            <div class="flex justify-center">
              <div class="max-w-[70vw] min-w-[100px]" style="width: 500px">
                <div class="flex justify-between">
                  <span v-if="waitingResponse" class="animate-pulse"
                    >Waiting response...</span
                  >
                  <span v-else></span>
                </div>

                <div class="relative mt-2 rounded-md shadow-sm">
                  <FormKit
                    type="form"
                    :actions="false"
                    @submit="handleChat('user', 'text', currentChat)"
                  >
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <Icon name="material-symbols-light:attach-file"></Icon>
                    </div>
                    <input
                      type="text"
                      class="block w-full rounded-full py-3 pl-10 pr-20 bg-[#393937] text-[#a6a39a] sm:text-sm sm:leading-6 outline-none focus:border-[1px] focus:border-[#557841]"
                      v-model="currentChat"
                    />
                    <button
                      class="absolute inset-y-0 right-2 flex items-center"
                      :disabled="!currentChat || waitingResponse"
                    >
                      <span
                        class="rounded-full p-1"
                        :class="
                          !currentChat || waitingResponse ? '' : 'bg-[#6a9151]'
                        "
                      >
                        <Icon
                          name="material-symbols:arrow-upward-alt-rounded"
                          class="text-white my-auto"
                        ></Icon>
                      </span>
                    </button>
                  </FormKit>
                </div>

                <span
                  class="text-[10px] flex justify-center mt-5"
                  style="font-family: 'PP Editorial New'"
                >
                  "While Rome wasn't built in a day, openAnjai arose in an
                  instant."
                </span>
              </div>
            </div>
          </div>

          <div v-if="!homePage" class="flex flex-col items-center">
            <div class="gap-3 py-20 text-center leading-15">
              <p class="welcome-text text-[60px] drop-shadow-md">
                Welcome to

                <span> Open<span class="text-[#c9dbbb]">AjaiB </span> </span>
              </p>
              <span class="my-auto text-[16px] leading-6">
                <p>Need help or just getting started?</p>

                <i class="text-[14px]"
                  >Type your question in the textbox—I'm here to assist!</i
                >
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <div
                class="p-5 py-10 rounded-md border-[2px] border-[#557841] cursor-pointer hover:bg-[#557841] hover:text-white max-w-[200px]"
                @click="(homePage = false), (newProjectStep = 1)"
              >
                Create new project
              </div>
              <div
                class="p-5 py-10 rounded-md border-[2px] border-[#557841] cursor-pointer hover:bg-[#557841] hover:text-white max-w-[200px]"
              >
                Open existing project
              </div>
            </div>
          </div>

          <div
            v-if="newProjectStep == 1"
            class="flex flex-col items-center"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div
        class="bg-[#18181B] p-5 rounded-md text-white border-2 border-[#2b323f]"
        style="width: 25rem; height: 40rem"
      >
        <div class="flex justify-between">
          <div class="my-auto">
            <p class="text-lg font-semibold">Choose action</p>
          </div>
          <div
            class="my-auto p-1 hover:bg-[#4c596f] rounded-md hover:cursor-pointer"
            @click="showModal = false"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-gray-400"
              size="20"
            ></Icon>
          </div>
        </div>

        <hr class="my-5 border-[#2b323f]" style="" />

        <p class="text-gray-400">Select your desired action:</p>

        <div class="grid grid-cols-12 gap-2 mt-5">
          <div
            v-for="(data, index) in newChatOptionList"
            :key="index"
            class="col-span-12 md:col-span-12 p-5 border-[1px] border-[#2b323f] bg-[#4B5563] hover:bg-[#656e7b] rounded-md hover:cursor-pointer"
          >
            <div class="flex justify-between">
              <div class="max-w-[300px] max-h-[80px]">
                <p class="text-[16px] font-semibold">
                  {{ data.title }}
                </p>

                <p class="text-sm text-gray-400">{{ data.description }}</p>
              </div>

              <div class="my-auto">
                <Icon
                  name="material-symbols:arrow-right-alt-rounded"
                  class="text-gray-400"
                ></Icon>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6">
          <rs-button
            class="w-full !bg-[#557841]"
            @click="(newProject = false), (newProject1 = true)"
            >Next Step</rs-button
          >
        </div>
      </div>
    </div>

    <div v-if="newProject" class="modal-overlay">
      <div
        class="bg-[#18181B] p-5 rounded-md text-white border-2 border-[#2b323f]"
        style="width: 25rem"
      >
        <div class="flex justify-between">
          <div class="my-auto">
            <p class="text-lg font-semibold">Create new project</p>
          </div>
          <div
            class="my-auto p-1 hover:bg-[#4c596f] rounded-md hover:cursor-pointer"
            @click="newProject = false"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-gray-400"
              size="20"
            ></Icon>
          </div>
        </div>

        <p class="text-gray-400">:</p>

        <div class="mt-3">
          <label for="Name">Name</label>
          <p class="text-[10px] text-gray-500">
            Human-friendly label for your project, shown in user interfaces and
            on exports.
          </p>
          <input
            type="text"
            name=""
            value=""
            class="mt-2 block w-full rounded-md py-2 px-3 bg-[#18181B] text-[#a6a39a] sm:text-sm sm:leading-6 border-[1px] border-[#557841] focus:outline-none"
          />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <rs-button class="!bg-gray-500 !px-5" @click="newProject = false"
            >Cancel</rs-button
          >
          <rs-button class="!bg-[#557841] !px-5" @click="newProject1 = true"
            >Create</rs-button
          >
        </div>
      </div>
    </div>

    <div v-if="newProject1" class="modal-overlay">
      <div
        class="bg-[#18181B] p-5 rounded-md text-white border-2 border-[#2b323f]"
        style="width: 25rem"
      >
        <div class="">
          <label for="Name">Upload file</label>
          <p class="text-[10px] text-gray-500">
            Upload relevant files to support generating desired results.
          </p>
        </div>

        <div class="flex flex-col justify-between">
          <div class="flex-grow mt-3 flex">
            <div class="flex-grow">
              <p>Document 1</p>

              <div class="mt-2">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#202020]"
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
                        <p
                          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span class="font-semibold">Click to upload</span>
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          PNG or DOCX
                        </p>
                      </div>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      single
                    />
                  </label>
                </div>
              </div>

              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>Choose a type</option>
                <option value="US">SRS</option>
                <option value="CA">URS</option>
                <option value="FR">DFD</option>
              </select>
            </div>
          </div>

          <div class="flex-grow mt-5 flex">
            <div class="flex-grow">
              <p>Document 2</p>

              <div class="mt-2">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#202020]"
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
                        <p
                          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span class="font-semibold">Click to upload</span>
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          PNG or DOCX
                        </p>
                      </div>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      single
                    />
                  </label>
                </div>
              </div>

              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>Choose a type</option>
                <option value="US">SRS</option>
                <option value="CA">URS</option>
                <option value="FR">DFD</option>
              </select>
            </div>
          </div>

          <div class="flex-grow mt-5 flex flex-col gap-2">
            <p>Instructions</p>
            <input
              type="textarea"
              class="w-full !bg-[#202020] py-10 px-2"
              placeholder="Provide specific instructions"
            />
          </div>

          <div class="flex justify-end gap-2 mt-10">
            <div
              class="bg-[#202020] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
              @click="(showModal = true), (newProject1 = false)"
            >
              Back
            </div>
            <div
              class="bg-[#557841] border-[2px] border-[#2b323f] !px-5 text-white rounded-md p-2 hover:bg-[#484848] cursor-pointer"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap");

html[data-theme="default"] {
  --color-primary: 85, 120, 65;
  --color-secondary: 23, 33, 19;
  --color-accent: 243, 244, 246;
  --color-success: 79, 192, 103;
  --color-info: 65, 133, 242;
  --color-warning: 246, 141, 32;
  --color-danger: 229, 83, 69;
  --text-color: 240, 240, 240;
  --border-color: 233, 233, 236;
  --bg-1: 43, 42, 40;
  --bg-2: 32, 32, 32;
  --scroll-color: 170, 170, 170;
  --scroll-hover-color: 155, 155, 155;
  --fk-border-color: 67, 67, 67;
  --fk-placeholder-color: 196, 196, 196;
  --box-shadow: rgba(36, 35, 71, 0.05) 0px 1px 1px,
    rgba(36, 35, 71, 0.05) 0px 0px 1px 1px;
  --cp-bg: 255, 255, 255;
  --rounded-box: 0.2rem;
  --rounded-btn: 0.2rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: 0.2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --padding-btn: 0.5rem;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --tw-shadow: #e5eaf2;
}

.ai-chat {
  text-align: left; /* Ensure text starts from the left */
}

.history-panel {
  width: 400px;
  max-width: 300px;
  min-width: 0;
}

.textt {
  width: 100%;
  overflow: hidden !important;
}
@media screen and (max-width: 600px) {
  .history-panel {
    position: fixed;
    margin: 0 !important;
  }

  .textt {
    padding: 0px !important;
    margin-top: 10px;
  }
}

body {
  font-family: "PP Neue Montreal", sans-serif !important;
}

.welcome-text {
  font-size: "70";
  font-family: "PP Editorial New";
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
}

.copied-message {
  font-size: 10px;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

pre {
  background-color: #0d1109;
  border: 1px solid #2a2a27;
  color: #999999;
  border-radius: 5px;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  border-radius: 16px;
  padding: 24px;
}

pre code {
  font-family: "Fira Code", monospace !important;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.5rem !important;
}

h1,
h2 {
  margin-top: 0.75rem !important;
}

ul {
  list-style-type: disc !important;
  margin-left: 24px;
}

ol {
  list-style-type: decimal !important;
  margin-left: 24px;
}

.container-copy {
  border: 2px solid red;
}
</style>
