import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <ul>
          <li>
            <Link href="/professions/mining">Mining</Link>
          </li>
          <li>
            <Link href="/professions/blacksmithing">Blacksmithing</Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
