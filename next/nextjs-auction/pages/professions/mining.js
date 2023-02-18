import Table from "../../components/table";
import { useEffect, useState } from "react";
import { miningItems } from "../../lib/miningItems";

function getItemPrices(item, miningAuctions) {
  let itemPrices = [];

  let itemAuctions = miningAuctions.filter(
    (auction) => auction.item.id === item.id
  );
  itemAuctions.forEach((auction) => {
    itemPrices.push(Number(auction.unit_price));
  });

  return itemPrices;
}

function getAveragePrice(itemPrices) {
  let sum = 0;
  itemPrices.forEach((price) => {
    sum += price;
  });
  return Math.floor(sum / itemPrices.length);
}

function createNewItemsObj(items, miningAuctions) {
  let newItems = [];

  items.forEach((item) => {
    let itemPrices = getItemPrices(item, miningAuctions);
    let averagePrice = getAveragePrice(itemPrices);
    let highPrice = Math.max(...itemPrices);
    let lowPrice = Math.min(...itemPrices);
    let itemChanges = {
      rising: "UP",
      average: averagePrice,
      high: highPrice,
      low: lowPrice,
    };
    const newItem = { ...item, ...itemChanges };

    newItems.push(newItem);
  });

  return newItems;
}

export default function Mining(props) {
  const [items, setItems] = useState(miningItems);

  // TODO: Call on first load, then refresh every hour
  useEffect(() => {
    let newItems = createNewItemsObj(items, props.miningAuctions);
    setItems(newItems);
  }, []);

  return (
    <section>
      <h1>Mining</h1>
      <Table
        miningAuctions={props.miningAuctions}
        items={items}
        tableHeaders={["Name", "Rising", "Average", "High", "Low"]}
      />
    </section>
  );
}
