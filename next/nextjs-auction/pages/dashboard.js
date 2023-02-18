import Mining from "./professions/mining";
import { getAccessToken, getMiningAuctions } from "../lib/data-retrieval";

//server-side rendering
export async function getServerSideProps() {
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
