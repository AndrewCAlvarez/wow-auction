import { getAccessToken } from "../../lib/data-retrieval";
import { getItemById, getItemMedia } from "../../lib/items";
import { getMiningAuctions } from "../../lib/data-retrieval";
import { useEffect, useState } from "react";
import utilStyles from "../../styles/utils.module.css";

export async function getServerSideProps({ query }) {
  let itemData = {};
  let accessToken = {};
  try {
    accessToken = await getAccessToken(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.GRANT_TYPE
    );
    itemData = await getItemById(accessToken.access_token, query.id);

    let miningAuctions = await getMiningAuctions(accessToken);
    let itemAuctions = miningAuctions.filter((auction) => {
      if (auction.item.id === itemData.id) {
        return auction;
      }
    });

    itemData = { itemData: itemData, itemAuctions: itemAuctions };
    // console.log(itemData.itemData);

    // console.log(itemData);
  } catch (error) {
    console.log(error);
  }

  return { props: { data: itemData } };
}

export default function Item({ data }) {
  let itemDetails = Object.keys(data.itemData).map((key) => (
    <li>
      {key} : {typeof data.itemData[key]}
    </li>
  ));
  console.log(data.itemData);

  return (
    <>
      <br />
      <div>
        <ul>
          <li>Name: {data.itemData.name}</li>
          <li>
            Description:{" "}
            {!data.itemData.description ? "None" : data.itemData.description}
          </li>
          <li>Quality: {data.itemData.quality.name}</li>
          <li>Level: {data.itemData.level}</li>
          <li>Required Level: {data.itemData.required_level}</li>
          <li>Item Class: {data.itemData.item_class.name}</li>
          <li>Item Sub-Class: {data.itemData.item_subclass.name}</li>
          <li>Inventory Type: {data.itemData.inventory_type.name}</li>
          {/* TODO: CONVERT TO GOLD */}
          <li>Sell Price: {data.itemData.sell_price}</li>
        </ul>
      </div>
      <br />
      <ul>
        {data.itemAuctions.map((auction) => (
          <li>Unit Price: {auction.unit_price}</li>
        ))}
      </ul>
    </>
  );
}
