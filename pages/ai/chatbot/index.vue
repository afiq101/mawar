<script setup>
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";

definePageMeta({
  title: "Chatbot",
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
  historyWidth.value = newValue ? "20vw" : "0px";
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
const aiResponse = ref("");
const waitingResponse = ref(false);

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
  const { data } = await useFetch("/api/devtool/ai/chat/send/message", {
    method: "POST",
    body: {
      message: resp,
    },
  });

  console.log("resp:", data);

  if (data.value.statusCode !== 200) {
    console.log("Error", data.value.message);
    return;
  }

  await handleChat("ai", "text", data.value.data.chatMessage);
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
    type: "ai",
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

function handleNewChat() {
  onGoingChat.value = [];
  newText.value = true;
  currentChat.value = "";
  showModal.value = true;
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

onMounted(() => {
  Prism.highlightAll();
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
      <!-- <div class="bg-[#ebebeb] h-screen"> -->
      <div class="flex gap-2 h-screen p-3">
        <div
          class="history-panel rounded-md overflow-hidden transition-all duration-100 ease-in-out flex flex-col h-full justify-between !bg-[#18181b]"
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

            <div class="p-3 text-white flex flex-col">
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
          <div class="flex justify-between">
            <div
              v-if="!history"
              @click="(history = true), (code = false)"
              class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] z-50 border-[1px] border-[#2a2a27]"
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
            <div class="z-50">
              <div
                class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] border-[1px] border-[#2a2a27]"
                @click="handleNewChat()"
              >
                <Icon
                  name="material-symbols:add"
                  class="my-auto"
                  size="15"
                ></Icon>
                <span class="text-[12px]">New</span>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full justify-between"
            style="height: 90vh"
          >
            <NuxtScrollbar
              :style="{
                'max-height': '80vh',
              }"
            >
              <div v-if="newText && !waitingResponse" class="top">
                <div class="gap-3 py-20 text-center leading-15">
                  <p class="welcome-text text-[60px] drop-shadow-md">
                    Welcome to

                    <span>
                      Open<span class="text-[#c9dbbb]">AjaiB </span>
                    </span>
                  </p>
                  <span class="my-auto text-[16px] leading-6">
                    <p>Need help or just getting started?</p>

                    <i class="text-[14px]"
                      >Type your question in the textbox—I'm here to assist!</i
                    >
                  </span>
                </div>
              </div>
              <div v-else class="flex justify-center" style="">
                <div
                  style="width: 60vw"
                  class="flex flex-col gap-5 !text-[#f5f4ee] tracking-tight"
                >
                  <div v-for="(data, index) in onGoingChat" :key="index">
                    <div
                      class="flex gap-2"
                      :class="data.type == 'user' ? 'justify-end' : ''"
                    >
                      <div v-if="data.type == 'ai'" class="flex-grow mr-3">
                        <img
                          class="max-w-[30px] rounded-full"
                          src="@/assets/img/logo/zah.png"
                          alt=""
                        />
                      </div>
                      <p
                        v-if="data.type == 'user'"
                        class="rounded-lg p-2 px-5 ai-chat bg-[#4b4a4a] text-[13px]"
                      >
                        {{ data.chat }}
                      </p>

                      <span
                        v-if="data.type == 'ai' && data.contentType == 'text'"
                        class="leading-6 w-full text-[13px]"
                      >
                        {{ data.chat }}

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
                      </span>
                      <code
                        v-if="data.type == 'ai' && data.contentType == 'code'"
                      >
                        {{ data.chat }}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtScrollbar>

            <div class="flex justify-center">
              <div class="w-full" style="width: 60vw">
                <div class="flex justify-between">
                  <span v-if="waitingResponse" class="animate-pulse"
                    >Waiting response...</span
                  >
                  <span v-else></span>

                  <!-- <div
                  class="rounded-md p-2 px-4 flex gap-1 cursor-pointer hover:bg-[#3d3d3d]"
                  @click="(history = false), (code = true)"
                >
                  <Icon name="ph:code-bold" size="15"></Icon>
                  <span class="text-xs">Code</span>
                </div> -->
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
                      class="block w-full rounded-full py-3 pl-10 pr-20 bg-[#393937] text-[#a6a39a] sm:text-sm sm:leading-6 focus:outline-none outline-[#2a2a27] shadow-lg"
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
        </div>

        <div v-if="code" class="flex-grow bg-[#282C34] rounded-md">
          <div class="flex flex-col h-full justify-between">
            <div class="flex justify-between p-2 text-white">
              <div>...</div>
              <div @click="code = false">
                <Icon name="material-symbols:close-small-outline"></Icon>
              </div>
            </div>
            <!-- <code class="flex-grow p-3"> { "text": "test" } </code> -->
            {{ highlightedCode }}

            <pre class="flex-grow">
            <code class="lang-js">
              <span>const x</span> = <span>'hello world'</span>;
              <span>const x</span> = <span>'hello world'</span>;
              <span class="text-xs">New</span>

            </code>
          </pre>

            <div class="flex justify-between p-2 text-white">
              <div>...</div>
              <div class="flex gap-3">
                <Icon
                  class="my-auto"
                  name="material-symbols:content-copy-outline-sharp"
                  size="15"
                ></Icon>
                <Icon
                  class="my-auto"
                  name="material-symbols:download-rounded"
                  size="15"
                ></Icon>
              </div>
            </div>
          </div>
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
            <p class="text-lg font-semibold">Choose position</p>
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

        <p class="text-gray-400">Select your desired position:</p>

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
          <rs-button class="w-full !bg-[#557841]">Next Step</rs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");

.ai-chat {
  text-align: left; /* Ensure text starts from the left */
}

.history-panel {
  max-width: 200px;
  min-width: 0;
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
</style>
