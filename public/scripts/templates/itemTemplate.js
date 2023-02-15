function generateItemCard() {
  fetch("./miningItems.js").then((items) => {
    console.log(items);
  });
}

export { generateItemCard };
