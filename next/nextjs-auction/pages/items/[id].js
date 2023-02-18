import { getAccessToken } from "../../lib/data-retrieval";
import { getItemById, getItemMedia } from "../../lib/items";
import { getMiningAuctions } from "../../lib/data-retrieval";

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
    console.log(itemData);
  } catch (error) {
    console.log(error);
  }

  return { props: { data: itemData } };
}

export default function Item({ data }) {
  return (
    <>
      <ul>
        <li>{data.itemData.name}</li>
      </ul>

      <ul>
        {data.itemAuctions.map((auction) => (
          <li>Unit Price: {auction.unit_price}</li>
        ))}
      </ul>
    </>
  );
}
