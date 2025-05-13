Quill.register("modules/placeholder", PlaceholderModule.default(Quill));
Quill.register("modules/autocomplete", QuillPlaceholderAutocomplete(Quill));
const placeholders = [
  { id: "invoice.dueDate", label: "Invoice Due Date" },
  { id: "client.firstName", label: "Client First Name" },
  { id: "client.lastName", label: "Client Last Name" },
  { id: "client.email", label: "Client Email" },
  { id: "client.address", label: "Client Address" },
  { id: "client.city", label: "Client City" },
  { id: "client.state", label: "Client State" },
  { id: "client.zip", label: "Client Zip" },
  { id: "client.country", label: "Client Country" },
  { id: "user.firstName", label: "User First Name" },
  { id: "user.lastName", label: "User Last Name" },
  { id: "user.email", label: "User Email" },
  { id: "user.address", label: "User Address" },
  { id: "user.city", label: "User City" },
  { id: "user.state", label: "User State" },
  { id: "user.zip", label: "User Zip" },
  { id: "user.country", label: "User Country" },
  { id: "company.name", label: "Company Name" },
  { id: "company.address", label: "Company Address" },
  { id: "company.city", label: "Company City" },
  { id: "company.state", label: "Company State" },
  { id: "company.zip", label: "Company Zip" },
  { id: "company.country", label: "Company Country" },
  { id: "invoice.total", label: "Invoice Total" },
  { id: "invoice.subtotal", label: "Invoice Subtotal" },
  { id: "invoice.tax", label: "Invoice Tax" },
  { id: "invoice.discount", label: "Invoice Discount" },
  { id: "invoice.items", label: "Invoice Items" },
  { id: "invoice.notes", label: "Invoice Notes" },
  { id: "invoice.terms", label: "Invoice Terms" },
  { id: "invoice.footer", label: "Invoice Footer" },
  { id: "invoice.logo", label: "Invoice Logo" },
  { id: "invoice.signature", label: "Invoice Signature" },
  { id: "invoice.date", label: "Invoice Date" },
  { id: "invoice.number", label: "Invoice Number" },
  { id: "invoice.currency", label: "Invoice Currency" },
  { id: "invoice.paymentMethod", label: "Invoice Payment Method" },
  { id: "invoice.paymentTerms", label: "Invoice Payment Terms" },
  { id: "invoice.dueDate", label: "Invoice Due Date" },
  { id: "invoice.createdAt", label: "Invoice Created At" },
  { id: "invoice.updatedAt", label: "Invoice Updated At" },
  { id: "invoice.paidAt", label: "Invoice Paid At" },
  { id: "invoice.status", label: "Invoice Status" },
  { id: "invoice.notes", label: "Invoice Notes" },
  { id: "invoice.terms", label: "Invoice Terms" },
  { id: "invoice.footer", label: "Invoice Footer" },
  { id: "invoice.logo", label: "Invoice Logo" },
  { id: "invoice.signature", label: "Invoice Signature" },
  { id: "invoice.date", label: "Invoice Date" },
  { id: "invoice.number", label: "Invoice Number" },
  { id: "invoice.currency", label: "Invoice Currency" },
  { id: "invoice.paymentMethod", label: "Invoice Payment Method" },
  { id: "invoice.paymentTerms", label: "Invoice Payment Terms" },
];

const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar-container",
    placeholder: {
      delimiters: ["", ""],
    },
    autocomplete: {
      getPlaceholders: () => placeholders, // factory
      triggerKey: "/", // default
    },
  },
  theme: "snow",
});

document.querySelectorAll(".placeholders li").forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    const label = item.getAttribute("data-label");
    const selection = quill.getSelection(true);
    quill.insertEmbed(selection?.index || 0, "placeholder", { id, label });
  });
});

document.getElementById("export-html").addEventListener("click", () => {
  let html = quill.root.innerHTML;

  // blackmagic to replace the placeholder label with placeholder id
  // <span data-id="user.address">{{User Address}}</span> becomes <span data-id="user.address">{{user.address}}</span>
  html = html
    .replace(
      /<span class="ql-placeholder-content"[^>]*data-id="([^"]+)"[^>]*>.*?<span[^>]*contenteditable="false">.*?<\/span>.*?<\/span>/g,
      (match, dataId) => {
        return match.replace(
          /<span[^>]*contenteditable="false">.*?<\/span>/,
          `<span contenteditable="false">{{${dataId}}}</span>`
        );
      }
    )
    .replace(/\uFEFF/g, "");
  // TODO: this html needs to be wrapped  around and add print styles
  document.getElementById("output").value = html;
});
