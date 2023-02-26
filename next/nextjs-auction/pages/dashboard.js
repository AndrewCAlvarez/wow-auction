import Mining from "./professions/mining";
import { getAccessToken, getMiningAuctions } from "../lib/data-retrieval";

//server-side rendering
export async function getServerSideProps(context) {
  let accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );

  let miningAuctions = await getMiningAuctions(accessToken);

  return {
    props: {},
  };
}

export default function Dashboard({ miningAuctions }) {
  console.log(miningAuctions);

  return <h1>Dashboard</h1>;
  return <Mining miningAuctions={miningAuctions}></Mining>;
}
