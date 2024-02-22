<script setup>
import products from "./data";

definePageMeta({
  title: "Checkout",
});

const data = ref(products);
const formatPrice = (price) => {
  return parseFloat(price)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="py-7 bg-[rgb(var(--bg-2))] rounded-l-lg">
          <div class="px-10">
            <h5>Summary Order</h5>
            <p>This is a list of items in the cart.</p>
          </div>
          <NuxtScrollbar class="mt-7 px-10" style="height: 350px">
            <rs-card class="p-5" v-for="(product, index) in data" :key="index">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="product-img flex items-center w-30 h-30">
                  <img class="object-center" :src="product.images[0]" alt="" />
                </div>
                <div class="product-title flex-1 flex flex-col justify-between">
                  <div>
                    <h5 class="line-clamp-1">
                      {{ product.name }}
                    </h5>
                    <span> {{ product.sku }} </span><br />
                    <span> Quantity: 1 </span>
                  </div>
                  <div class="product-price my-2">
                    <span class="text-xl font-semibold"
                      >RM{{ formatPrice(product.price) }}</span
                    >
                    <span
                      v-if="product.discountedPrice"
                      class="text-base line-through ml-0 md:ml-2 mt-1 block md:inline-block text-gray-500"
                    >
                      {{ product.currency }}{{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>
              </div>
            </rs-card>
          </NuxtScrollbar>
          <div class="mt-7 px-10">
            <span class="font-semibold">Address</span>
            <rs-card class="mt-7 p-5 text-white !bg-primary">
              <h6>Home</h6>
              <p>
                116, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan
                Klang, Selangor
              </p>
            </rs-card>
            <rs-card class="mt-5 p-5">
              <h6>Office</h6>
              <p>
                11, Jalan Tasik Selatan 3, Bandar Tasik Selatan, 57000 Kuala
                Lumpur, Wilayah Persekutuan Kuala Lumpur
              </p>
            </rs-card>
          </div>
        </div>
        <div class="py-7 bg-[rgb(var(--bg-2))] rounded-r-lg border-l border-l-[rgb(var(--border-color))]">
          <div class="px-10">
            <h5>Payment Details</h5>
            <p>Enter your payment details below.</p>
          </div>
          <div class="form-detail mt-7">
            <div
              class="text-base font-semibold bg-[rgb(var(--bg-1))] py-3 px-10 my-4"
            >
              Customer Information
            </div>
            <div class="form-customer px-10">
              <FormKit
                type="text"
                label="Name"
                placeholder="Enter your name"
              /><FormKit
                type="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <FormKit
                type="mask"
                label="Phone Number"
                placeholder="Enter your phone number"
                mask="###########"
              >
              </FormKit>
            </div>

            <div
              class="text-base font-semibold bg-[rgb(var(--bg-1))] py-3 px-10 my-4"
            >
              Card Details
            </div>
            <div class="form-card px-10">
              <FormKit
                type="mask"
                label="Card Number"
                placeholder="**** **** **** ****"
                mask="#### #### #### ####"
              />
              <div class="grid grid-cols-2 gap-4">
                <FormKit
                  type="mask"
                  label="Expiration Date"
                  placeholder="MM/YY"
                  mask="##/##"
                />
                <FormKit
                  type="mask"
                  label="Security Code"
                  placeholder="CVC"
                  mask="###"
                />
              </div>
            </div>
            <div class="px-10">
              <div class="subtotal flex justify-between">
                <div class="font-semibold">Subtotal</div>
                <div>RM 3200.50</div>
              </div>
              <div class="discount flex justify-between my-2">
                <div class="font-semibold">Discount (10%)</div>
                <div>RM 2,880.45</div>
              </div>
              <div class="total flex justify-between my-2">
                <div class="font-semibold">Total</div>
                <div>RM 2,880.45</div>
              </div>
              <rs-button class="w-full mt-4">Pay RM 2,880.45</rs-button>
            </div>
          </div>
        </div>
      </div>
    </rs-card>
  </div>
</template>
