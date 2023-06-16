export default {
  options: {
    inputs: [
      "text",
      "textarea",
      "number",
      "password",
      "select",
      "checkbox",
      "radio",
      "date",
      "file",
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
            text: "Question",
          },
          placeholder: {
            show: true,
            text: "Placeholder",
          },
          help: {
            show: false,
            text: "This is a help text",
          },
          type: {
            text: {
              value: "Short answer text",
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
              value: "Paragraph text",
            },
            checkbox: {
              value: 1,
              options: [
                {
                  label: "Option 1",
                  value: 1,
                },
              ],
            },
            radio: {
              value: 1,
              options: [
                {
                  label: "Option 1",
                  value: 1,
                },
              ],
            },
            select: {
              value: 1,
              options: [
                {
                  label: "Option 1",
                  value: 1,
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
        variable: {
          no: 0,
          no_1: 0,
          no_2: 0,
          text: "text",
          date: "2023-01-01",
          date_1: "2023-01-01",
          date_2: "2023-01-01",
          format: "YYYY-MM-DD",
        },
        rules: [
          {
            label: "Required",
            value: "required",
            form: [
              {
                input: "checkbox",
                label: "Required",
                options: [{ label: "Yes", value: true }],
                value: true,
              },
            ],
          },
          {
            label: "Email",
            value: "email",
            form: [
              {
                input: "checkbox",
                label: "Email",
                options: [{ label: "Yes", value: true }],
                value: true,
              },
            ],
          },
          {
            label: "Length",
            value: "length:[[no_1]], [[no_2]]",
            form: [
              {
                input: "number",
                label: "Min Characters",
                variable: "no_1",
                options: [],
                value: 0,
              },
              {
                input: "number",
                label: "Max Characters",
                variable: "no_2",
                options: [],
                value: 1,
              },
            ],
          },
          {
            label: "Between",
            value: "between:[[no_1]],[[no_2]]",
            form: [
              {
                input: "number",
                label: "Min Number",
                variable: "no_1",
                options: [],
                value: 0,
              },
              {
                input: "number",
                label: "Max Number",
                variable: "no_2",
                options: [],
                value: 1,
              },
            ],
          },
          {
            label: "Date After",
            value: "date_after:[[date]]",
            form: [
              {
                input: "date",
                label: "Date After",
                options: [],
                value: "date",
              },
            ],
          },
          {
            label: "Date Before",
            value: "date_before:[[date]]",
            form: [
              {
                input: "date",
                label: "Date Before",
                variable: "date",
                options: [],
                value: "",
              },
            ],
          },
          {
            label: "Date Between",
            value: "date_between:[[date_1]], [[date_2]]",
            form: [
              {
                input: "date",
                label: "Date 1",
                variable: "date_1",
                options: [],
                value: "",
              },
              {
                input: "date",
                label: "Date 2",
                variable: "date_2",
                options: [],
                value: "",
              },
            ],
          },
          {
            label: "Matches",
            value: "matches:[[text]]",
            form: [
              {
                input: "select",
                label: "Predefined Regex",
                value: "",
                options: [
                  {
                    label: "Custom Regex",
                    help: "Add your own regex pattern",
                    value: "",
                  },
                  {
                    label: "Username",
                    help: "Username must be at least 6 characters",
                    value: "^[a-zA-Z0-9]{6,}$",
                  },
                  {
                    label: "Password",
                    help: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                    value:
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                  },
                  {
                    label: "Phone Number",
                    help: "Phone number must be in the format 01234567890",
                    value: "^[0-9]{11}$",
                  },
                ],
              },
              {
                input: "text",
                label: "Regex Pattern",
                help: "Add your own regex pattern",
                variable: "text",
                options: [],
                value: "",
              },
            ],
          },
        ],
        format: {
          date: {
            token: ["MM", "M", "DD", "D", "YY", "YYYY"],
            options: [
              {
                label: "YYYY-MM-DD",
                description: "Year, Month, Day",
                value: "YYYY-MM-DD",
              },
              {
                label: "DD-MM-YYYY",
                description: "Day, Month, Year",
                value: "DD-MM-YYYY",
              },
              {
                label: "MM-DD-YYYY",
                description: "Month, Day, Year",
                value: "MM-DD-YYYY",
              },
              {
                label: "DD/MM/YYYY",
                description: "Day, Month, Year",
                value: "DD/MM/YYYY",
              },
            ],
          },
        },
      },
    },
  },
};
