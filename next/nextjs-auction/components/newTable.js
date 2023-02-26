import Link from "next/link";

export default function Table(props) {
  // expected format of tableData
  // const tableData = {
  //   tableHeaders: ["first", "second", "third"],
  //   tableRows: [
  //     ["d1", "d2", "d3"],
  //     ["e1", "e2", "e3"],
  //   ],
  // };

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
        {/* // For each chunk of row data, create a row and add table data */}
        {props.tableRows.map((row) => (
          <tr>
            {row.map((rowData) => (
              <td>{rowData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
