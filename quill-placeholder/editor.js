Quill.register("modules/placeholder", PlaceholderModule.default(Quill));

const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar-container",
    placeholder: {
      delimiters: ['{{', '}}'],  // default
      placeholders: [
        { id: "foo", label: "Foo" },
        { id: "required", label: "Required", required: true },
        { id: "date", label: "Date" },
        { id: "invoice-number", label: "Invoice Number" },
        { id: "customer-name", label: "Customer Name" },
        { id: "billing-address", label: "Billing Address" },
        { id: "total-amount", label: "Total Amount" },
      ],
    },
  },
  theme: "snow",
  placeholder: "Compose an epic...",
});

document.querySelectorAll('.placeholders li').forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-id');
    const label = item.getAttribute('data-label');
    const selection = quill.getSelection(true);
    quill.insertEmbed(selection?.index || 0, "placeholder", {id, label})
  });
});

document.getElementById('export-html').addEventListener('click', () => {
  let html = quill.root.innerHTML;

  // Replace placeholder spans with {{data-id}}
  html = html.replace(/<span class="ql-placeholder-content"[^>]*data-id="([^"]+)"[^>]*>.*?<\/span>/g, (match, dataId) => {
    return `{{${dataId}}}`;
  });

  // Set the HTML to the textarea with id "output"
  document.getElementById('output').value = html;
});
