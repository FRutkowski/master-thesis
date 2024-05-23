import { useState } from "react";
import "../../style.css";

interface DataElement {
  id: number;
  label: string;
}

function App() {
  let ID: number = 1;
  const data = (count: number) => {
    const data: DataElement[] = [];
    for (let i = ID - 1; i < count; ++i) {
      data.push({
        id: ID++,
        label: " I will eat " + ID + " apples",
      });
    }

    return data;
  };

  const [tableRows, setTableRows] = useState<DataElement[] | undefined>([]);
  const createTableRows = (count: number) => {
    setTableRows(data(count));
  };

  const appendTableRows = (count: number) => {
    if (tableRows === undefined) return;
    setTableRows([...tableRows, ...data(count)]);
  };

  const removeAll = () => {
    ID = 1;
    setTableRows(undefined);
    setSelectedRow(undefined);
  };

  const remove = (id: number) => {
    if (tableRows === undefined) return;
    const array = tableRows.filter(
      (dataElement: DataElement) => dataElement.id !== id
    );

    setTableRows(array);
    if (selectedRow === id) setSelectedRow(undefined);
  };

  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const select = (id: number) => {
    setSelectedRow(id);
  };

  const update5thRow = () => {
    if (tableRows === undefined) return;
    const _tableRows = [...tableRows];
    for (let i = 0; i < _tableRows.length; i += 5) {
      _tableRows[i].label = "Updated!";
    }

    setTableRows(_tableRows);
  };
  return (
    <>
      <div>
        React ts Benchmark
        <button onClick={() => createTableRows(5000)}>Create 5000 rows</button>
        <button onClick={() => appendTableRows(5000)}>Append 50000 rows</button>
        <button onClick={() => createTableRows(100000)}>Create 500000 rows</button>
        <button onClick={() => update5thRow()}>Update every 5th row</button>
        <button onClick={() => removeAll()}>Remove all rows</button>
        <button>Swap rows</button>
        {selectedRow ? <div>{"Selected: " + selectedRow}</div> : null}
      </div>
      <div>
        <table>
          <tbody>
            <div>
              <th>ID</th>
              <th>Description</th>
            </div>
            {tableRows?.map((tableRow) => (
              <>
                <tr>
                  <a>{tableRow.id}</a>
                  <a>{tableRow.label}</a>
                  <button onClick={() => select(tableRow.id)}>Select</button>
                  <button onClick={() => remove(tableRow.id)}>Remove</button>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
