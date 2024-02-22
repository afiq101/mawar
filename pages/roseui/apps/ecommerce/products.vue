<script setup>
import products from "./data";
import category from "./category";
import { useLayoutStore } from "~/stores/layout";
import { useWindowSize } from "vue-window-size";

definePageMeta({
  title: "Products",
});

const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;
const { width } = useWindowSize();
const windowWidth = ref(width);

const data = ref(products);
const dataLength = ref(products.length);

const search = ref("");
const categorySelect = ref("");
const categories = ref(category);
const showFilter = ref(true);
const sort = ref("Featured");

const currentPage = ref(1);
const pageSize = ref(6);
const maxPageShown = ref(3);

async function navigateProductDetail(sku) {
  await navigateTo({
    path: "/apps/ecommerce/product-detail",
    query: {
      sku: sku,
    },
  });
}

// Computed product data based on search and category
const computedData = computed(() => {
  let result = [];
  let totalData = 0;
  result = data.value
    .filter((product) => {
      return product.name.toLowerCase().includes(search.value.toLowerCase());
    })
    .filter((_, index) => {
      let start = (currentPage.value - 1) * pageSize.value;
      let end = currentPage.value * pageSize.value;
      totalData++;
      if (index >= start && index < end) return true;
    });
  dataLength.value = totalData;
  return result;
});

// Watch categorySelect and update data from computedData
watch(categorySelect, (newVal) => {
  if (newVal) {
    data.value = products;
    data.value = data.value.filter((product) => {
      return product.category === newVal;
    });
  } else {
    data.value = products;
  }
});

const formatPrice = (price) => {
  return parseFloat(price)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatSold = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
};

const iconEvent = (e) => {
  e.stopPropagation();
  const icon = e.path[1];
  if (
    window.getComputedStyle(icon).fill == "rgb(169, 169, 169)" ||
    window.getComputedStyle(icon).stroke == "rgb(169, 169, 169)"
  ) {
    icon.style.fill = "#FF5A5F";
    icon.style.stroke = "#FF5A5F";
  } else {
    icon.style.fill = "#A9A9A9";
    icon.style.stroke = "#A9A9A9";
  }
};

// Filter Function
const isDesktop = computed(() => {
  return windowWidth.value >= mobileWidth ? true : false;
});

watch(isDesktop, (value) => {
  if (!value) showFilter.value = false;
  else showFilter.value = true;
});

onMounted(() => {
  if (!isDesktop.value) showFilter.value = false;
});

// Pagination Function
const totalPage = computed(() => {
  return Math.ceil(dataLength.value / pageSize.value);
});

