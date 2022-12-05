<script setup>
definePageMeta({
  title: "User List",
  keepalive: {
    exclude: ["rs-table"],
  },
});

const { $swal } = useNuxtApp();

const userList = ref([]);
const userRoleList = ref([]);

const showModal = ref(false);
const showModalForm = ref({
  username: "",
  fullname: "",
  email: "",
  phone: "",
  password: "",
  role: "",
  status: "",
});
const modalType = ref("");

const showModalRole = ref(false);
const showModalRoleForm = ref({
  role: "",
  description: "",
});

const statusDropdown = ref([
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]);

const userListbyRole = ref([]);

// Call API
onMounted(async () => {
  await getUserList();
  await getRoleList();
});

const getUserList = async () => {
  console.log("masiulll");
  const { data } = await useFetch("/api/admin/user/list", {
    initialCache: false,
  });

  console.log(data.value);

  // Rename the key
  if (data.value?.statusCode === 200) {
    userList.value = data.value.data.map((user) => ({
      username: user.userUsername,
      fullname: user.userFullName,
      email: user.userEmail,
      role: {
        label: user.role.roleName,
        value: user.role.roleID,
      },
      status: user.userStatus,
      action: null,
    }));

    groupUserByRole();
  }
};

const getRoleList = async () => {
  const { data } = await useFetch("/api/admin/role/list", {
    initialCache: false,
  });

  if (data.value.statusCode === 200) {
    userRoleList.value = data.value.data.map((role) => ({
      label: role.roleName,
      value: role.roleID,
    }));
  }
};

// Open Modal Add or Edit User
const openModal = async (value, type) => {
  modalType.value = type;

  if (type == "edit") {
    showModalForm.value.username = value.username;
    showModalForm.value.fullname = value.fullname;
    showModalForm.value.email = value.email;
    showModalForm.value.role = value.role?.value;
    showModalForm.value.status = value.status;
  } else {
    showModalForm.value.username = "";
    showModalForm.value.fullname = "";
    showModalForm.value.email = "";
    showModalForm.value.role = 2;
    showModalForm.value.status = "";
  }

  showModalRole.value = false;
  showModal.value = true;
};

// Open Modal Add Role
const openModalRole = async () => {
  showModalRoleForm.value.role = "";
  showModalRoleForm.value.description = "";

  showModal.value = false;
  showModalRole.value = true;
};

// Close Modal Role
const closeModalRole = () => {
  showModalRole.value = false;
  showModal.value = true;
};

const saveUser = async () => {
  if (modalType.value == "add") {
    const { data } = await useFetch("/api/admin/user/add", {
      initialCache: false,
      method: "POST",
      body: JSON.stringify(showModalForm.value),
    });

    if (data.value.statusCode === 200) {
      $swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success",
        text: "User has been added",
        timer: 2000,
        showConfirmButton: false,
      });
      await getUserList();
      showModal.value = false;
    } else {
      $swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: data.value.message,
      });
    }
  } else {
    const { data } = await useFetch("/api/admin/user/edit", {
      initialCache: false,
      method: "POST",
      body: JSON.stringify(showModalForm.value),
    });

    if (data.value.statusCode === 200) {
      $swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success",
        text: "User has been updated",
        timer: 2000,
        showConfirmButton: false,
      });
      await getUserList();

      showModal.value = false;
    } else {
      $swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: data.value.message,
      });
    }
  }
};

