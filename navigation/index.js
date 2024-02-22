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
      {
        title: "Playground",
        path: "/playground",
        icon: "ic:outline-play-circle",
        child: [],
        meta: {},
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
        title: "Documentation",
        icon: "solar:book-bookmark-minimalistic-bold",
        path: "https://mawar-cms-docs.vercel.app",
        child: [],
      },
      {
        title: "UI Components",
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
  {
    header: "RoseUI",
    description: "RoseUI Documentation",
    child: [
      {
        title: "Dashboard",
        path: "/roseui/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
      },
      {
        title: "Apps",
        icon: "ic:outline-apps",
        child: [
          {
            title: "Pages",
            icon: "ic:outline-insert-drive-file",
            child: [
              {
                title: "Authentication",
                child: [
                  {
                    title: "Login V1",
                    path: "/roseui/auth/login-v1",
                  },
                  {
                    title: "Login V2",
                    path: "/roseui/auth/login-v2",
                  },
                  {
                    title: "Register V1",
                    path: "/roseui/auth/register-v1",
                  },
                  {
                    title: "Register V2",
                    path: "/roseui/auth/register-v2",
                  },
                  {
                    title: "Forgot Password V1",
                    path: "/roseui/auth/forgot-password-v1",
                  },
                  {
                    title: "Forgot Password V2",
                    path: "/roseui/auth/forgot-password-v2",
                  },
                  {
                    title: "Reset Password V1",
                    path: "/roseui/auth/reset-password-v1",
                  },
                  {
                    title: "Reset Password V2",
                    path: "/roseui/auth/reset-password-v2",
                  },
                ],
              },
              {
                title: "Error 404",
                path: "/roseui/error/404",
              },
              {
                title: "Error 500",
                path: "/roseui/error/500",
              },
            ],
          },
          {
            title: "E-commerce",
            icon: "ic:outline-shopping-bag",
            child: [
              {
                title: "Products",
                path: "/roseui/apps/ecommerce/products",
              },
              {
                title: "Product Detail",
                path: "/roseui/apps/ecommerce/product-detail?sku=P-1001",
              },
              {
                title: "Checkout",
                path: "/roseui/apps/ecommerce/checkout",
              },
            ],
          },
        ],
      },
      {
        title: "UI Elements",
        icon: "ic:outline-menu-book",
        child: [
          {
            title: "Typography",
            path: "/roseui/ui/typography",
            icon: "ic:outline-alternate-email",
          },
          {
            title: "Colors",
            path: "/roseui/ui/colors",
            icon: "ic:outline-water-drop",
          },
          {
            title: "Icon",
            icon: "ic:outline-flag-circle",
            child: [
              {
                title: "Nuxt Icons",
                path: "/roseui/ui/icon/nuxt-icon",
              },
            ],
          },
          {
            title: "Component",
            icon: "ic:outline-settings-input-component",
            child: [
              {
                title: "Alert",
                path: "/roseui/ui/component/alert",
              },
              {
                title: "Badges",
                path: "/roseui/ui/component/badges",
              },
              {
                title: "Buttons",
                path: "/roseui/ui/component/buttons",
              },
              {
                title: "Calendar",
                path: "/roseui/ui/component/calendar",
              },
              {
                title: "Carousel",
                path: "/roseui/ui/component/carousel",
              },
              {
                title: "Collapse",
                path: "/roseui/ui/component/collapse",
              },
              {
                title: "Dropdown",
                path: "/roseui/ui/component/dropdown",
              },
              {
                title: "Modal",
                path: "/roseui/ui/component/modal",
              },
              {
                title: "Tab",
                path: "/roseui/ui/component/tab",
              },
              {
                title: "Progress",
                path: "/roseui/ui/component/progress",
              },
            ],
          },
          {
            title: "Chart",
            icon: "ic:outline-pie-chart",
            child: [
              {
                title: "Apex Chart",
                path: "/roseui/ui/chart/apex-chart",
              },
              {
                title: "Chartjs",
                path: "/roseui/ui/chart/chartjs",
              },
            ],
          },
        ],
      },
      {
        title: "Forms & Tables",
        icon: "ic:outline-menu-book",
        child: [
          {
            title: "Form",
            icon: "ic:outline-menu-book",
            child: [
              {
                title: "Element",
                child: [
                  {
                    title: "Input",
                    path: "/roseui/form/element/input",
                  },
                  {
                    title: "Input Group",
                    path: "/roseui/form/element/input-group",
                  },
                  {
                    title: "Input Mask",
                    path: "/roseui/form/element/input-mask",
                  },
                  {
                    title: "Textarea",
                    path: "/roseui/form/element/textarea",
                  },
                  {
                    title: "Number",
                    path: "/roseui/form/element/number",
                  },
                  {
                    title: "Password",
                    path: "/roseui/form/element/password",
                  },
                  {
                    title: "Date & Time",
                    path: "/roseui/form/element/date-time",
                  },
                  {
                    title: "Radio",
                    path: "/roseui/form/element/radio",
                  },
                  {
                    title: "Checkbox",
                    path: "/roseui/form/element/checkbox",
                  },
                  {
                    title: "Select",
                    path: "/roseui/form/element/select",
                  },
                  {
                    title: "File",
                    path: "/roseui/form/element/file",
                  },
                  {
                    title: "Custom",
                    path: "/roseui/form/element/custom",
                  },
                  {
                    title: "VCalendar",
                    path: "/roseui/form/element/vcalendar",
                  },
                  {
                    title: "Vue Select",
                    path: "/roseui/form/element/vue-select",
                  },
                  {
                    title: "Vue Quill",
                    path: "/roseui/form/element/vue-quill",
                  },
                ],
              },
              {
                title: "Wizard",
                path: "/roseui/form/wizard",
              },
            ],
          },
          {
            title: "Table",
            icon: "ic:outline-grid-on",
            child: [
              {
                title: "Basic",
                path: "/roseui/table/basic",
              },
              {
                title: "Advanced",
                path: "/roseui/table/advanced",
              },
            ],
          },
        ],
      },
    ],
  },
];
