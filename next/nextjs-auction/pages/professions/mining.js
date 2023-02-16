import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";

import {
  getAccessToken,
  getCommodities,
  getMiningAuctions,
} from "../../lib/data-retrieval";
import { miningItems } from "../../lib/miningItems";

//server-side rendering
export async function getServerSideProps(context) {
  let accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );

  // let miningAuctions = await getMiningAuctions(accessToken);
  let miningAuctions = {};
  console.log(miningAuctions);
  return {
    props: { miningAuctions },
  };
}

export default function Mining({ miningAuctions }) {
  const [items, setItems] = React.useState(miningItems);

  return (
    <Layout>
      <Head>
        <title>Mining</title>
      </Head>
      <h1>Mining</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Rising</td>
            <td>Average</td>
            <td>High</td>
            <td>Low</td>
          </tr>
        </thead>
        {/* {miningAuctions.map((auction) => (
          <li key={auction.id}>{auction.id}</li>
        ))} */}
        <tbody>
          {items.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.rising ? "UP" : "DOWN"}</td>
              <td>{item.average}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
