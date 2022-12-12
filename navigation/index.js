export default [
  {
    "header": "",
    "description": "",
    "child": [
      {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "ic:outline-dashboard",
        "child": [],
        "meta": {
          "auth": {
            "role": [
              "Developer",
              "Admin"
            ]
          }
        }
      }
    ]
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/admin/menu-editor",
        "child": []
      },
      {
        "title": "Manage Users",
        "path": "/admin/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/admin/user-management/user-list",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/admin/user-management/role-list",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content Editor",
        "path": "/admin/content-editor",
        "icon": "mdi:pencil-ruler",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "user": [
          "admin"
        ]
      }
    }
  }
]