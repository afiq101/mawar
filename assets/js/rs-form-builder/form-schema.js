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
  },
  config: {
    global: {
      form: {
        name: "Form Name",
        description: "Form Description",
      },
      input: {
        default: {
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
          type: {
            text: {
              value: "John Doe",
            },
            number: {
              value: 0,
            },
            email: {
              value: "johndoe@rose.ui",
            },
            tel: {
              value: "01234567890",
            },
            url: {
              value: "https://www.google.com/",
            },
            password: {
              value: "password",
            },
            date: {
              value: "2023-01-01",
            },
            textarea: {
              value: "Textarea",
            },
            checkbox: {
              value: "option_1",
              options: [
                {
                  label: "Option 1",
                  value: "option_1",
                },
                {
                  label: "Option 2",
                  value: "option_2",
                },
              ],
            },
            radio: {
              value: "option_1",
              options: [
                {
                  label: "Option 1",
                  value: "option_1",
                },
                {
                  label: "Option 2",
                  value: "option_2",
                },
              ],
            },
            file: {
              value: "file",
            },
            submit: {
              value: "Submit",
            },
            button: {
              value: "Button",
            },
          },
        },
      },
      validation: {
        rules: [
          "required",
          "between:[[no_1]],[[no_2]]",
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
};
