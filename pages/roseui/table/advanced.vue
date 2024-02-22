<script setup>
import data from "./data.js";
definePageMeta({
  title: "Table Advanced",
});

const showCode1 = ref(false);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Advanced</template>
      <template #body>
        <rs-table
          :data="data"
          :options="{
            variant: 'default',
            striped: true,
            borderless: true,
          }"
          :options-advanced="{
            sortable: true,
            responsive: true,
            filterable: false,
          }"
          advanced
        >
          <template v-slot:status="data">
            <rs-badge
              :variant="
                data.text === 'Active'
                  ? 'success'
                  : data.text == 'Inactive'
                  ? 'warning'
                  : 'danger'
              "
            >
              {{ data.text }}
            </rs-badge>
          </template>
        </rs-table>
        <div class="flex justify-end mt-2">
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
              <SimpleBar style="height: 400px">
                <pre class="language-html shadow-none">
            <code>
              &lt;template&gt;
                &lt;rs-table
                  :data="data"
                  :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                  }"
                  :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: false,
                  }"
                  advanced
                &gt;
                  &lt;template v-slot:status="data"&gt;
                    &lt;rs-badge
                      :variant="
                        data.text === 'Active'
                          ? 'success'
                          : data.text == 'Inactive'
                          ? 'warning'
                          : 'danger'
                      "&gt;
                      &#123;&#123; data.text &#125;&#125;
                    &lt;/rs-badge&gt;
                  &lt;/template&gt;
                &lt;/rs-table&gt;
              &lt;/template&gt;
    
              &lt;script setup&gt;
                const data = [
                   {
                      "id":"#8b5404",
                      "firstName":"Andrej",
                      "lastName":"Foucar",
                      "email":"afoucar0@cocolog-nifty.com",
                      "gender":"Male",
                      "status":"Banned"
                   },
                   {
                      "id":"#144bba",
                      "firstName":"Glenna",
                      "lastName":"Hardcastle",
                      "email":"ghardcastle1@ovh.net",
                      "gender":"Genderfluid",
                      "status":"Inactive"
                   },
                   {
                      "id":"#d0d0b6",
                      "firstName":"Ramona",
                      "lastName":"Fewkes",
                      "email":"rfewkes2@home.pl",
                      "gender":"Female",
                      "status":"Active"
                   },
                   {
                      "id":"#2b1261",
                      "firstName":"Matias",
                      "lastName":"Dobbings",
                      "email":"mdobbings3@flavors.me",
                      "gender":"Bigender",
                      "status":"Inactive"
                   },
                   {
                      "id":"#b5bb69",
                      "firstName":"Kial",
                      "lastName":"Ashtonhurst",
                      "email":"kashtonhurst4@uiuc.edu",
                      "gender":"Bigender",
                      "status":"Active"
                   },
                   {
                      "id":"#a6b5af",
                      "firstName":"Hamish",
                      "lastName":"La Grange",
                      "email":"hlagrange5@pagesperso-orange.fr",
                      "gender":"Male",
                      "status":"Active"
                   },
                   {
                      "id":"#495759",
                      "firstName":"Myrwyn",
                      "lastName":"McShane",
                      "email":"mmcshane6@thetimes.co.uk",
                      "gender":"Male",
                      "status":"Inactive"
                   },
                   {
                      "id":"#26b5da",
                      "firstName":"Jami",
                      "lastName":"Lighten",
                      "email":"jlighten7@github.io",
                      "gender":"Female",
                      "status":"Banned"
                   },
                   {
                      "id":"#8f70b8",
                      "firstName":"Red",
                      "lastName":"Kinnear",
                      "email":"rkinnear8@gizmodo.com",
                      "gender":"Polygender",
                      "status":"Active"
                   },
                   {
                      "id":"#53d378",
                      "firstName":"Royal",
                      "lastName":"Cleeton",
                      "email":"rcleeton9@nifty.com",
                      "gender":"Male",
                      "status":"Inactive"
                   },
                   {
                      "id":"#a7b924",
                      "firstName":"Orly",
                      "lastName":"Ratledge",
                      "email":"oratledgea@elegantthemes.com",
                      "gender":"Female",
                      "status":"Active"
                   },
                   {
                      "id":"#bbfd6b",
                      "firstName":"Maddy",
                      "lastName":"Ronnay",
                      "email":"mronnayb@unicef.org",
                      "gender":"Male",
                      "status":"Banned"
                   },
                   {
                      "id":"#21dcb2",
                      "firstName":"Cob",
                      "lastName":"Wrightam",
                      "email":"cwrightamc@wix.com",
                      "gender":"Male",
                      "status":"Active"
                   },
                   {
                      "id":"#bb8656",
                      "firstName":"Ynez",
                      "lastName":"Braham",
                      "email":"ybrahamd@nbcnews.com",
                      "gender":"Female",
                      "status":"Banned"
                   }
                ]
              &lt;/script&gt;
            </code>
          </pre>
              </SimpleBar>
            </div>
          </transition>
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>
