<script setup>
definePageMeta({
  title: "Role List",
});

const userList = ref([]);
const userRoleList = ref([]);

const showModal = ref(false);
const showModalForm = ref({
  username: "",
  fullname: "",
  email: "",
  password: "",
  role: "",
  status: "",
});
const modalType = ref("");

const { data } = await useFetch("/api/admin/user/list");

// Rename the key
if (data.value.statusCode === 200) {
  userList.value = data.value.data.map((user) => ({
    username: user.userUsername,
    fullname: user.userFullName,
    email: user.userEmail,
    role: user.role.roleName,
    status: user.userStatus,
    action: null,
  }));
}

async function getRole() {
  console.log("m,aass");
  const { data } = await useFetch("/api/admin/role/list");
  console.log(data.value);
  if (data.value.statusCode === 200) {
    userRoleList.value = data.value.data.map((role) => ({
      label: role.roleID,
      value: role.roleName,
    }));

    console.log(userRoleList.value);
  }
}

const openModal = async (value, type) => {
  modalType.value = type;
  await getRole();

  showModalForm.value.username = value.username;
  showModalForm.value.fullname = value.fullname;
  showModalForm.value.email = value.email;
  showModalForm.value.role = value.role;
  showModalForm.value.status = value.status;

  showModal.value = true;
};
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
      <template #header> </template>
      <template #body>
        <div class="flex justify-end items-center mb-4">
          <rs-button>
            <Icon name="material-symbols:add" class="mr-1"></Icon>
            Add User
          </rs-button>
        </div>
        <rs-table
          v-if="userList"
          :data="userList"
          :options="{
            variant: 'default',
            striped: true,
            borderless: true,
          }"
          advanced
        >
          <template v-slot:action="data">
            <div
              class="flex justify-center items-center"
              v-if="data.value.role != 'Super Admin'"
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
      </template>
    </rs-card>

    <rs-modal
      :title="modalType == 'edit' ? 'Edit User' : 'Add User'"
      v-model="showModal"
    >
      <FormKit type="form">
        <FormKit
          type="text"
          v-model="showModalForm.username"
          name="username"
          label="Username"
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
        />
        <FormKit
          type="text"
          v-model="showModalForm.password"
          name="password"
          label="Password"
        />
        <FormKit
          type="select"
          :options="userRoleList"
          v-model="showModalForm.role"
          name="role"
          label="Role"
        />
        <FormKit
          type="text"
          v-model="showModalForm.status"
          name="status"
          label="Status"
        />
      </FormKit>
    </rs-modal>
  </div>
</template>