const saveRole = async () => {
  if (
    showModalRoleForm.value.role == "" ||
    showModalRoleForm.value.role == " "
  ) {
    return false;
  }

  const { data } = await useFetch("/api/admin/role/add", {
    method: "POST",
    body: JSON.stringify({
      name: showModalRoleForm.value.role,
      description: showModalRoleForm.value.description,
    }),
  });

  if (data.value.statusCode === 200) {
    $swal.fire({
      position: "top-end",
      title: "Success",
      text: data.value.message,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    await getRoleList();
    closeModalRole();
  } else {
    $swal.fire({
      position: "top-end",
      title: "Error",
      text: data.value.message,
      icon: "error",
    });
  }
};

function groupUserByRole() {
  userListbyRole.value = userList.value.reduce((acc, cur) => {
    const { role } = cur;
    if (!acc[role.value]) {
      acc[role.value] = {
        role: role,
        users: [],
      };
    }
    acc[role.value].users.push(cur);
    return acc;
  }, {});
}
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This page is only accessible by admin users. You can manage users
          here. You can also add new users. You can also change user roles.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="pt-2">
        <rs-tab fill>
          <rs-tab-item title="All User">
            <div class="flex justify-end items-center mb-4">
              <rs-button @click="openModal(null, 'add')">
                <Icon name="material-symbols:add" class="mr-1"></Icon>
                Add User
              </rs-button>
            </div>
            <rs-table
              v-if="userList && userList.length > 0"
              :data="userList"
              :options="{
                variant: 'default',
                striped: true,
                borderless: true,
              }"
              advanced
            >
              <template v-slot:role="data">
                {{ data.text?.label }}
              </template>
              <template v-slot:action="data">
                <div
                  class="flex justify-center items-center"
                  v-if="data.value.role?.value != '1'"
                >
                  <Icon
                    name="material-symbols:edit-outline-rounded"
                    class="text-primary-400 hover:text-primary-500 cursor-pointer mr-1"
                    size="22"
                    @click="openModal(data.value, 'edit')"
                  ></Icon>
                  <Icon
                    name="material-symbols:close-rounded"
                    class="text-primary-400 hover:text-primary-500 cursor-pointer"
                    size="22"
                    @click="deleteMenu(data.value)"
                  ></Icon>
                </div>
                <div class="flex justify-center items-center" v-else>-</div>
              </template>
            </rs-table>
          </rs-tab-item>
          <rs-tab-item title="User Tree">
            <div v-for="(value, index) in userListbyRole">
              {{ value }}
            </div>
          </rs-tab-item>
        </rs-tab>
      </div>
    </rs-card>

    <rs-modal
      :title="modalType == 'edit' ? 'Edit User' : 'Add User'"
      ok-title="Save"
      :ok-callback="saveUser"
      v-model="showModal"
    >
      <FormKit
        type="text"
        v-model="showModalForm.username"
        name="username"
        label="Username"
        :disabled="modalType == 'edit' ? true : false"
      />
      <FormKit
        type="text"
        v-model="showModalForm.fullname"
        name="fullname"
        label="Fullname"
      />
      <FormKit
        type="text"
        v-model="showModalForm.email"
        name="email"
        label="Email"
        validation="email"
        validation-visibility="dirty"
      />
      <FormKit
        type="mask"
        v-model="showModalForm.phone"
        name="phone"
        label="Phone"
        mask="###########"
      />
      <FormKit
        type="select"
        :options="userRoleList"
        v-model="showModalForm.role"
        name="role"
      >
        <template #label>
          <div class="flex justify-between items-center mb-2">
            <label
              class="formkit-label font-semibold text-gray-700 dark:text-gray-200 blockfont-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
              for="input_4"
            >
              Role
            </label>

            <rs-button size="sm" @click="openModalRole"> Add Role </rs-button>
          </div>
        </template>
      </FormKit>
      <FormKit
        type="select"
        :options="statusDropdown"
        v-model="showModalForm.status"
        name="status"
        label="Status"
      />
    </rs-modal>

    <!-- Modal Role -->
    <rs-modal
      title="Add Role"
      ok-title="Save"
      cancel-title="Back"
      :cancel-callback="closeModalRole"
      :ok-callback="saveRole"
      v-model="showModalRole"
    >
      <FormKit
        type="text"
        v-model="showModalRoleForm.role"
        label="Name"
        validation="required"
        validation-visibility="live"
      />
      <FormKit
        type="textarea"
        v-model="showModalRoleForm.description"
        label="Description"
      />
    </rs-modal>
  </div>
</template>
