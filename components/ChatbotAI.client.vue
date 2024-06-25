<script setup>
import { navigateTo } from "nuxt/app";
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";

const { status, data, send, open, close } = useWebSocket(
  `ws://${location.host}/api/websocket`
);

watch(data, (newValue) => {
  console.log("Data: ", newValue);
});

// Using require
const code = ref(false);
const history = ref(false);

const historyWidth = ref("0px");

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
  if (type === "user") {
    onGoingChat.value.push({
      type: "user",
      contentType: contentType,
      chat: resp,
    });
    send(currentChat.value);
    await getResponseAI();
  } else {
    waitingResponse.value = true;

    setTimeout(() => {
      waitingResponse.value = false;
      animateText(contentType, resp);
    }, 2000);
  }
  newText.value = false;
}

async function getResponseAI() {
  await handleChat(
    "ai",
    "text",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
}
// function animateText(contentType, text) {
//   let currentIndex = 0;
//   const textLength = text.length;
//   aiResponse.value = "";

//   const aiChatIndex = onGoingChat.value.length;
//   onGoingChat.value.push({
//     type: "ai",
//     contentType: contentType,
//     chat: "",
//   });

//   const interval = setInterval(() => {
//     if (currentIndex < textLength) {
//       onGoingChat.value[aiChatIndex].chat += text[currentIndex];
//       currentIndex++;
//     } else {
//       clearInterval(interval);
//     }
//   }, 5);
// }

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
}

onMounted(() => {
  Prism.highlightAll();
});
</script>

<template>
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

            <div
              class="flex gap-3 items-center ml-3 mt-3"
              stlye="font-family: 'PP Editorial New'"
            >
              <Icon
                name="mdi:atom-variant"
                class="text-[#c9dbbb] animate-spin"
              ></Icon>

              <span class="my-auto">CorradAI</span>
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
          <div class="p-5">
            <rs-button class="w-full !bg-[#557841]" @click="navigateTo(`/`)"
              >Back To Mawar</rs-button
            >
          </div>

          <div class="text-white p-3 m-2 flex justify-around">
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

        <div class="flex flex-col h-full justify-between" style="height: 87vh">
          <NuxtScrollbar
            :style="{
              'max-height': '80vh',
            }"
          >
            <div v-if="newText" class="top">
              <div class="gap-3 py-20 text-center leading-[50px]">
                <!-- <img
                  class="h-10 animate-spin"
                  src="@/assets/img/logo/logo-transparent.png"
                  alt=""
                /> -->

                <p class="welcome-text text-[60px] drop-shadow-md">
                  Welcome to Eh AI
                </p>
                <p class="my-auto text-[16px]">
                  What can i help you with today?
                </p>
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
                        ></Icon>

                        <Icon
                          name="material-symbols-light:directory-sync-rounded"
                          size="25"
                          class="p-1 cursor-pointer hover:bg-[#494848] rounded-md"
                        ></Icon>
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
                <form>
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
                    @click="handleChat('user', 'text', currentChat)"
                  >
                    <span
                      class="rounded-full p-1"
                      :class="
                        !currentChat || waitingResponse ? 'bg-[#6a9151]' : ''
                      "
                    >
                      <Icon
                        name="material-symbols:arrow-upward-alt-rounded"
                        class="text-white my-auto"
                      ></Icon>
                    </span>
                  </button>
                </form>
              </div>

              <span class="text-[8px] flex justify-center mt-2"
                >Made in MY within 1 day only.</span
              >
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
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");

.ai-chat {
  text-align: left; /* Ensure text starts from the left */
}

.history-panel {
  max-width: 20vw;
  min-width: 0;
}

body {
  font-family: "PP Neue Montreal", sans-serif !important;
}

.welcome-text {
  font-size: "70";
  font-family: "PP Editorial New";
}
</style>
