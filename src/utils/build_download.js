function buildDownloadFunction() {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = 'none';
  return function ({ data, fileName }) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

export default buildDownloadFunction;