import loadtailwindComponent from "./block/basic";
import loadRSComponent from "./block";
import loadCommands from "./command";

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
      tailwindPlayCdn: "https://cdn.tailwindcss.com",
      plugins: [],
      config: {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#F3586A",
              secondary: "#F07A25",
              success: "#4185F2",
              info: "#4FC067",
              warning: "#F68D20",
              danger: "#E55345",
            },
          },
        },
      },
      cover: `.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`,
      changeThemeText: "Change Theme",
      openCategory: "Blog",
    },
    ...opts,
  };

  // Add Blocks
  loadRSComponent(editor, options);

  // Add Components
  loadtailwindComponent(editor, options);

  // Add Commands
  loadCommands(editor, options);

  const appendTailwindCss = async (frame) => {
    const iframe = frame.view.getEl();

    if (!iframe) return;

    const { tailwindPlayCdn, plugins, config, cover } = options;
    const init = () => {
      iframe.contentWindow.tailwind.config = config;
    };

    const script = document.createElement("script");
    script.src =
      tailwindPlayCdn + (plugins.length ? `?plugins=${plugins.join()}` : "");
    script.onload = init;

    const cssStyle = document.createElement("style");
    cssStyle.innerHTML = cover;

    // checks iframe is ready before loading Tailwind CSS - issue with firefox
    const f = setInterval(() => {
      const doc = iframe.contentDocument;
      if (doc.readyState === "complete") {
        doc.head.appendChild(script);
        doc.head.appendChild(cssStyle);
        clearInterval(f);
      }
    }, 100);
  };

  editor.Canvas.getModel()["on"]("change:frames", (m, frames) => {
    frames.forEach((frame) =>
      frame.once("loaded", () => appendTailwindCss(frame))
    );
  });
};
