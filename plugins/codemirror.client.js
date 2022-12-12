import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/vue/vue.js";
import "codemirror/theme/material-darker.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Codemirror", Codemirror);
});
