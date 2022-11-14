<script setup>
definePageMeta({
  title: "Input Password",
});

const password = ref("");
const inputType = ref("password");
const score = ref(null);
const strength = ref(null);

const onScore = (payload) => {
  strength.value = payload.strength;
  score.value = payload.score;
};

const toggleType = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

const computedtype = computed(() => {
  return inputType.value;
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <FormKit type="password" label="Password" />
      </template>
    </rs-card>

    <rs-card>
      <template #header> Confirmation </template>
      <template #body>
        <FormKit type="group">
          <FormKit
            type="password"
            name="password"
            label="Password"
            help="Enter a new password"
            validation="required"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            help="Confirm your new password"
            validation="required|confirm"
            validation-label="Password confirmation"
          />
        </FormKit>
      </template>
    </rs-card>

    <rs-card>
      <template #header> Validation </template>
      <template #body>
        <FormKit
          type="password"
          label="Validate Password"
          validation="matches:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/"
          :validation-messages="{
            matches:
              'The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character and should have 8 characters long.',
          }"
          validation-visibility="dirty"
        />
        <FormKit :type="computedtype" label="See Password">
          <template #suffix>
            <button
              class="h-full rounded-r-md p-2 flex justify-center items-center"
              @click="toggleType"
            >
              <Icon
                v-if="computedtype == 'password'"
                name="mdi:eye-outline"
                size="19"
              ></Icon>
              <Icon v-else name="mdi:eye-off-outline" size="19"></Icon>
            </button>
          </template>
        </FormKit>
        <FormKit
          type="password"
          label="Strong Meter Password"
          v-model="password"
        >
          <template #messages>
            <ul
              v-if="score < 3 && password !== ''"
              class="formkit-messages list-none p-0 mt-1 mb-0"
            >
              <li class="formkit-message text-red-500 mb-1 text-xs">
                Password strength must be at least safe level.
              </li>
            </ul>
          </template>
        </FormKit>
        <div class="flex">
          <span class="text-primary-400 font-semibold capitalize">{{
            strength
          }}</span>

          <!-- <PasswordMeter
            class="ml-3 h-full"
            @score="onScore"
            :password="password"
          /> -->
        </div>
      </template>
    </rs-card>
  </div>
</template>
