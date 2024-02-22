<script setup>
definePageMeta({
  title: "Input Password",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);

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
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode1 ? (showCode1 = false) : (showCode1 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode1" v-highlight>
              <NuxtScrollbar style="height: 200px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit type="password" label="Password" /&gt;
              &lt;/template&gt;
 
              &lt;script setup&gt;&lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
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
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode2 ? (showCode2 = false) : (showCode2 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode2" v-highlight>
              <NuxtScrollbar style="height: 300px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;FormKit type="group"&gt;
                  &lt;FormKit type="password" name="password" label="Password" /&gt;
                  &lt;FormKit type="password" name="password_confirm" label="Confirm password" /&gt;
                &lt;/FormKit&gt;
              &lt;/template&gt;
 
              &lt;script setup&gt;&lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
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
        <div class="flex justify-end">
          <button
            class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
            @click="showCode3 ? (showCode3 = false) : (showCode3 = true)"
          >
            Show Code
          </button>
        </div>
        <ClientOnly>
          <transition name="fade">
            <div class="z-0" v-show="showCode3" v-highlight>
              <NuxtScrollbar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;

                &lt;!-- Password Validation Uppercase, Lowercase, One digit and Special Character --&gt;
                &lt;FormKit 
                  type="password" 
                  label="Validate Password" 
                  validation="matches:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/" 
                  :validation-messages="{
                    matches:
                      'The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character and should have 8 characters long.',
                  }" 
                  validation-visibility="dirty" 
                /&gt;

                &lt;!-- Password Toggle --&gt;
                &lt;FormKit 
                  :type="computedtype" 
                  label="See Password"
                &gt;
                  &lt;template #suffix&gt;
                    &lt;button class="h-full rounded-r-md p-2 flex justify-center items-center" @click="toggleType"&gt;
                      &lt;Icon 
                        v-if="computedtype == 'password'" 
                        name="mdi:eye-outline" 
                        size="19"&gt;
                      &lt;/Icon&gt;
                      &lt;Icon 
                        v-else 
                        name="mdi:eye-off-outline" 
                        size="19"&gt;
                      &lt;/Icon&gt;
                    &lt;/button&gt;
                  &lt;/template&gt;
                &lt;/FormKit&gt;
              &lt;/template&gt;
 
              &lt;script setup&gt;
                const computedtype = computed(() => {
                  return inputType.value;
                });
                const toggleType = () => {
                  inputType.value = inputType.value === "password" ? "text" : "password";
                };
              &lt;/script&gt;
            </code>
          </pre>
              </NuxtScrollbar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>
