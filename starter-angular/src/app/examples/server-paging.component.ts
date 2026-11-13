// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Server paging — https://rcube-html.com/server-paging
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";
import "rcube-html/element/table";

// ---- A stand-in for your API: 1,000 students, paged / sorted / searched "on the server" ----
const FIRST = ["Aisha", "Ben", "Carla", "Dev", "Elena", "Farid", "Grace", "Hugo", "Ines", "Jamal", "Kim", "Leo", "Maya", "Noah", "Omar", "Priya"];
const LAST = ["Khan", "Lee", "Garcia", "Patel", "Novak", "Haddad", "Okafor", "Brown", "Silva", "Wong", "Ivanova", "Moreau"];
const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
const studentsDb = Array.from({ length: 1000 }, (_, i) => ({
  id: 1000 + i, name: FIRST[i % FIRST.length] + " " + LAST[(i * 7) % LAST.length], grade: GRADES[(i * 3) % GRADES.length],
  attendance: 70 + ((i * 37) % 31), average: 50 + ((i * 53) % 51), active: i % 9 !== 0,
}));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let failNext = false;
const studentsApi = {
  // e.g. fetch("/api/students?" + new URLSearchParams({ page, pageSize, q: query, sort: sort?.key || "", dir: sort?.dir || "" })).then((r) => r.json())
  page: async ({ page, pageSize, sort, query }) => {
    await wait(400);
    if (failNext) { failNext = false; throw new Error("The server didn't answer (simulated)"); }
    const q = (query || "").toLowerCase();
    let list = q ? studentsDb.filter((s) => (s.name + " " + s.grade + " " + s.id).toLowerCase().includes(q)) : studentsDb.slice();
    if (sort) list.sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * (sort.dir === "desc" ? -1 : 1));
    const pages = Math.max(1, Math.ceil(list.length / pageSize));
    const p = Math.min(page, pages);
    return { rows: list.slice((p - 1) * pageSize, p * pageSize), total: list.length, page: p };
  },
  failOnce: () => { failNext = true; },
};
// the last page the table asked for (for "Reload this page")
let last = { page: 1, pageSize: 25, sort: null, query: "" };

const schema = [
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-buttons",
        "props": {
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "reload",
            "props": {
              "text": "Reload this page",
              "variant": "outline-primary",
              "onClick": "reload()"
            }
          },
          {
            "type": "ButtonField",
            "id": "fail",
            "props": {
              "text": "Make the next call fail",
              "variant": "outline-danger",
              "onClick": "failNext()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Alert",
    "id": "error",
    "props": {
      "variant": "danger",
      "text": "",
      "className": "rc-d-none"
    }
  },
  {
    "type": "DataTable",
    "id": "students",
    "props": {
      "title": "Students (1,000 on the server)",
      "rowKey": "id",
      "serverSide": true,
      "rows": [],
      "totalRows": 0,
      "page": 1,
      "loading": true,
      "pageSize": 25,
      "pageSizeOptions": [
        25,
        50,
        100,
        200
      ],
      "searchable": true,
      "searchDelay": 350,
      "stackBelow": "md",
      "size": "sm",
      "columns": [
        {
          "key": "id",
          "title": "ID",
          "sortable": true,
          "width": 80
        },
        {
          "key": "name",
          "title": "Name",
          "sortable": true
        },
        {
          "key": "grade",
          "title": "Grade",
          "sortable": true
        },
        {
          "key": "attendance",
          "title": "Attendance %",
          "align": "end",
          "sortable": true
        },
        {
          "key": "average",
          "title": "Average",
          "align": "end",
          "sortable": true
        },
        {
          "key": "active",
          "title": "Active",
          "format": "boolean",
          "align": "center"
        }
      ],
      "rowRules": [
        {
          "when": {
            "field": "average",
            "lt": 60
          },
          "color": "#b02a37"
        }
      ],
      "onQueryChange": "loadPage()"
    }
  }
];

@Component({
  selector: "app-server-paging",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [actions]="actions"
    (ready)="onReady($event.api)"
  ></rcube-html-form>`,
})
export class ServerPagingComponent {
  schema = schema;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    // The table asks for a page: { page, pageSize, sort, query } (its spinner is on already)
    loadPage: async (query) => {
      last = query;
      try {
        const answer = await studentsApi.page(query);
        api.setPageRows("students", { rows: answer.rows, totalRows: answer.total, page: answer.page });
        api.setNodeProps("error", { text: "", className: "rc-d-none" });
      } catch (error) {
        api.setTableLoading("students", false);     // the previous page stays
        api.setNodeProps("error", { text: error.message, className: "" });
      }
    },
    reload: () => api.loadPage(last),
    failNext: () => studentsApi.failOnce(),
  });
  // once, when the form is on the page
  onReady(api: any) {
    api.loadPage({ page: 1, pageSize: 25, sort: null, query: "" });
  }
}