// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// File upload (drag & drop) — https://rcube-html.com/file-upload
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";
import "rcube-html/element/upload";

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

const schema = [
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

@Component({
  selector: "app-file-upload",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [actions]="actions"
    (submitted)="onSubmit($event.entries)"
  ></rcube-html-form>`,
})
export class FileUploadComponent {
  schema = schema;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    // Receives { file, name, size, type, title, onProgress, signal }; returns the server's answer (save title with it)
    uploadFile: (payload) => { console.log("Uploading", payload.name, payload.title ? "titled " + payload.title : "(no title)"); return fakeUpload(payload, 0.2); },
    uploadPhoto: (payload) => fakeUpload(payload),
    // Return a message to reject a file ("" = OK)
    checkName: ({ name }) => (/draft/i.test(name) ? "Drafts are not accepted." : ""),
    filesAdded: ({ files, source }) => console.log(files.length, "file(s) added by", source),
    fileRejected: ({ file, message }) => console.log(file.name, "rejected:", message),
    uploaded: ({ file, response }) => console.log(file.name, "->", response),
    uploadFailed: ({ file, error }) => console.log(file.name, "failed:", error.message),
    allDone: ({ files, failed }) => console.log(files.length, "uploaded,", failed.length, "failed"),
    // Delete it on the server first; return false to keep the file
    removeFile: async ({ file }) => { console.log("Delete on server:", file.name); return true; },
    uploadPhotosNow: () => api.uploadFiles("photos"),
    loadSaved: () => api.setFieldValue("documents", [
      { id: "srv-1", name: "contract.pdf", size: 482133, type: "application/pdf", url: "#contract", title: "Signed contract" },
      { id: "srv-2", name: "invoice-1042.pdf", size: 91022, type: "application/pdf", url: "#invoice" },
    ]),
    clearDocs: () => api.clearFiles("documents"),
  });
  onSubmit(entries: unknown[]) {
    console.log("Submitted:", entries);
  }
}