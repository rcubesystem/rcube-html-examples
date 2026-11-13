<%-- File upload (drag & drop) — https://rcube-html.com/file-upload
     The schema is in WEB-INF/schemas/file-upload.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>File upload (drag & drop) — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">File upload (drag & drop)</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/file-upload.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
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

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
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
      }),
    });
    form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));
  </script>
</body>
</html>
