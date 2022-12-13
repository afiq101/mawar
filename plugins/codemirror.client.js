import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/vue/vue.js";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";

// Import show-hint addon
import "codemirror/addon/hint/anyword-hint.js";

// Import show-hint css
// import "codemirror/addon/hint/show-hint.css";

// Import lint addon
import "codemirror/addon/lint/lint.js";

// Import fullscreen addon
import "codemirror/addon/display/fullscreen.js";

// import search addon
import "codemirror/addon/search/search.js";

// import match brackets addon
import "codemirror/addon/edit/matchbrackets.js";

// import close brackets addon
import "codemirror/addon/edit/closebrackets.js";

// import comment addon
import "codemirror/addon/comment/comment.js";

// overlay addon
import "codemirror/addon/mode/overlay.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Codemirror", Codemirror);
});
