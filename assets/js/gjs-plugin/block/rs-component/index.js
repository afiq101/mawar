import grapejs from "grapesjs";

import iconImg from "../../img";
import RsAlert from "@@/components/RsAlert";
import RsBadge from "@@/components/RsBadge";
import RsButton from "@@/components/RsButton";

export default grapejs.plugins.add("rs-block", (editor, options) => {
  const { Blocks, Components } = editor;

  const addCmp = ({ type, component, props }) => {
    Components.addType(type, {
      extend: "vue-component",
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
      category: "RS Components",
      content: {
        type,
      },
    });
  };

  // ======================================
  // ========= Declare components =========
  // ======================================

  addCmp({
    type: "rs-alert",
    component: RsAlert,
    props: {
      attributes: {
        variant: "primary",
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
      traits: [
        {
          type: "select",
          label: "Variant",
          name: "variant",
          options: [
            { value: "primary", name: "Primary" },
            { value: "secondary", name: "Secondary" },
            { value: "info", name: "Info" },
            { value: "success", name: "Success" },
            { value: "warning", name: "Warning" },
            { value: "danger", name: "Danger" },
          ],
        },
      ],
    },
  });

  addCmp({
    type: "rs-badge",
    component: RsBadge,
    props: {
      attributes: {
        variant: "primary",
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
      traits: [
        {
          type: "select",
          label: "Variant",
          name: "variant",
          options: [
            { value: "primary", name: "Primary" },
            { value: "secondary", name: "Secondary" },
            { value: "info", name: "Info" },
            { value: "success", name: "Success" },
            { value: "warning", name: "Warning" },
            { value: "danger", name: "Danger" },
          ],
        },
      ],
    },
  });

  addCmp({
    type: "rs-button",
    component: RsButton,
    props: {
      attributes: {
        variant: "primary",
        size: "md",
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
      traits: [
        {
          type: "select",
          label: "Variant",
          name: "variant",
          options: [
            { value: "primary", name: "Fill Primary" },
            { value: "secondary", name: "Fill Secondary" },
            { value: "info", name: "Fill Info" },
            { value: "success", name: "Fill Success" },
            { value: "warning", name: "Fill Warning" },
            { value: "danger", name: "Fill Danger" },

            { value: "primary-outline", name: "Outline Primary" },
            { value: "secondary-outline", name: "Outline Secondary" },
            { value: "info-outline", name: "Outline Info" },
            { value: "success-outline", name: "Outline Success" },
            { value: "warning-outline", name: "Outline Warning" },
            { value: "danger-outline", name: "Outline Danger" },

            { value: "primary-text", name: "Text Primary" },
            { value: "secondary-text", name: "Text Secondary" },
            { value: "info-text", name: "Text Info" },
            { value: "success-text", name: "Text Success" },
            { value: "warning-text", name: "Text Warning" },
            { value: "danger-text", name: "Text Danger" },
          ],
        },
        {
          type: "select",
          label: "Size",
          name: "size",
          options: [
            { value: "sm", name: "Small" },
            { value: "md", name: "Medium" },
            { value: "lg", name: "Large" },
          ],
        },
        {
          type: "checkbox",
          label: "Disabled",
          name: "disabled",
        },
      ],
    },
  });
});