const pageChange = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value * pageSize.value < dataLength.value)
    currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const pages = computed(() => {
  let totalPG = Math.ceil(dataLength.value / pageSize.value);
  const numShown = Math.min(maxPageShown.value, totalPG);
  let first = currentPage.value - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, totalPG - numShown + 1);
  return [...Array(numShown)].map((k, i) => i + first);
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <!-- Top Header -->
    <div class="product-header mb-2 flex justify-between items-center">
      <p class="ml-1 font-medium text-gray-500">
        {{ computedData.length }} results found
      </p>
      <FormKit
        type="select"
        v-model="sort"
        :options="['Featured', 'Highest Price', 'Lowest Price']"
        outer-class="mb-0"
      />
    </div>

    <FormKit
      v-model="search"
      placeholder="Search for a products..."
      type="search"
    />
    <!-- Filter n Categories -->
    <div class="filter-top-wrapper flex pb-4">
      <rs-button
        @click="showFilter ? (showFilter = false) : (showFilter = true)"
      >
        <Icon size="1.25rem" name="ic:outline-filter-alt"></Icon>
      </rs-button>
      <!-- <button
        class="flex items-center rounded-lg py-2 px-4 bg-white dark:bg-slate-800 dark:text-gray-300 hover:bg-slate-200 shadow-md shadow-slate-200 dark:shadow-slate-900"
      ></button> -->
      <NuxtScrollbar style="width: 100%">
        <div class="category-wrapper flex gap-x-4 pl-4">
          <rs-button
            @click="categorySelect = category.name"
            :class="{
              '!bg-secondary': categorySelect === category.name,
            }"
            v-for="(category, index) in categories"
            :key="index"
          >
            <span>{{ category.name }}</span>
          </rs-button>
        </div>
      </NuxtScrollbar>
    </div>

    <!-- Filter Content -->
    <div
      class="filter-wrapper fixed md:relative top-0 right-0 float-none md:float-left w-64 mr-0 md:mr-6 z-50 md:z-0"
      :class="{
        'filter-wrapper-show': showFilter,
        'filter-wrapper-hide': !showFilter,
      }"
    >
      <div
        class="filter-overlay visible md:invisible"
        :class="{
          show: showFilter,
          hide: !showFilter,
        }"
        @click="showFilter = false"
      ></div>

      <!-- Filter -->
      <rs-card
        class="p-4 rounded-none md:rounded-lg max-h-screen md:max-h-fit overflow-auto"
      >
        <div class="filter-title mb-4">
          <h3 class="flex items-center text-lg font-semibold">Search Filter</h3>
        </div>
        <span class="font-semibold">Categories</span>
        <FormKit
          type="radio"
          :options="[...categories.map((category) => category.name)]"
          :classes="{
            fieldset: 'border-none !p-0 mt-4',
          }"
        />
        <hr class="mb-4" />
        <span class="font-semibold">Price Range</span>
        <div class="flex items-center justify-center mt-4 gap-x-5">
          <FormKit type="number" placeholder="Min" outer-class="mb-0" />
          <div>-</div>
          <FormKit type="number" placeholder="Max" outer-class="mb-0" />
        </div>
        <hr class="my-4" />
        <span class="font-semibold">Brand</span>
        <FormKit
          type="radio"
          :options="['Asus', 'Samsung', 'MSI', 'Apple', 'Playstation 5']"
          :classes="{
            fieldset: 'border-none !p-0 mt-4',
          }"
        />
        <hr class="my-4" />
        <rs-button class="w-full" @click="(categorySelect = ''), (search = '')"
          >Clear Filter</rs-button
        >
      </rs-card>
    </div>

    <!-- Products -->
    <div
      class="container-wrapper ml-0 xl:ml-70"
      :class="{
        'xl:ml-0': !showFilter,
      }"
    >
      <div
        class="product-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-5"
      >
        <rs-card
          class="cursor-pointer hover:scale-105 transition-all"
          v-for="(product, index) in computedData"
          :key="index"
          @click="navigateProductDetail(product.sku)"
        >
          <div class="product-image relative h-48 rounded-lg">
            <img
              class="object-scale-down w-full h-full"
              :src="product.images.length > 0 ? product.images[0] : ''"
              :alt="product.name"
            />

            <span
              v-if="product.discount && product.discount != 0"
              class="product-discount text-sm bg-primary text-white absolute top-3 -right-2 px-2 py-1 rounded-md"
            >
              {{ product.discount }}% off
            </span>
          </div>
          <div class="product-content-wrapper flex flex-col px-4 mb-4">
            <div class="product-title mt-4 h-12">
              <span class="line-clamp-1 text-base font-semibold">{{
                product.name
              }}</span>
              <span class="line-clamp-1 text-gray-500 text-sm">
                {{ product.description }}
              </span>
            </div>
            <div class="product-content flex flex-col">
              <div class="product-rating flex items-center my-2">
                <Icon
                  name="ic:baseline-star"
                  class="text-amber-400"
                  v-for="(star, index) in Math.floor(product.rating)"
                  :key="index"
                />
                <Icon
                  name="ic:baseline-star-half"
                  class="text-amber-400"
                  v-for="(star, index) in product.rating % 1 != 0 ? 1 : 0"
                  :key="index"
                />
                <Icon
                  name="ic:baseline-star-border"
                  class="text-amber-400"
                  v-for="(star, index) in 5 - Math.ceil(product.rating)"
                  :key="index"
                />
                <div class="product-rating-sold ml-1">
                  <span class="text-xs">
                    ({{ formatSold(product.sold) }})
                  </span>
                </div>
              </div>
              <div class="product-price flex justify-between">
                <div class="truncate">
                  <div class="text-sm text-primary">
                    {{ product.currency
                    }}<span class="text-lg">
                      {{
                        product.discountedPrice
                          ? formatPrice(product.discountedPrice)
                          : formatPrice(product.price)
                      }}</span
                    >
                  </div>
                  <span
                    v-if="product.discountedPrice"
                    class="text-sm line-through text-gray-500 mt-1"
                  >
                    {{ product.currency }}{{ formatPrice(product.price) }}
                  </span>
                </div>
                <div class="action-button flex items-center gap-x-5">
                  <div class="icon-wrapper">
                    <Icon
                      size="1.4rem"
                      fill="#A9A9A9"
                      stroke="#A9A9A9"
                      name="ph:shopping-cart-fill"
                    ></Icon>
                  </div>
                  <div class="icon-wrapper" @click="iconEvent">
                    <Icon
                      size="1.4rem"
                      fill="#A9A9A9"
                      stroke="#A9A9A9"
                      name="ph:heart-fill"
                    ></Icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
      <div class="pagination flex justify-center items-center pb-4 gap-x-1">
        <rs-button
          variant="primary-outline"
          class="rounded-full !p-1 w-8 h-8"
          @click="prevPage"
          :disabled="currentPage == 1"
        >
          <Icon name="ic:round-chevron-left" size="1rem"></Icon>
        </rs-button>
        <rs-button
          :variant="currentPage == val ? 'primary' : 'primary-outline'"
          class="rounded-full !p-1 w-8 h-8"
          v-for="(val, index) in pages"
          :key="index"
          @click="pageChange(val)"
        >
          {{ val }}
        </rs-button>
        <rs-button
          variant="primary-outline"
          class="rounded-full !p-1 w-8 h-8"
          @click="nextPage"
          :disabled="currentPage == totalPage"
        >
          <Icon name="ic:round-chevron-right" size="1rem"></Icon>
        </rs-button>
      </div>
    </div>
  </div>
</template>
