import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

import {
  getAccessToken,
  getCommodities,
  getMiningAuctions,
} from "../../lib/data-retrieval";

//server-side rendering
export async function getServerSideProps(context) {
  let accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );

  let miningAuctions = await getMiningAuctions(accessToken);
  console.log(miningAuctions);
  return {
    props: { miningAuctions },
  };
}

export default function Mining({ miningAuctions }) {
  return (
    <Layout>
      <Head>
        <title>Mining</title>
      </Head>
      <h1>Mining</h1>
      <ul>
        {miningAuctions.map((auction) => (
          <li key={auction.id}>{auction.id}</li>
        ))}
      </ul>
    </Layout>
  );
}
