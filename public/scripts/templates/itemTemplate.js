function createCardItemTemplate() {
  let itemTemplate = document.getElementById("card-item-template");
  let itemTemplateContent = itemTemplate.content;
  document.body.appendChild(itemTemplateContent);
}

export { createCardItemTemplate };
