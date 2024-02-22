<script setup>
import {
  BarChart,
  useBarChart,
  DoughnutChart,
  useDoughnutChart,
  LineChart,
  useLineChart,
  PieChart,
  usePieChart,
  PolarAreaChart,
  usePolarAreaChart,
  RadarChart,
  useRadarChart,
  BubbleChart,
  useBubbleChart,
  ScatterChart,
  useScatterChart,
} from "vue-chart-3";

definePageMeta({
  title: "Chart JS",
});

const showCode1 = ref(false);
const showCode2 = ref(false);
const showCode3 = ref(false);
const showCode4 = ref(false);
const showCode5 = ref(false);
const showCode6 = ref(false);
const showCode7 = ref(false);
const showCode8 = ref(false);

const data = ref([30, 40, 60, 70, 5]);
const data2 = ref([
  { x: 20, y: 25, r: 22 },
  { x: 10, y: 23, r: 5 },
  { x: 30, y: 40, r: 25 },
  { x: 40, y: 20, r: 10 },
  { x: 15, y: 5, r: 10 },
  { x: 17, y: 10, r: 5 },
]);

const options = computed(() => ({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
      },
    },
    legend: {
      display: true,
    },
  },
}));

const optionsHide = computed(() => ({
  scales: {
    y: {
      beginAtZero: true,
      display: false,
    },
    x: {
      display: false,
    },
  },
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
      },
    },
    legend: {
      display: true,
    },
  },
}));

const chartData = computed(() => ({
  labels: [
    "Customer 1",
    "Customer 2",
    "Customer 3",
    "Customer 4",
    "Customer 5",
  ],
  datasets: [
    {
      label: "Order",
      data: data.value,
      backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
    },
  ],
}));

const chartDataArr = computed(() => ({
  datasets: [
    {
      label: "First Dataset",
      data: data2.value,
      backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
    },
  ],
}));

const { barChartProps } = useBarChart({
  chartData,
  options,
});

const { doughnutChartProps } = useDoughnutChart({
  chartData,
  optionsHide,
});

const { lineChartProps } = useLineChart({
  chartData,
  options,
});

const { pieChartProps } = usePieChart({
  chartData,
  options: optionsHide,
});

const { polarAreaChartProps } = usePolarAreaChart({
  chartData,
  options: optionsHide,
});

const { radarChartProps } = useRadarChart({
  chartData,
  options: optionsHide,
});

const { bubbleChartProps } = useBubbleChart({
  chartData: chartDataArr,
  options: options,
});

const { scatterChartProps } = useScatterChart({
  chartData: chartDataArr,
  options: options,
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <p class="mb-4">
      We ensure Chartjs is fully supported using vue 3. Read the full
      documentation
      <a
        href="https://vue-chart-3.netlify.app/"
        class="text-blue-500 hover:underline"
        target="_blank"
        >here</a
      >.
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <rs-card>
        <template #header>
          <h5>Pie Chart</h5>
        </template>
        <template #body>
          <PieChart
            v-bind="pieChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;PieChart
                    v-bind="pieChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { PieChart, usePieChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { pieChartProps } = usePieChart({
                chartData,
                options: chartOptions,
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
          <h5>Doughnut Chart</h5>
        </template>
        <template #body>
          <DoughnutChart
            v-bind="doughnutChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;DoughnutChart
                    v-bind="doughnutChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { doughnutChartProps } = useDoughnutChart({
                chartData,
                options: chartOptions,
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
          <LineChart
            v-bind="lineChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;LineChart
                    v-bind="lineChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { LineChart, useLineChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                }
              }));

              const { lineChartProps } = useLineChart({
                chartData,
                options: chartOptions,
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
          <h5>Bar Chart</h5>
        </template>
        <template #body>
          <BarChart
            v-bind="barChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;BarChart
                    v-bind="barChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { BarChart, useBarChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                }
              }));

              const { barChartProps } = useBarChart({
                chartData,
                options: chartOptions,
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
          <h5>Polar Area Chart</h5>
        </template>
        <template #body>
          <PolarAreaChart
            v-bind="polarAreaChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;PolarAreaChart
                    v-bind="polarAreaChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { PolarAreaChart, usePolarAreaChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { polarAreaChartProps } = usePolarAreaChart({
                chartData,
                options: chartOptions,
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
          <h5>Radar Chart</h5>
        </template>
        <template #body>
          <RadarChart
            v-bind="radarChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;RadarChart
                    v-bind="radarChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { RadarChart, usePolarAreaChart } from "vue-chart-3";
              
              const data = ref([30, 40, 60, 70, 5]);
              const chartData = computed(() => ({
                labels: [
                  "Customer 1",
                  "Customer 2",
                  "Customer 3",
                  "Customer 4",
                  "Customer 5",
                ],
                datasets: [
                  {
                    label: "Order",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { radarChartProps } = useRadarChart({
                chartData,
                options: chartOptions,
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
          <h5>Bubble Chart</h5>
        </template>
        <template #body>
          <BubbleChart
            v-bind="bubbleChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;BubbleChart
                    v-bind="bubbleChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { BubbleChart, useBubbleChart } from "vue-chart-3";
              
              const data = ref([
                { x: 20, y: 25, r: 22 },
                { x: 10, y: 23, r: 5 },
                { x: 30, y: 40, r: 25 },
                { x: 40, y: 20, r: 10 },
                { x: 15, y: 5, r: 10 },
                { x: 17, y: 10, r: 5 },
              ]);
              const chartData = computed(() => ({
                datasets: [
                  {
                    label: "First Dataset",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { bubbleChartProps } = useBubbleChart({
                chartData,
                options: chartOptions,
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
          <h5>Scatter Chart</h5>
        </template>
        <template #body>
          <ScatterChart
            v-bind="scatterChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
                  &lt;ScatterChart
                    v-bind="scatterChartProps"
                    style="position: relative; height: 40vh; width: 80vw"
                  /&gt;
              &lt;/template&gt;

              &lt;script setup&gt;
              import { ScatterChart, useScatterChart } from "vue-chart-3";
              
              const data = ref([
                { x: 20, y: 25, r: 22 },
                { x: 10, y: 23, r: 5 },
                { x: 30, y: 40, r: 25 },
                { x: 40, y: 20, r: 10 },
                { x: 15, y: 5, r: 10 },
                { x: 17, y: 10, r: 5 },
              ]);
              const chartData = computed(() => ({
                datasets: [
                  {
                    label: "First Dataset",
                    data: data.value,
                    backgroundColor: ["#FF829D", "#FFD778", "#5EB5EF", "#6FCDCD", "#ECEDF1"],
                  },
                ],
              }));

              const chartOptions = computed(() => ({
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "xy",
                    },
                  },
                  legend: {
                    display: true,
                  },
                },
              }));

              const { scatterChartProps } = useScatterChart({
                chartData,
                options: chartOptions,
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
