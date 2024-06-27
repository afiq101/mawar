<script setup>
definePageMeta({
  title: "Chatbot",
  description: "Chatbot Landing",
  layout: "emtpy",
  requiresAuth: true,
});

const currentStep = ref("init");
const stepData = ref(null);
const historyStep = ref([]);

const step = reactive({
  init: {
    title: "Create a new project",
    description: "Choose a template to get started or start from scratch.",
    type: "option",
    children: [
      {
        id: "code",
        title: "Code Generation",
        description:
          "Generate and refine code using visual or textual context. Upload up to 5 files (e.g., screenshots, Figma, SRS) to create an assistant that helps with code generation using Rose UI and Vue 3 components.",
        icon: "ph:code",
      },
      {
        id: "doc",
        title: "Document Generation",
        description:
          "Create project documents such as SRS, URS, ERD, and DFD. Provide project context and upload up to 5 files to generate documents with the help of a specialized assistant.",
        icon: "ph:file-duotone",
      },
    ],
  },
  code: {
    title: "Code Generation",
    description:
      "Choose this option to generate or refine code based on visual or textual context.",
    type: "option",
    children: [
      {
        id: "code-visual",
        title: "Visual",
        description:
          "Select this option to use visual files such as screenshots, Figma, XD files, images (JPG, PNG), and others.",
        icon: "ph:eye",
      },
      {
        id: "code-textual",
        title: "Textual",
        description:
          "Select this option to use text-based documents such as SRS, URS, PDF, DOCX, TXT, and Excel files.",
        icon: "ph:text-t",
      },
    ],
  },
  doc: {
    title: "Document Generation (Assistant)",
    description:
      "Choose this option to generate project documents such as SRS, URS, ERD, and DFD. Provide project context and upload up to 5 files to generate documents with the help of a specialized assistant.",
    type: "avatar",
    children: [
      {
        id: "doc-srs",
        title: "SRS",
        description:
          "Select this option to generate a Software Requirements Specification document.",
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc-urs",
        title: "URS",
        description:
          "Select this option to generate a User Requirements Specification document.",
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc-erd",
        title: "ERD",
        description:
          "Select this option to generate an Entity Relationship Diagram document.",
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "doc-dfd",
        title: "DFD",
        description:
          "Select this option to generate a Data Flow Diagram document.",
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
});

const handleStep = (id) => {
  currentStep.value = id;
  stepData.value = step[id];

  //  If the step is already in the history, remove it and add it to the end
  const index = historyStep.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    historyStep.value.splice(index, 1);
  }
  historyStep.value.push({ id: id, title: step[id].title });
};

onMounted(() => {
  stepData.value = step.init;
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
    <div class="bg-[#2b2a28] h-screen tracking-tight text-zinc-200">
      <div class="container mx-auto">
        <section
          v-if="stepData"
          class="flex flex-col justify-center items-center h-screen gap-5 px-4"
        >
          <div
            v-for="(history, index) in historyStep"
            class="flex items-center gap-2"
          >
            <div
              class="bg-[#172113] border-[1px] border-[#36482c] rounded-md p-3 flex gap-2 text-[#f4f4f5] w-full cursor-pointer"
              @click="handleStep(history.id)"
            >
              {{ history.title }}
            </div>
            <div
              v-if="index !== historyStep.length - 1"
              class="flex items-center gap-2"
            >
              <Icon name="ph:caret-right-duotone" class="text-[#c9dbbb]" />
            </div>
          </div>
          <div class="text-center mb-8">
            <h1 class="text-4xl text-white font-bold mb-1">
              {{ stepData.title }}
            </h1>
            <p class="text-white text-lg line-h">
              {{ stepData.description }}
            </p>
          </div>

          <div
            class="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8"
          >
            <button
              v-for="item in stepData.children"
              class="h-full rounded-md py-5 px-8 flex items-center gap-4 cursor-pointer bg-[#242323] hover:bg-[#3d3d3d] border-[1px] border-[#2a2a27] max-w-[500px]"
              :class="stepData.type === 'option' ? 'flex-row' : 'flex-col'"
              @click="handleStep(item.id)"
            >
              <div class="flex-1">
                <Icon
                  v-if="item.icon"
                  :name="item.icon"
                  class="!w-[45px] !h-[45px] text-[#c9dbbb]"
                />
                <img
                  v-if="item.img"
                  :src="item.img"
                  class="w-[60px] h-[60px] rounded-md"
                />
              </div>
              <div class="flex flex-col text-left">
                <h3 class="mb-1">
                  {{ item.title }}
                </h3>
                <p class="leading-5 text-zinc-300">
                  {{ item.description }}
                </p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
