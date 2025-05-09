Quill.register("modules/placeholder", PlaceholderModule.default(Quill));

const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar-container",
    placeholder: {
      delimiters: ['{{', '}}']
    },
  },
  theme: "snow"
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

  // blackmagic to replace the placeholder label with placeholder id 
  // <span data-id="user.address">{{User Address}}</span> becomes <span data-id="user.address">{{user.address}}</span>
  html = html.replace(
    /<span class="ql-placeholder-content"[^>]*data-id="([^"]+)"[^>]*>.*?<span[^>]*>{{.*?}}<\/span>.*?<\/span>/g,
    (match, dataId) => {
      return match.replace(/{{.*?}}/, `{{${dataId}}}`);
    }
  ).replace(/\uFEFF/g, '');

  // TODO: this html needs to be wrapped  around and add print styles
  document.getElementById('output').value = html;
});
