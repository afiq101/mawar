<script setup>
const isVertical = ref(true);
const isDesktop = ref(true);

const emit = defineEmits(["toggleMenu"]);

// const { locale } = useI18n();
const colorMode = useColorMode();
const langList = languageList();

const locale = ref("en");

// Change color mode
function setColorMode() {
  if (colorMode.preference == "light") {
    colorMode.preference = "dark";

    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  } else {
    colorMode.preference = "light";

    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}

// Toggle Open/Close menu
const toggleMenu = (event) => {
  emit("toggleMenu", event);
};

// Focus on search input
function toggleSearch() {
  document.getElementById("header-search").value = "";
  document.getElementById("header-search").focus();
}

// Change language
const changeLanguage = (lang) => {
  locale.value = lang;
};

const languageNow = computed(() => {
  return langList.find((lang) => lang.value == locale.value);
});

onMounted(() => {
  // If mobile toggleMenu
  if (window.innerWidth < 768) {
    emit("toggleMenu", true);
  }
});
</script>

<template>
  <div
    class="w-header z-20 bg-white dark:bg-slate-800 fixed top-0 right-0 px-5 py-3 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <div class="flex items-stretch justify-between">
      <div v-if="isVertical" class="flex">
        <span class="flex items-center justify-center">
          <button class="icon-btn h-10 w-10 rounded-full" @click="toggleMenu">
            <Icon name="ic:round-menu" class="" /></button
        ></span>
      </div>
      <div class="flex" v-else>
        <nuxt-link to="/">
          <div class="flex flex-auto gap-3 justify-center items-center">
            <img
              class="h-24 block dark:hidden"
              src="@/assets/img/logo/logo-full-transparent.webp"
              alt=""
            />
            <img
              class="h-24 hidden dark:block"
              src="@/assets/img/logo/logo-full-transparent-white.webp"
              alt=""
            />
            <!-- <span
            v-if="isDesktop"
            class="text-xl font-semibold text-primary dark:text-white"
            >Mawar</span
          > -->
          </div>
        </nuxt-link>
      </div>

      <div class="flex gap-2 item-center justify-items-end">
        <VDropdown placement="bottom-end" distance="13" name="language">
          <button class="icon-btn h-10 w-10 rounded-full">
            <country-flag :country="languageNow.flagCode" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-32">
              <li
                v-for="lang in langList"
                class="flex items-center justify-center hover:bg-slate-200 hover:dark:bg-slate-700"
              >
                <button
                  @click="changeLanguage(lang.value)"
                  class="w-full py-2 px-2 flex justify-center items-center h-10"
                >
                  <div class="ml-3 flex justify-center items-center">
                    <country-flag :country="lang.flagCode" />
                  </div>
                  <span class="grow">{{ lang.name }}</span>
                </button>
              </li>
            </ul>
          </template>
        </VDropdown>
        <button class="icon-btn h-10 w-10 rounded-full" @click="setColorMode">
          <Icon size="22px" name="mdi:theme-light-dark" />
        </button>
        <button class="icon-btn h-10 w-10 rounded-full">
          <Icon @click="toggleSearch" name="ic:round-search" class="" />
        </button>

        <VDropdown placement="bottom-end" distance="13" name="notification">
          <button class="relative icon-btn h-10 w-10 rounded-full">
            <span
              class="w-3 h-3 absolute top-1 right-2 rounded-full bg-primary"
            ></span>
            <Icon name="ic:round-notifications-none" class="" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-80">
              <li class="d-head flex items-center justify-between py-2 px-4">
                <span class="font-semibold">Notification</span>
                <div
                  class="flex items-center text-primary cursor-pointer hover:underline"
                >
                  <a class="ml-2">View All</a>
                </div>
              </li>
              <perfect-scrollbar>
                <li>
                  <div class="bg-slate-100 dark:bg-slate-700 py-2 px-4">
                    Today
                  </div>
                  <a class="py-2 px-4 block">
                    <div class="flex items-center">
                      <Icon
                        name="ic:outline-circle"
                        class="text-primary flex-none"
                      />
                      <span class="mx-2"
                        >Terdapat Satu Pembayaran yang berlaku menggunakan bil
                        Kuih Raya Cik Kiah</span
                      >
                      <div class="w-12 h-12 rounded-full ml-auto flex-none">
                        <img
                          class="rounded-full"
                          src="@/assets/img/user/default.svg"
                        />
                      </div>
                    </div>
                  </a>
                  <a class="py-2 px-4 block">
                    <div class="flex items-center">
                      <Icon
                        name="ic:outline-circle"
                        class="text-primary flex-none"
                      />
                      <span class="mx-2"
                        >Terdapat Satu Pembayaran yang berlaku menggunakan bil
                        Mercun</span
                      >
                      <div class="w-12 h-12 rounded-full ml-auto flex-none">
                        <img
                          class="rounded-full"
                          src="@/assets/img/user/default.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </a>
                </li>
              </perfect-scrollbar>
            </ul>
          </template>
        </VDropdown>

        <VDropdown placement="bottom-end" distance="13" name="profile">
          <button
            class="icon-btn px-2 rounded-lg border border-white md:border-gray-200 dark:border-gray-700"
          >
            <img
              class="w-8 h-8 object-cover rounded-full"
              src="@/assets/img/user/default.svg"
            />
            <div
              v-if="isDesktop"
              class="grid grid-cols-1 text-left ml-3 flex-none"
            >
              <p class="font-semibold text-sm truncate w-24 mb-0">John Doe</p>
              <span class="font-medium text-xs truncate w-24"
                >RM 10,000.00</span
              >
            </div>
            <Icon name="ic:outline-keyboard-arrow-down" class="ml-3" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-52">
              <!-- <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-view-sidebar" class="mr-2" />
                  {{ isVertical ? "Horizontal Layout" : "Vertical Layout" }}
                </a>
              </li> -->
              <!-- <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-account-circle" class="mr-2" />
                  Account
                </a>
              </li>
              <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-settings" class="mr-2" />
                  Setting
                </a>
              </li> -->
              <li>
                <NuxtLink
                  to="/logout"
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-logout" class="mr-2" />
                  Logout
                </NuxtLink>
                <!-- <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                 
                </a> -->
              </li>
            </ul>
          </template>
        </VDropdown>
      </div>
    </div>
  </div>

  <!-- Search Nav for Layout Vertical -->
  <div
    tabindex="0"
    class="w-header-search bg-white dark:bg-slate-800 px-4 z-40 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900 -top-20 focus-within:top-0 right-0"
  >
    <Icon name="ic:outline-search" class="" />
    <input
      id="header-search"
      type="text"
      class="w-full ml-2 px-2 py-3 appearance-none text-md rounded-lg focus:outline-none dark:bg-slate-800"
      name="Search"
      placeholder="Search..."
    />
  </div>
</template>
