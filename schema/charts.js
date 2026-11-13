// Charts — Bar, line, area, pie and donut charts whose data changes from fields and buttons.
// Live example and explanation: https://rcube-html.com/charts
// Group: Data components
//
// Covers:
//   - Chart
//
// Form fields (name — type, label):
//   - chartType — SelectField "Chart type"
//   - march — SliderField "March online sales" (min 0, max 100)
//   - stacked — InputField "Stacked"
//   - labels — InputField "Values"
//
// Actions written here: typeChanged, marchChanged, stackedChanged, labelsChanged, randomize, addMonth,
//    highlightBest, toggleStore, pointClicked, legendClicked
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/charts";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// Helpers the actions use (months, random): in a real app, often your API or data.
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const random = (min, max) => min + Math.floor(Math.random() * (max - min));

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-controls",
    "children": [
      {
        "type": "column",
        "id": "c-type",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "type",
            "props": {
              "name": "chartType",
              "label": "Chart type",
              "defaultValue": "bar",
              "onChange": "typeChanged()",
              "options": [
                {
                  "label": "Bar",
                  "value": "bar"
                },
                {
                  "label": "Line",
                  "value": "line"
                },
                {
                  "label": "Area",
                  "value": "area"
                },
                {
                  "label": "Pie",
                  "value": "pie"
                },
                {
                  "label": "Donut",
                  "value": "donut"
                }
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-slider",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SliderField",
            "id": "march",
            "props": {
              "name": "march",
              "label": "March online sales",
              "min": 0,
              "max": 100,
              "defaultValue": 38,
              "valueSuffix": "K",
              "onChange": "marchChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-switches",
        "props": {
          "className": "rc-col-12 rc-col-md-4 rc-d-flex rc-gap-3 rc-align-items-center"
        },
        "children": [
          {
            "type": "InputField",
            "id": "stacked",
            "props": {
              "type": "checkbox",
              "name": "stacked",
              "label": "Stacked",
              "onChange": "stackedChanged()"
            }
          },
          {
            "type": "InputField",
            "id": "labels",
            "props": {
              "type": "checkbox",
              "name": "labels",
              "label": "Values",
              "onChange": "labelsChanged()"
            }
          }
        ]
      }
    ]
  },
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
            "id": "random",
            "props": {
              "text": "Randomize",
              "onClick": "randomize()"
            }
          },
          {
            "type": "ButtonField",
            "id": "add",
            "props": {
              "text": "+ Add month",
              "onClick": "addMonth()"
            }
          },
          {
            "type": "ButtonField",
            "id": "best",
            "props": {
              "text": "Highlight best month",
              "variant": "outline-success",
              "onClick": "highlightBest()"
            }
          },
          {
            "type": "ButtonField",
            "id": "store",
            "props": {
              "text": "Show / hide Store",
              "variant": "outline-secondary",
              "onClick": "toggleStore()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Chart",
    "id": "sales",
    "props": {
      "chartType": "bar",
      "title": "Monthly sales",
      "subtitle": "Thousands of USD",
      "height": 300,
      "labels": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ],
      "series": [
        {
          "key": "online",
          "name": "Online",
          "data": [
            42,
            51,
            38,
            64,
            58,
            71
          ]
        },
        {
          "key": "store",
          "name": "Store",
          "data": [
            30,
            28,
            35,
            31,
            40,
            37
          ]
        },
        {
          "key": "target",
          "name": "Target",
          "type": "line",
          "dashed": true,
          "data": [
            45,
            48,
            50,
            55,
            60,
            65
          ]
        }
      ],
      "format": "number",
      "yAxis": {
        "title": "Sales (K)"
      },
      "rulers": [
        {
          "value": 60,
          "label": "Goal",
          "showValue": true
        }
      ],
      "pointRules": [
        {
          "when": {
            "lt": 32
          },
          "color": "#d03b3b"
        }
      ],
      "highlightColor": "#0ca30c",
      "tableToggle": true,
      "onPointClick": "pointClicked()",
      "onLegendClick": "legendClicked()"
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // typeChanged: run by SelectField "type" (onChange)
  typeChanged: (event, { value }) => api.setChartType("sales", value || "bar"),
  // marchChanged: run by SliderField "march" (onChange)
  marchChanged: (event, { value }) => api.setChartValue("sales", "online", "Mar", Number(value)),
  // stackedChanged: run by InputField "stacked" (onChange)
  stackedChanged: (event, { value }) => api.setNodeProps("sales", { stacked: value }),
  // labelsChanged: run by InputField "labels" (onChange)
  labelsChanged: (event, { value }) => api.setNodeProps("sales", { dataLabels: value ? "all" : false }),
  // randomize: run by ButtonField "random" (onClick)
  randomize: () => {
    const { labels, series } = api.getChartData("sales");
    api.setChartData("sales", { series: series.map((s) => (s.key === "target" ? s : { ...s, data: labels.map(() => random(25, 80)) })) });
  },
  // addMonth: run by ButtonField "add" (onClick)
  addMonth: () => {
    const { labels } = api.getChartData("sales");
    api.addChartPoint("sales", months[labels.length % 12], { online: random(40, 80), store: random(25, 45), target: 65 }, { max: 12 });
  },
  // highlightBest: run by ButtonField "best" (onClick)
  highlightBest: () => {
    const { series } = api.getChartData("sales");
    const online = series.find((s) => s.key === "online").data;
    api.highlightChart("sales", { series: "online", index: online.indexOf(Math.max(...online)) });
  },
  // toggleStore: run by ButtonField "store" (onClick)
  toggleStore: () => api.toggleSeries("sales", "store"),
  // pointClicked: run by Chart "sales" (onPointClick)
  pointClicked: ({ label, seriesName, value }) => console.log(label, seriesName, value),
  // legendClicked: run by Chart "sales" (onLegendClick)
  legendClicked: ({ series, hidden }) => console.log(series, hidden ? "hidden" : "shown"),
});
