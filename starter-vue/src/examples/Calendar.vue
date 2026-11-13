<!-- Calendar — https://rcube-html.com/calendar -->
<script setup>
import { RcubeForm } from "rcube-html/vue";
import "rcube-html/element/calendar";

// ---- A stand-in for your events API (dates relative to today) ----
const pad = (n) => String(n).padStart(2, "0");
const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
};
const at = (offset, time) => day(offset) + "T" + time;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const eventsDb = [
  { id: "standup", title: "Daily standup", start: at(-7, "09:30"), end: at(-7, "09:45"), calendar: "work", recurrence: { freq: "weekly", byDay: [1, 2, 3, 4, 5] } },
  { id: "review", title: "Design review", start: at(0, "14:00"), end: at(0, "15:00"), calendar: "work", location: "Room 4B" },
  { id: "lunch", title: "Lunch with Sam", start: at(1, "12:00"), end: at(1, "13:00"), calendar: "personal" },
  { id: "offsite", title: "Team offsite", start: day(3), end: day(4), allDay: true, calendar: "team" },
  { id: "launch", title: "Product launch", start: at(2, "16:00"), end: at(2, "17:30"), calendar: "team" },
  { id: "gym", title: "Gym", start: at(-1, "18:00"), end: at(-1, "19:00"), calendar: "personal", recurrence: { freq: "weekly", byDay: [2, 4] } },
];
const eventsApi = {
  // e.g. fetch("/api/events?start=" + start + "&end=" + end).then((r) => r.json())
  list: ({ start, end }) => wait(300).then(() => eventsDb.filter((e) =>
    e.recurrence || (e.start.slice(0, 10) < end && (e.end || e.start).slice(0, 10) >= start)).map((e) => ({ ...e }))),
  save: (event) => wait(100).then(() => {
    const i = eventsDb.findIndex((e) => e.id === event.id);
    if (i >= 0) eventsDb[i] = { ...event }; else eventsDb.push({ ...event });
  }),
  remove: (id) => wait(100).then(() => {
    const i = eventsDb.findIndex((e) => e.id === id);
    if (i >= 0) eventsDb.splice(i, 1);
  }),
};

const schema = [
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-buttons",
        "props": {
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-3"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "month",
            "props": {
              "text": "Month view",
              "variant": "outline-primary",
              "onClick": "showMonth()"
            }
          },
          {
            "type": "ButtonField",
            "id": "today",
            "props": {
              "text": "Today",
              "variant": "outline-secondary",
              "onClick": "goToday()"
            }
          },
          {
            "type": "ButtonField",
            "id": "personal",
            "props": {
              "text": "Show / hide Personal",
              "variant": "outline-secondary",
              "onClick": "togglePersonal()"
            }
          },
          {
            "type": "ButtonField",
            "id": "add",
            "props": {
              "text": "+ Add event via API",
              "variant": "outline-success",
              "onClick": "addViaApi()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Calendar",
    "id": "team-calendar",
    "props": {
      "view": "week",
      "views": [
        "day",
        "week",
        "month",
        "year",
        "agenda"
      ],
      "height": 640,
      "sidebarToggle": true,
      "scrollToHour": 8,
      "workingHours": {
        "start": 9,
        "end": 17,
        "days": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      "calendars": [
        {
          "id": "work",
          "name": "Work",
          "color": "#2a78d6"
        },
        {
          "id": "team",
          "name": "Team",
          "color": "#1baf7a"
        },
        {
          "id": "personal",
          "name": "Personal",
          "color": "#eb6834"
        }
      ],
      "events": [],
      "onRangeChange": "loadEvents()",
      "onViewChange": "viewChanged()",
      "onEventClick": "eventClicked()",
      "onSlotClick": "slotClicked()",
      "onEventCreate": "eventCreated()",
      "onEventUpdate": "eventUpdated()",
      "onEventDelete": "eventDeleted()",
      "onCalendarToggle": "calendarToggled()",
      "onSidebarToggle": "sidebarToggled()",
      "toolbarActions": [
        {
          "text": "+ Customer call",
          "variant": "outline-success",
          "onClick": "addViaApi()"
        }
      ]
    }
  }
];

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  // On first render and whenever the visible range changes: { view, date, start, end }
  loadEvents: async ({ start, end }) => {
    api.setCalendarLoading("team-calendar", true);
    const events = await eventsApi.list({ start, end });
    api.setCalendarEvents("team-calendar", events);   // also hides the spinner
  },
  viewChanged: ({ view }) => console.log("View:", view),
  eventClicked: ({ event }) => console.log("Clicked:", event),
  slotClicked: ({ start, allDay }) => console.log("Empty slot:", start, allDay),
  // The calendar already shows these changes; save them
  eventCreated: ({ event }) => eventsApi.save(event),
  eventUpdated: ({ event }) => eventsApi.save(event),
  eventDeleted: ({ event, scope, series, occurrence }) => (scope === "one"
    ? eventsApi.save({ ...series, recurrence: { ...series.recurrence, exceptions: [...(series.recurrence.exceptions || []), occurrence] } })
    : eventsApi.remove(event.id)),
  calendarToggled: ({ calendarId, hidden }) => console.log(calendarId, hidden ? "hidden" : "shown"),
  sidebarToggled: ({ open }) => console.log("Side panel", open ? "shown" : "hidden"),
  // Buttons outside the calendar
  showMonth: () => api.setCalendarView("team-calendar", "month"),
  goToday: () => api.calendarToday("team-calendar"),
  togglePersonal: () => api.toggleCalendar("team-calendar", "personal"),
  addViaApi: async () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const event = { id: "api-" + Date.now(), title: "Customer call", start: date + "T15:00", end: date + "T15:45", calendar: "work" };
    await eventsApi.save(event);
    api.addCalendarEvent("team-calendar", event);
  },
});
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" />
</template>
