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
        </template>
      </rs-card>
      <rs-card>
        <template #header>
          <h5>Radar Chart</h5>
        </template>
        <template #body>
          <RadarChart
            v-bind="polarAreaChartProps"
            style="position: relative; height: 40vh; width: 80vw"
          />
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
        </template>
      </rs-card>
    </div>
  </div>
</template>
