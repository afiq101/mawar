<script setup>
import products from "./data";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

definePageMeta({
  title: "Product Detail",
});

const modules = [Navigation, Pagination, Scrollbar, A11y];

const route = useRoute();

if (!route.query.sku) {
  await navigateTo("/apps/ecommerce/products");
}

const product = products.find((p) => p.sku == route.query.sku);

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
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card class="py-5">
      <div
        class="flex flex-col md:flex-row items-center md:items-start justify-center my-4 px-5"
      >
        <div
          class="product-image w-full md:w-2/5 flex justify-center items-center"
        >
          <swiper
            v-if="product.images.length > 1"
            :modules="modules"
            :slides-per-view="1"
            :centeredSlides="true"
            :pagination="{ clickable: true }"
            navigation
          >
            <swiper-slide v-for="(val, index) in product.images" :key="index">
              <div class="w-full flex justify-center items-center">
                <img
                  style="max-width: 230px"
                  class="object-scale-down md:!max-w-xs"
                  :src="val"
                />
              </div>
            </swiper-slide>
          </swiper>
          <img
            v-else
            style="max-width: 200px"
            class="object-scale-down md:!max-w-md"
            :src="product.images[0]"
          />
        </div>
        <div class="product-content w-full md:w-3/5">
          <a
            href="#"
            class="font-medium text-gray-500 cursor-pointer hover:text-gray-500"
          >
            {{ product.store }}
          </a>
          <h3 class="text-xl md:text-2xl mb-2">{{ product.name }}</h3>
          <div class="flex items-center gap-x-1">
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
              <span class="text-sm"> ({{ formatSold(product.sold) }}) </span>
            </div>
          </div>
          <div class="product-price my-2">
            <span class="text-primary text-3xl md:text-4xl font-semibold"
              >RM{{ formatPrice(product.price) }}</span
            >
            <span
              v-if="product.discountedPrice"
              class="text-lg line-through text-gray-500 ml-0 md:ml-2 mt-1 block md:inline-block"
            >
              {{ product.currency }}{{ formatPrice(product.price) }}
            </span>
          </div>

          <div class="product-stock text-gray-500 font-medium my-2">
            Available: {{ product.stock }}
          </div>
          <div class="product-description">
            <p class="text-gray-500">{{ product.description }}</p>
          </div>
          <div
            class="product-action my-4 flex flex-col-reverse md:flex-row items-start md:items-center gap-4"
          >
            <rs-button class="w-full md:w-fit">
              <Icon class="mr-2" name="ph:shopping-cart"></Icon>
              <span class="text-white">Add to Cart</span>
            </rs-button>
            <rs-button variant="primary-outline" class="w-full md:w-fit">
              <Icon class="mr-2" name="ph:heart-light"></Icon>
              <span>Wishlist</span>
            </rs-button>
          </div>
          <div class="product-attributes my-5">
            <rs-collapse accordion>
              <rs-collapse-item title="Product Specifications:">
                <ul class="grid grid-cols-2 gap-3">
                  <li
                    class="font-medium"
                    v-for="(val, index) in product.attributes"
                    :key="index"
                  >
                    <span class="font-normal text-gray">{{ val.name }}: </span>
                    <span>{{ val.value }}</span>
                  </li>
                </ul>
              </rs-collapse-item>
            </rs-collapse>
          </div>
        </div>
      </div>
      <div
        class="item-features py-14 md:py-20 bg-[rgb(var(--bg-1))] grid md:grid-cols-3"
      >
        <div
          class="flex flex-col items-center justify-center px-4 my-4 md:my-0"
        >
          <Icon size="1.75rem" class="text-primary" name="ph:tag"></Icon>
          <span class="text-lg font-semibold my-2">Lowest Price So Far</span>
          <p class="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center px-4 my-4 md:my-0"
        >
          <Icon size="1.75rem" class="text-primary" name="ph:lightning"></Icon>
          <span class="text-lg font-semibold my-2">Fast Delivery</span>
          <p class="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center px-4 my-4 md:my-0"
        >
          <Icon size="1.75rem" class="text-primary" name="ph:shield"></Icon>
          <span class="text-lg font-semibold my-2">3 Years Warranty</span>
          <p class="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div class="review p-5 mt-5 flex items-start flex-col md:flex-row gap-4">
        <div class="customer-review-rating w-full md:w-3/12">
          <div class="mb-5">
            <h4>Customer Reviews</h4>
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
            {{ product.rating }} of 5
            <br />
            <!-- Rating -->
            <div class="rating-5 flex items-center my-2">
              <p class="basis-20">5 Stars</p>
              <rs-progress-bar
                class="mb-0"
                :value="60"
                :max="100"
                :variant="'primary'"
                :size="'sm'"
              ></rs-progress-bar>
            </div>
            <div class="rating-4 flex items-center my-2">
              <p class="basis-20">4 Stars</p>
              <rs-progress-bar
                class="mb-0"
                :value="35"
                :max="100"
                :variant="'primary'"
                :size="'sm'"
              ></rs-progress-bar>
            </div>
            <div class="rating-3 flex items-center my-2">
              <p class="basis-20">3 Stars</p>
              <rs-progress-bar
                class="mb-0"
                :value="5"
                :max="100"
                :variant="'primary'"
                :size="'sm'"
              ></rs-progress-bar>
            </div>
            <div class="rating-2 flex items-center my-2">
              <p class="basis-20">2 Stars</p>
              <rs-progress-bar
                class="mb-0"
                :value="0"
                :max="100"
                :variant="'primary'"
                :size="'sm'"
              ></rs-progress-bar>
            </div>
            <div class="rating-1 flex items-center my-2">
              <p class="basis-20">1 Stars</p>
              <rs-progress-bar
                class="mb-0"
                :value="0"
                :max="100"
                :variant="'primary'"
                :size="'sm'"
              ></rs-progress-bar>
            </div>
          </div>
        </div>
        <div class="customer-review w-full md:w-9/12">
          <div class="customer-wrapper" v-for="index in 5" :key="index">
            <div class="customer flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-full">
                <img :src="`https://robohash.org/` + index" alt="" />
              </div>
              <div class="rate">
                <p class="font-semibold">Iqmal Rizal</p>
                <Icon name="ic:baseline-star" class="text-amber-400" />
                <Icon name="ic:baseline-star" class="text-amber-400" />
                <Icon name="ic:baseline-star" class="text-amber-400" />
                <Icon name="ic:baseline-star" class="text-amber-400" />
                <Icon name="ic:baseline-star" class="text-amber-400" />
              </div>
            </div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
            <hr class="my-4" />
          </div>
        </div>
      </div>
    </rs-card>
  </div>
</template>

<style lang="scss">
.swiper-pagination-bullet {
  width: 1.25rem !important;
  height: 0.2rem !important;
  border-radius: 5px !important;
}

.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 0px !important;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 1.25rem !important;
}

.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  right: 0px !important;
}

.swiper-button-prev,
.swiper-rtl .swiper-button-next {
  left: 0px !important;
}
</style>
