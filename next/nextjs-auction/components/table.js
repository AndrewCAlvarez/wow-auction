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
              <Link
                href={{
                  pathname: `/items/${item.id}`,
                  // query: {
                  //   auctions: { miningAuctions },
                  // },
                }}
              >
                {item.name}
              </Link>
            </td>
            <td>
              {/* <Link href={`/items/${item.id}`}> */}
              {item.rising ? "UP" : "DOWN"}
              {/* </Link> */}
            </td>
            <td>
              {/* <Link href={`/items/${item.id}`}> */}
              {item.average}
              {/* </Link> */}
            </td>
            <td>
              {/* <Link href={`/items/${item.id}`}> */}
              {item.high}
              {/* </Link> */}
            </td>
            <td>
              {/* <Link href={`/items/${item.id}`}> */}
              {item.low}
              {/* </Link> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
