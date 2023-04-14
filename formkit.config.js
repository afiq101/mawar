import { generateClasses } from "@formkit/themes";
import defaultTheme from "@/assets/js/formkit-theme.js";
import customInput from "@/assets/js/formkit-custom.js";

// ----------------- Addons --------------------------- //

// https://formkit.com/plugins/auto-animate
import { createAutoAnimatePlugin } from "@formkit/addons";

// https://formkit.com/plugins/floating-labels
import { createFloatingLabelsPlugin } from "@formkit/addons";
import "@formkit/addons/css/floatingLabels";

// https://formkit.com/plugins/multi-step
import { createMultiStepPlugin } from "@formkit/addons";
import "@formkit/addons/css/multistep";

export default {
  plugins: [
    createFloatingLabelsPlugin({
      useAsDefault: false, // defaults to false
    }),
    createAutoAnimatePlugin({
      // optional config
    }),
    createMultiStepPlugin(),
  ],
  config: {
    classes: generateClasses(defaultTheme),
  },
  inputs: customInput,
};
