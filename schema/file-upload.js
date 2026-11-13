// File upload (drag & drop) — Drop, browse or paste files; validate them and upload with progress, cancel and
//    retry.
// Live example and explanation: https://rcube-html.com/file-upload
// Group: Data components
//
// Covers:
//   - A drag & drop upload field
//   - A title for each file
//
// Form fields (name — type, label):
//   - documents — FileUploadField "Documents" (required)
//   - photos — FileUploadField "Photos (upload when you press the button)"
//   - avatar — FileUploadField "Avatar (one file, compact)"
//
// Actions written here: uploadFile, uploadPhoto, checkName, filesAdded, fileRejected, uploaded, uploadFailed,
//    allDone, removeFile, uploadPhotosNow, loadSaved, clearDocs
// Built-in actions it uses: runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/file-upload";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// Helpers the actions use (fakeUpload): in a real app, often your API or data.
// ---- A fake upload with progress. A real one:
//   import { uploadWithXhr } from "rcube-html";
//   uploadFile: ({ file, onProgress, signal }) => uploadWithXhr({ url: "/api/files", file, onProgress, signal })
const fakeUpload = ({ file, onProgress, signal }, failRate = 0) => new Promise((resolve, reject) => {
  let percent = 0;
  const timer = setInterval(() => {
    percent += 8 + Math.random() * 15;
    if (percent < 100) { onProgress(percent); return; }
    clearInterval(timer);
    if (Math.random() < failRate) reject(new Error("Server error (simulated) — press retry"));
    else resolve({ id: "srv-" + Date.now(), url: URL.createObjectURL(file) });
  }, 150);
  signal.addEventListener("abort", () => {
    clearInterval(timer);
    reject(Object.assign(new Error("Upload cancelled"), { name: "AbortError" }));
  });
});

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-uploads",
    "props": {
      "className": "rc-g-3"
    },
    "children": [
      {
        "type": "column",
        "id": "c-docs",
        "props": {
          "className": "rc-col-12 rc-col-lg-6"
        },
        "children": [
          {
            "type": "FileUploadField",
            "id": "docs",
            "props": {
              "name": "documents",
              "label": "Documents",
              "required": true,
              "fileTitleMax": 50,
              "fileTitlePlaceholder": "Optional, e.g. Signed contract",
              "accept": ".pdf,.doc,.docx,.txt,image/*",
              "maxSize": "5MB",
              "maxFiles": 4,
              "parallel": 2,
              "hint": "PDF, Word, text or images · up to 5 MB · max 4 files",
              "onUpload": "uploadFile()",
              "onValidate": "checkName()",
              "onFilesAdded": "filesAdded()",
              "onFileRejected": "fileRejected()",
              "onUploadComplete": "uploaded()",
              "onUploadError": "uploadFailed()",
              "onAllComplete": "allDone()",
              "onRemove": "removeFile()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-photos",
        "props": {
          "className": "rc-col-12 rc-col-lg-6"
        },
        "children": [
          {
            "type": "FileUploadField",
            "id": "photos",
            "props": {
              "name": "photos",
              "label": "Photos (upload when you press the button)",
              "accept": "image/*",
              "variant": "grid",
              "autoUpload": false,
              "maxTotalSize": "20MB",
              "title": "Drop photos here",
              "buttonText": "Choose photos",
              "onUpload": "uploadPhoto()"
            }
          },
          {
            "type": "FileUploadField",
            "id": "avatar",
            "props": {
              "name": "avatar",
              "label": "Avatar (one file, compact)",
              "multiple": false,
              "compact": true,
              "fileTitle": false,
              "accept": "image/png,image/jpeg",
              "maxSize": "2MB",
              "onUpload": "uploadPhoto()"
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
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-justify-content-end"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "upload-photos",
            "props": {
              "text": "Upload photos",
              "variant": "outline-primary",
              "onClick": "uploadPhotosNow()"
            }
          },
          {
            "type": "ButtonField",
            "id": "saved",
            "props": {
              "text": "Load saved documents",
              "variant": "outline-secondary",
              "onClick": "loadSaved()"
            }
          },
          {
            "type": "ButtonField",
            "id": "clear",
            "props": {
              "text": "Clear documents",
              "variant": "outline-danger",
              "onClick": "clearDocs()"
            }
          },
          {
            "type": "ButtonField",
            "id": "submit",
            "props": {
              "type": "submit",
              "text": "Submit",
              "onClick": "runValidation()"
            }
          }
        ]
      }
    ]
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // Receives { file, name, size, type, title, onProgress, signal }; returns the server's answer (save title with it)
  // uploadFile: run by FileUploadField "docs" (onUpload)
  uploadFile: (payload) => { console.log("Uploading", payload.name, payload.title ? "titled " + payload.title : "(no title)"); return fakeUpload(payload, 0.2); },
  // uploadPhoto: run by FileUploadField "photos" (onUpload); FileUploadField "avatar" (onUpload)
  uploadPhoto: (payload) => fakeUpload(payload),
  // Return a message to reject a file ("" = OK)
  // checkName: run by FileUploadField "docs" (onValidate)
  checkName: ({ name }) => (/draft/i.test(name) ? "Drafts are not accepted." : ""),
  // filesAdded: run by FileUploadField "docs" (onFilesAdded)
  filesAdded: ({ files, source }) => console.log(files.length, "file(s) added by", source),
  // fileRejected: run by FileUploadField "docs" (onFileRejected)
  fileRejected: ({ file, message }) => console.log(file.name, "rejected:", message),
  // uploaded: run by FileUploadField "docs" (onUploadComplete)
  uploaded: ({ file, response }) => console.log(file.name, "->", response),
  // uploadFailed: run by FileUploadField "docs" (onUploadError)
  uploadFailed: ({ file, error }) => console.log(file.name, "failed:", error.message),
  // allDone: run by FileUploadField "docs" (onAllComplete)
  allDone: ({ files, failed }) => console.log(files.length, "uploaded,", failed.length, "failed"),
  // Delete it on the server first; return false to keep the file
  // removeFile: run by FileUploadField "docs" (onRemove)
  removeFile: async ({ file }) => { console.log("Delete on server:", file.name); return true; },
  // uploadPhotosNow: run by ButtonField "upload-photos" (onClick)
  uploadPhotosNow: () => api.uploadFiles("photos"),
  // loadSaved: run by ButtonField "saved" (onClick)
  loadSaved: () => api.setFieldValue("documents", [
    { id: "srv-1", name: "contract.pdf", size: 482133, type: "application/pdf", url: "#contract", title: "Signed contract" },
    { id: "srv-2", name: "invoice-1042.pdf", size: 91022, type: "application/pdf", url: "#invoice" },
  ]),
  // clearDocs: run by ButtonField "clear" (onClick)
  clearDocs: () => api.clearFiles("documents"),
});
