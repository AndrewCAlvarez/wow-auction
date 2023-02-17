import Layout from "../components/layout";
import Mining from "./professions/mining";
import {
  getAccessToken,
  getCommodities,
  getMiningAuctions,
} from "../lib/data-retrieval";

//server-side rendering
export async function getServerSideProps(context) {
  let accessToken = await getAccessToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GRANT_TYPE
  );

  let miningAuctions = await getMiningAuctions(accessToken);

  return {
    props: { miningAuctions },
  };
}

export default function Dashboard({ miningAuctions }) {
  return (
    <Layout>
      <Mining miningAuctions={miningAuctions}></Mining>
    </Layout>
  );
}
