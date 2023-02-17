import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";
import Table from "../../components/table";

export default function Item(props) {
  return (
    <section>
      <h1>Item Name</h1>
      <Image
        priority
        src="/images/dwarf-icon-26.jpg"
        className={utilStyles.borderCircle}
        height={40}
        width={40}
        alt=""
      />
      <label>Description</label>
      <p>This is the description of the item.</p>
    </section>
  );
}
