import { useRouter } from "next/router";
import {
  getAllRecipeIds,
  getRecipeData,
  getRecipeAuctions,
} from "../../lib/database/prismaActions";
import Layout from "../../components/layout";

export async function getStaticPaths() {
  const paths = await getAllRecipeIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getRecipeData(params.id);
  // console.log(data.data.itemId);
  const auctions = await getRecipeAuctions(data);
  console.log(auctions);
  return {
    props: {
      data,
      auctions,
    },
  };
}

export default function Recipe({ data, auctions }) {
  const recipe = JSON.parse(data.data.data);
  // console.log(recipe.reagents);
  // console.log(recipe);
  console.log(auctions);
  return (
    <section>
      <h2>{recipe.name}</h2>
      <table>
        <th>
          <td>Buyout</td>
          <td>Quantity</td>
        </th>
        <tbody>
          {auctions.map((auction) => (
            <tr>
              <td>{auction.buyout}</td>
              <td>{auction.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TODO: Add wowhead.com links to the ITEM not recipe */}
      {/* <a
          href={`https://www.wowhead.com/classic/item=${recipe.crafted_item.id}`}
        >
          wowhead
        </a> */}
    </section>
  );
}
