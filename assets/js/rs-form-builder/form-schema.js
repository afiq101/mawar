export default {
  options: {
    inputs: [
      "text",
      "number",
      "email",
      "tel",
      "url",
      "password",
      "date",
      "textarea",
      "checkbox",
      "radio",
      "file",
      "submit",
      "button",
    ],
    config: {
      global: {
        form: {
          name: "Form Name",
          description: "Form Description",
        },
        input: {
          label: {
            show: true,
            text: "Label Name",
          },
          placeholder: {
            show: true,
            text: "Placeholder",
          },
          help: {
            show: true,
            text: "Help Text",
          },
        },
        validation: {
          options: [
            "required",
            "between:[[no_1]],[[no_2]]",
            "contains_lowercase",
            "contains_numeric",
            "contains_symbol",
            "contains_uppercase",
            "date_after:[[date]]",
            "date_before:[[date]]",
            "'date_between', date_1, date_2",
            "date_format:[[format]]",
            "email",
            "ends_with:[[text]]",
            "equals:[[text]]",
            "length:[[no_1]], [[no_2]]",
          ],
          format: {
            date: {
              tokenOptions: ["MM", "M", "DD", "D", "YY", "YYYY"],
            },
          },
        },
      },
    },
  },
};
