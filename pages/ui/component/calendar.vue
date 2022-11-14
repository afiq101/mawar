<script setup>
const { $FullCalendar } = useNuxtApp();
const FullCalendar = $FullCalendar;
definePageMeta({
  title: "Calendar",
});

const calendarOptions = ref(null);

const handleDateClick = (arg) => {
  // alert("date click! " + arg.dateStr);
};

const events = [
  {
    title: "Event",
    startDate: "2022-07-01",
    endDate: "2022-07-06",
    color: "green",
  },
];

calendarOptions.value = {
  ...FullCalendar?.options,
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next title",
    right: "dayGridMonth,timeGridWeek,listWeek",
  },
  dateClick: handleDateClick,
  dragScroll: true,
  dayMaxEvents: 2,
  navLinks: true,
  events: [
    { title: "event 1", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 2", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 3", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 3", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 3", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 3", start: "2022-07-05", end: "2022-07-08" },
    { title: "event 4", date: "2022-07-22" },
  ],
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This template use
          <a
            href="https://fullcalendar.io/"
            target="_blank"
            class="hover:underline text-primary-400"
            >FullCalendar</a
          >
          which is a Vue component that allows you to create a calendar.
          Fullcalendar is a JavaScript library that provides a simple API for
          easily creating a calendar. Besides, it is a great way to display
          events on a page.
        </p>
      </template>
    </rs-card>
    <rs-card>
      <template #header> Default </template>
      <template #body>
        <p class="mb-4">
          Use <code>rs-calendar</code> to display a calendar. The calendar is a
          simple component that displays a grid of days.
        </p>
        <ClientOnly>
          <FullCalendar :options="calendarOptions" />
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>
