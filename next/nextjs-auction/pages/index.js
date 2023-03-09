import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Test from "./test";
import { getAccessToken, getCommodities } from "../lib/data-retrieval";

// pre-rendering
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  let accessToken = await getAccessToken();
  let time = { seconds: Date.now() };

  return {
    props: {
      allPostsData,
      accessToken,
      time,
    },
    revalidate: 1000,
  };
}

export default function Home({ allPostsData, accessToken, time }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Access Token: {accessToken.access_token}</p>
        <p>Token expires: {accessToken.expires_in}</p>
        <p>Time: {time.seconds}</p>
        <ul>
          <li>
            <Link href="/test">Test</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/professions/mining">Mining</Link>
          </li>
          <li>
            <Link href="/professions/blacksmithing">Blacksmithing</Link>
          </li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
