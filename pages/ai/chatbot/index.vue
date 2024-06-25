<template>
  <div class="bg-[#2b2a28] h-screen tracking-tight">
    <div class="flex gap-2 h-screen p-3">
      <div
        class="history-panel bg-[#171717] rounded-md overflow-hidden transition-all duration-100 ease-in-out flex flex-col h-full justify-between"
        :style="{ width: historyWidth }"
      >
        <div>
          <div class="flex justify-between text-white p-3 gap-3">
            <img
              class="h-10 animate-spin px-2"
              src="@/assets/img/logo/logo-transparent.png"
              alt=""
            />
          </div>
          <div class="p-3 text-white mt-3 flex flex-col">
            <div
              v-if="historyList.length > 0"
              v-for="(data, index) in historyList"
              :key="index"
            >
              <div
                class="flex-grow rounded-md gap-2 hover:bg-[#3d3d3d] cursor-pointer px-3 p-1.5 text-[#F6F3EB] flex justify-between"
              >
                <p class="text-[12px] truncate">
                  {{ data.title }}
                </p>
                <span>
                  <Icon name="material-symbols:arrow-right" size="15"></Icon>
                </span>
              </div>
            </div>
            <div v-else class="flex">No History</div>
          </div>
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
      <div class="flex-grow p-2 text-white">
        <div class="flex justify-between">
          <span
            v-if="!history"
            @click="toggleHistory"
            class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d]"
          >
            <Icon
              name="material-symbols:keyboard-double-arrow-right-rounded"
              size="15"
            ></Icon>
          </span>
          <span
            v-else
            @click="toggleHistory"
            class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d]"
          >
            <Icon
              name="material-symbols:keyboard-double-arrow-left-rounded"
              size="15"
            ></Icon>
          </span>
          <span>
            <div
              class="rounded-md p-2 px-3 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d]"
              @click="handleNewChat"
            >
              <Icon
                name="material-symbols:add"
                class="my-auto"
                size="15"
              ></Icon>
              <span class="text-[12px]">New</span>
            </div>
          </span>
        </div>
        <div
          class="flex flex-col h-full justify-between mt-5"
          style="height: 87vh"
        >
          <NuxtScrollbar :style="{ 'max-height': '80vh' }">
            <div v-if="newText" class="top">
              <div class="gap-3 py-20 text-center leading-[50px]">
                <p class="welcome-text text-[60px] drop-shadow-md">
                  Welcome to Eh AI
                </p>
                <span class="my-auto text-[16px] leading-6">
                  <p>Need help or just getting started?</p>
                  <p>Type your question in the textbox—I'm here to assist!</p>
                </span>
              </div>
            </div>
            <div v-else class="flex justify-center">
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
                <div
                  class="rounded-md p-2 px-4 flex gap-1 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d]"
                  @click="toggleCode"
                >
                  <Icon name="ph:code-bold" size="15"></Icon>
                  <span class="text-xs">Code</span>
                </div>
              </div>
              <div class="relative mt-2 rounded-md shadow-sm">
                <form @submit.prevent="handleChat('user', 'text', currentChat)">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <Icon name="material-symbols-light:attach-file"></Icon>
                  </div>
                  <input
                    type="text"
                    class="block w-full rounded-full border-0 py-3 pl-10 pr-20 bg-[#393937] text-[#a6a39a] sm:text-sm sm:leading-6 focus:outline-none shadow-lg"
                    v-model="currentChat"
                  />
                  <button
                    class="absolute inset-y-0 right-2 flex items-center"
                    :disabled="!currentChat || waitingResponse"
                  >
                    <span
                      class="rounded-full p-1"
                      :class="
                        !currentChat || waitingResponse ? 'bg-[#c86c3a]' : ''
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
              <p class="text-[8px] text-center mt-2 ">
                Made in MY within 1 day only.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="code"
        class="flex-grow bg-[#282C34] rounded-md"
        style="width: 50vw"
      >
        <div class="flex flex-col h-full justify-between">
          <div class="flex justify-between p-2 text-white">
            <div>...</div>
            <div @click="code = false">
              <Icon name="material-symbols:close-small-outline"></Icon>
            </div>
          </div>
          <!-- <pre ref="codeRef" :class="`language-${language}`">
            <code v-html="highlightedCode"></code>
          </pre> -->
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

<script setup>
definePageMeta({
  title: "Ai Chatbot",
  requiresAuth: true,
  middleware: ["auth"],
  layout: "empty",
});

const code = ref(false);
const history = ref(false);
const historyWidth = ref("0px");

watch(history, (newValue) => {
  historyWidth.value = newValue ? "20vw" : "0px";
});

const historyList = ref([
  { title: "ToyyibPay Category Creation", value: 0 },
  { title: "Diagram API Documentation", value: 0 },
  { title: "Sequence Diagram Creation", value: 0 },
  { title: "Convert User Story URS", value: 0 },
]);

const newText = ref(true);
const currentChat = ref("");
const onGoingChat = ref([]);
const aiResponse = ref("");
const waitingResponse = ref(false);

async function handleChat(type, contentType, resp) {
  if (type === "user") {
    onGoingChat.value.push({ type: "user", contentType, chat: resp });
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
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
    Aldus PageMaker including versions of Lorem Ipsum.`
  );
}

function animateText(contentType, text) {
  const words = text.split(" ");
  let currentIndex = 0;
  const wordsLength = words.length;

  const aiChatIndex = onGoingChat.value.length;
  onGoingChat.value.push({ type: "ai", contentType, chat: "" });

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

function toggleHistory() {
  history.value = !history.value;
  code.value = false;
}

function toggleCode() {
  history.value = false;
  code.value = true;
}
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
@import url("https://db.onlinewebfonts.com/c/926fcaaa8b66e0df67e176f329259711?family=PP+Editorial+New");

.ai-chat {
  text-align: left;
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
