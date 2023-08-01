export default [
  {
    header: "",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
  },
  {
    header: "UI Elements",
    description: "Component for the ui",
    child: [
      {
        title: "Component",
        icon: "ic:outline-settings-input-component",
        child: [
          {
            title: "Alert",
            path: "/ui/component/alert",
          },
          {
            title: "Badges",
            path: "/ui/component/badges",
          },
          {
            title: "Buttons",
            path: "/ui/component/buttons",
          },
          {
            title: "Calendar",
            path: "/ui/component/calendar",
          },
          {
            title: "Carousel",
            path: "/ui/component/carousel",
          },
          {
            title: "Collapse",
            path: "/ui/component/collapse",
          },
          {
            title: "Dropdown",
            path: "/ui/component/dropdown",
          },
          {
            title: "Modal",
            path: "/ui/component/modal",
          },
          {
            title: "Tab",
            path: "/ui/component/tab",
          },
          {
            title: "Progress",
            path: "/ui/component/progress",
          },
        ],
      },
      {
        title: "Form",
        icon: "ic:outline-menu-book",
        child: [
          {
            title: "Element",
            child: [
              {
                title: "Input",
                path: "/form/element/input",
              },
              {
                title: "Input Group",
                path: "/form/element/input-group",
              },
              {
                title: "Input Mask",
                path: "/form/element/input-mask",
              },
              {
                title: "Textarea",
                path: "/form/element/textarea",
              },
              {
                title: "Number",
                path: "/form/element/number",
              },
              {
                title: "Password",
                path: "/form/element/password",
              },
              {
                title: "Date & Time",
                path: "/form/element/date-time",
              },
              {
                title: "Radio",
                path: "/form/element/radio",
              },
              {
                title: "Checkbox",
                path: "/form/element/checkbox",
              },
              {
                title: "Select",
                path: "/form/element/select",
              },
              {
                title: "File",
                path: "/form/element/file",
              },
              {
                title: "Custom",
                path: "/form/element/custom",
              },
              {
                title: "VCalendar",
                path: "/form/element/vcalendar",
              },
              {
                title: "Vue Select",
                path: "/form/element/vue-select",
              },
              {
                title: "Vue Quill",
                path: "/form/element/vue-quill",
              },
            ],
          },
          {
            title: "Wizard",
            path: "/form/wizard",
          },
        ],
      },
      {
        title: "Table",
        icon: "ic:outline-grid-on",
        child: [
          {
            title: "Basic",
            path: "/table/basic",
          },
          {
            title: "Advanced",
            path: "/table/advanced",
          },
        ],
      },  
    ],
  },
  {
    header: "Administration",
    description: "Manage your application",
    child: [
      {
        title: "Configuration",
        icon: "ic:outline-settings",
        child: [
          {
            title: "Environment",
            path: "/devtool/config/environment",
          },
        ],
      },
      {
        title: "Menu Editor",
        icon: "ci:menu-alt-03",
        path: "/devtool/menu-editor",
        child: [],
      },
      {
        title: "Manage Users",
        path: "/devtool/user-management",
        icon: "ph:user-circle-gear",
        child: [
          {
            title: "User List",
            path: "/devtool/user-management/user-list",
            icon: "",
            child: [],
          },
          {
            title: "Role List",
            path: "/devtool/user-management/role-list",
            icon: "",
            child: [],
          },
        ],
      },
      {
        title: "Content",
        icon: "mdi:pencil-ruler",
        child: [
          {
            title: "Editor",
            path: "/devtool/content-editor",
          },
          {
            title: "Template",
            path: "/devtool/content-editor/template",
          },
        ],
      },
      {
        title: "API Editor",
        path: "/devtool/api-editor",
        icon: "material-symbols:api-rounded",
        child: [],
      },
      {
        title: "Form Builder",
        path: "/devtool/form-builder",
        icon: "mdi:form-select",
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
  {
    header: "Help",
    description: "Help and documentation",
    child: [
      {
        title: "Mawar Docs",
        icon: "solar:book-bookmark-minimalistic-bold",
        path: "https://mawar-cms-docs.vercel.app",
        child: [],
      },
      {
        title: "RoseUI Components",
        icon: "material-symbols:settings-input-component-outline-rounded",
        path: "https://roseui-nuxt.vercel.app",
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
];
