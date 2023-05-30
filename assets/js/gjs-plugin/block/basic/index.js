import grapejs from "grapesjs";
import iconImg from "../../img";

export default grapejs.plugins.add("tailwind-basic", (editor, options) => {
  const { Blocks, Components } = editor;

  const addCmp = ({ type, component, props }) => {
    Components.addType(type, {
      model: {
        defaults: {
          ...props,
          component: component,
        },
      },
      isComponent: (el) => el.tagName === type.toUpperCase(),
    });

    Blocks.add(type, {
      label: iconImg(type),
      category: "Tailwind Basic",
      content: {
        type,
      },
    });
  };

  addCmp({
    type: "1 Column",
    component: [],
    props: {
      attributes: { class: "grid grid-cols-1 p-3" },
      components: [
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
      ],
    },
  });

  addCmp({
    type: "2 Columns",
    component: [],
    props: {
      attributes: { class: "grid grid-cols-2 p-3" },
      components: [
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
      ],
    },
  });

  addCmp({
    type: "3 Columns",
    component: [],
    props: {
      attributes: { class: "grid grid-cols-3 p-3" },
      components: [
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
        {
          type: "cell",
          attributes: { class: "h-16" },
        },
      ],
    },
  });

  addCmp({
    type: "2 Columns 3/7",
    component: [],
    props: {
      attributes: { class: "grid grid-cols-7 p-3" },
      components: [
        {
          type: "cell",
          attributes: { class: "h-16 col-span-2" },
        },
        {
          type: "cell",
          attributes: { class: "h-16 col-span-5" },
        },
      ],
    },
  });

  addCmp({
    type: "Text",
    component: [],
    props: {
      attributes: {
        class: "text-gray-700 p-3",
        editable: true,
      },
      components: [
        {
          tagName: "span",
          type: "text",
          components: [
            {
              type: "textnode",
              content: "Text here",
            },
          ],
        },
      ],
    },
  });
});
