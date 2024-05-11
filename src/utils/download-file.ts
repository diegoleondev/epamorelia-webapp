interface DownloadBlobOptions {
  blob: Blob;
  filename: string;
}

export const downloadBlob = (options: DownloadBlobOptions) => {
  const url = window.URL.createObjectURL(options.blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = options.filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
