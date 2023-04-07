import styles from "./layout.module.css";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <p>KoaCraft</p>
        <select>
          <option value="Proudmoore">Proudmoore</option>
        </select>
        <menu>
          <ul>
            <li>Blacksmithing</li>
          </ul>
        </menu>
      </nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
