import Link from "next/link";

export default function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          {props.tableHeaders.map((header) => (
            <td>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <tr key={item.id}>
            <td>
              <Link href="/professions/item">{item.name}</Link>
            </td>
            <td>
              <Link href="/professions/item">
                {item.rising ? "UP" : "DOWN"}
              </Link>
            </td>
            <td>
              <Link href="/professions/item">{item.average}</Link>
            </td>
            <td>
              <Link href="/professions/item">{item.high}</Link>
            </td>
            <td>
              <Link href="/professions/item">{item.low}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
