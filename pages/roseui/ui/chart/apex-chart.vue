<script setup>
definePageMeta({
  title: "Apex Chart",
});

const changeKey = ref(0);

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);
const showCode5 = ref(false);
const showCode6 = ref(false);
const showCode7 = ref(false);
const showCode8 = ref(false);

const series = ref([
  {
    name: "Series 1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
  {
    name: "Series 2",
    data: [20, 10, 25, 40, 39, 50, 60, 71],
  },
  {
    name: "Series 3",
    data: [0, 10, 20, 25, 30, 35, 40, 45],
  },
]);

const series2 = ref([
  {
    data: [{ x: "Category 1", y: [30, 40, 35, 50, 49, 60, 70, 91] }],
  },
  {
    data: [{ x: "Category 2", y: [20, 10, 25, 40, 39, 50, 60, 71] }],
  },
  {
    data: [{ x: "Category 3", y: [0, 10, 20, 25, 30, 35, 40, 45] }],
  },
]);

const series3 = ref([30, 40, 35, 50, 49, 60, 70, 91]);

const series4 = ref([77]);

const chartOptions = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsRadial = computed(() => ({
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#293450",
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px",
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Goals"],
}));

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <p class="mb-4">
      We ensure Apex Chart is fully supported using vue 3. Read the full
      documentation
      <a
        href="https://github.com/apexcharts/vue3-apexcharts"
        class="text-blue-500 hover:underline"
        target="_blank"
        >here</a
      >.
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <rs-card>
        <template #header>
          <h5>Bar Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </ClientOnly>
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
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="bar"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([
                {
                  name: "Series 1",
                  data: [30, 40, 35, 50, 49, 60, 70, 91],
                },
                {
                  name: "Series 2",
                  data: [20, 10, 25, 40, 39, 50, 60, 71],
                },
                {
                  name: "Series 3",
                  data: [0, 10, 20, 25, 30, 35, 40, 45],
                },
              ]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>
      <rs-card>
        <template #header>
          <h5>Boxplot Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="boxPlot"
              :options="chartOptions"
              :series="series2"
            ></VueApexCharts>
          </ClientOnly>
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
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="boxPlot"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([
                {
                  data: [{ x: "Category 1", y: [30, 40, 35, 50, 49, 60, 70, 91] }],
                },
                {
                  data: [{ x: "Category 2", y: [20, 10, 25, 40, 39, 50, 60, 71] }],
                },
                {
                  data: [{ x: "Category 3", y: [0, 10, 20, 25, 30, 35, 40, 45] }],
                },
              ]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card class="col-span-2">
        <template #header>
          <h5>Line Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="line"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </ClientOnly>
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
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="line"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([
                {
                  name: "Series 1",
                  data: [30, 40, 35, 50, 49, 60, 70, 91],
                },
                {
                  name: "Series 2",
                  data: [20, 10, 25, 40, 39, 50, 60, 71],
                },
                {
                  name: "Series 3",
                  data: [0, 10, 20, 25, 30, 35, 40, 45],
                },
              ]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card>
        <template #header>
          <h5>Donut Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="donut"
              :options="chartOptions"
              :series="series3"
            ></VueApexCharts>
          </ClientOnly>
          <div class="flex justify-end">
            <button
              class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
              @click="showCode4 ? (showCode4 = false) : (showCode4 = true)"
            >
              Show Code
            </button>
          </div>
          <ClientOnly>
            <transition name="fade">
              <div class="z-0" v-show="showCode4" v-highlight>
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="donut"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([30, 40, 35, 50, 49, 60, 70, 91]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card>
        <template #header>
          <h5>Pie Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="pie"
              :options="chartOptions"
              :series="series3"
            ></VueApexCharts>
          </ClientOnly>
          <div class="flex justify-end">
            <button
              class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
              @click="showCode5 ? (showCode5 = false) : (showCode5 = true)"
            >
              Show Code
            </button>
          </div>
          <ClientOnly>
            <transition name="fade">
              <div class="z-0" v-show="showCode5" v-highlight>
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="pie"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([30, 40, 35, 50, 49, 60, 70, 91]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card class="col-span-2">
        <template #header>
          <h5>Area Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="area"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </ClientOnly>
          <div class="flex justify-end">
            <button
              class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
              @click="showCode6 ? (showCode6 = false) : (showCode6 = true)"
            >
              Show Code
            </button>
          </div>
          <ClientOnly>
            <transition name="fade">
              <div class="z-0" v-show="showCode6" v-highlight>
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="area"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([
                {
                  name: "Series 1",
                  data: [30, 40, 35, 50, 49, 60, 70, 91],
                },
                {
                  name: "Series 2",
                  data: [20, 10, 25, 40, 39, 50, 60, 71],
                },
                {
                  name: "Series 3",
                  data: [0, 10, 20, 25, 30, 35, 40, 45],
                },
              ]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card>
        <template #header>
          <h5>Area Chart</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="300"
              type="radar"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </ClientOnly>
          <div class="flex justify-end">
            <button
              class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
              @click="showCode7 ? (showCode7 = false) : (showCode7 = true)"
            >
              Show Code
            </button>
          </div>
          <ClientOnly>
            <transition name="fade">
              <div class="z-0" v-show="showCode7" v-highlight>
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="radar"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([
                {
                  name: "Series 1",
                  data: [30, 40, 35, 50, 49, 60, 70, 91],
                },
                {
                  name: "Series 2",
                  data: [20, 10, 25, 40, 39, 50, 60, 71],
                },
                {
                  name: "Series 3",
                  data: [0, 10, 20, 25, 30, 35, 40, 45],
                },
              ]);

              const chartOptions = computed(() => ({
                chart: {
                  id: "apexChart",
                },
                legend: {
                  position: "top",
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
              &lt;/script&gt;
            </code>
          </pre>
                </NuxtScrollbar>
              </div>
            </transition>
          </ClientOnly>
        </template>
      </rs-card>

      <rs-card>
        <template #header>
          <h5>Radial Bar</h5>
        </template>
        <template #body>
          <ClientOnly>
            <VueApexCharts
              :key="changeKey"
              width="100%"
              height="330"
              type="radialBar"
              :options="chartOptionsRadial"
              :series="series4"
            ></VueApexCharts>
          </ClientOnly>
          <div class="flex justify-end">
            <button
              class="text-sm border border-slate-200 py-1 px-3 rounded-lg"
              @click="showCode8 ? (showCode8 = false) : (showCode8 = true)"
            >
              Show Code
            </button>
          </div>
          <ClientOnly>
            <transition name="fade">
              <div class="z-0" v-show="showCode8" v-highlight>
                <NuxtScrollbar style="height: 400px">
                  <pre class="language-html shadow-none">
            <code>
              &lt;template&gt; 
                &lt;ClientOnly&gt;
                  &lt;VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="radialBar"
                    :options="chartOptions"
                    :series="series"
                  &gt;&lt;/VueApexCharts&gt;
                &lt;/ClientOnly&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              
              const changeKey = ref(0);
              
              const series = ref([77]);

              const chartOptions = computed(() => ({
                colors: ["#20E647"],
                plotOptions: {
                  radialBar: {
                    hollow: {
                      margin: 0,
                      size: "70%",
                      background: "#293450",
                    },
                    track: {
                      dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15,
                      },
                    },
                    dataLabels: {
                      name: {
                        offsetY: -10,
                        color: "#fff",
                        fontSize: "13px",
                      },
                      value: {
                        color: "#fff",
                        fontSize: "30px",
                        show: true,
                      },
                    },
                  },
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    type: "vertical",
                    gradientToColors: ["#87D4F9"],
                    stops: [0, 100],
                  },
                },
                stroke: {
                  lineCap: "round",
                },
                labels: ["Goals"],
              }));

              onMounted(() => {
                setTimeout(() => {
                  changeKey.value++;
                }, 500);
              });
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
  </div>
</template>
