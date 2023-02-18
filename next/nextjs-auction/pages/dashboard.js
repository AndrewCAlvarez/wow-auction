import Layout from "../components/layout";
import Mining from "./professions/mining";
import { useEffect, useState } from "react";
import {
  getAccessToken,
  getCommodities,
  getMiningAuctions,
} from "../lib/data-retrieval";

//server-side rendering
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100, stale-while-revalidate=59"
  );

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

export default function Dashboard({ miningAuctions }) {
  return <Mining miningAuctions={miningAuctions}></Mining>;
}
