<script setup>
const isVertical = ref(true);
const isDesktop = ref(true);

const emit = defineEmits(["toggleMenu"]);

// const { locale } = useI18n();
// const colorMode = useColorMode();
const langList = languageList();

const locale = ref("en");

const themes = themeList();

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function rgbToHex(rgbString) {
  // Split the input string into an array of components
  const rgbArray = rgbString.split(",");

  // Convert each component to its numeric value
  const r = parseInt(rgbArray[0].trim(), 10);
  const g = parseInt(rgbArray[1].trim(), 10);
  const b = parseInt(rgbArray[2].trim(), 10);

  // Convert the numeric RGB values to hexadecimal
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  // Concatenate the components and return the final hexadecimal color code
  return `#${rHex}${gHex}${bHex}`;
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
  <div class="w-header">
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
            <ul class="header-dropdown w-full md:w-32 text-[#4B5563]">
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
        <VDropdown placement="bottom-end" distance="13" name="theme">
          <button class="icon-btn h-10 w-10 rounded-full">
            <Icon size="22px" name="material-symbols:format-paint-rounded" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-52 text-[#4B5563]">
              <li v-for="(val, index) in themes">
                <a
                  @click="setTheme(val.theme)"
                  class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <span class="capitalize"> {{ val.theme }} </span>
                  <div class="flex items-center gap-x-1">
                    <div
                      v-for="(color, index) in val.colors"
                      class="h-[25px] w-[10px] rounded-lg"
                      :style="{
                        backgroundColor: rgbToHex(color.value),
                      }"
                    ></div>
                  </div>
                </a>
              </li>
            </ul>
          </template>
        </VDropdown>

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
            <ul class="header-dropdown w-full md:w-80 text-[#4B5563]">
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
          <button class="icon-btn profile px-2">
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
            <ul class="header-dropdown w-full md:w-52 text-[#4B5563]">
              <li>
                <NuxtLink
                  to="/logout"
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-logout" class="mr-2" />
                  Logout
                </NuxtLink>
              </li>
            </ul>
          </template>
        </VDropdown>
      </div>
    </div>
  </div>

  <!-- Search Nav for Layout Vertical -->
  <div tabindex="0" class="w-header-search">
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

<style scoped>
:deep(.popper) {
  background: #e92791;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

:deep(.popper #arrow::before) {
  background: #e92791;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #e92791;
}
</style>
