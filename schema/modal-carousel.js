// Modal & carousel — Pop-up dialogs with fields, and sliding image / content carousels.
// Live example and explanation: https://rcube-html.com/modal-carousel
// Group: Containers
//
// Covers:
//   - Modal
//   - Carousel
//
// Form fields (name — type, label):
//   - nickname — InputField "Nickname" (required)
//   - theme — SelectField "Theme"
//
// Actions written here: saveProfile, modalHidden
// Built-in actions it uses: openModal() (from the library or the page), closeModal() (from the library or the
//    page)
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/modal-carousel";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-modal",
    "children": [
      {
        "type": "column",
        "id": "c-modal",
        "props": {
          "className": "rc-d-flex rc-gap-2 rc-mb-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "open",
            "props": {
              "text": "Edit profile (modal)",
              "variant": "primary",
              "data-modal": "edit-modal",
              "onClick": "openModal()"
            }
          },
          {
            "type": "P",
            "id": "saved",
            "props": {
              "className": "rc-mb-0 rc-align-self-center rc-text-body-secondary",
              "text": ""
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Modal",
    "id": "edit-modal",
    "props": {
      "title": "Edit profile",
      "show": false,
      "centered": true,
      "onHide": "modalHidden()"
    },
    "children": [
      {
        "type": "InputField",
        "id": "nickname",
        "props": {
          "name": "nickname",
          "label": "Nickname",
          "required": true
        }
      },
      {
        "type": "SelectField",
        "id": "theme",
        "props": {
          "name": "theme",
          "label": "Theme",
          "options": [
            "Light",
            "Dark"
          ]
        }
      }
    ],
    "footer": [
      {
        "type": "ButtonField",
        "id": "cancel",
        "props": {
          "text": "Cancel",
          "variant": "outline-secondary",
          "data-modal": "edit-modal",
          "onClick": "closeModal()"
        }
      },
      {
        "type": "ButtonField",
        "id": "save",
        "props": {
          "text": "Save",
          "onClick": "saveProfile()"
        }
      }
    ]
  },
  {
    "type": "row",
    "id": "row-carousel",
    "props": {
      "className": "rc-mt-3"
    },
    "children": [
      {
        "type": "column",
        "id": "c-carousel",
        "children": [
          {
            "type": "Carousel",
            "id": "hero",
            "props": {
              "interval": 4000
            },
            "items": [
              {
                "src": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22260%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232a78d6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23fff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2236%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ESlide%20one%3C%2Ftext%3E%3C%2Fsvg%3E",
                "alt": "Slide one",
                "caption": "Image slide",
                "text": "With a caption"
              },
              {
                "src": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22260%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231baf7a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23fff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2236%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ESlide%20two%3C%2Ftext%3E%3C%2Fsvg%3E",
                "alt": "Slide two",
                "caption": "Second slide"
              },
              {
                "children": [
                  {
                    "type": "DIV",
                    "id": "node-slide",
                    "props": {
                      "className": "rc-p-5 rc-text-center rc-bg-body-tertiary",
                      "style": {
                        "height": 260
                      },
                      "children": "A slide made of schema nodes"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // saveProfile: run by ButtonField "save" (onClick)
  saveProfile: () => {
    const { nickname, theme } = api.getFormData();
    if (!nickname) { api.setNodeProps("saved", { text: "Nickname is required." }); return; }
    api.setNodeProps("saved", { text: "Saved: " + nickname + " (" + (theme || "no theme") + ")" });
    api.closeModal("edit-modal");
  },
  // modalHidden: run by Modal "edit-modal" (onHide)
  modalHidden: () => console.log("Modal closed"),
});
