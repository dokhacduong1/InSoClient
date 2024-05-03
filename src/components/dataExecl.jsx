import { forwardRef, useState } from "react";
import * as XLSX from "xlsx";

const DataExel = forwardRef((props, ref) => {
  const [items, setItems] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];
       
       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  console.log(items);
  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />

        <table ref={ref} style={{ width: "100%", margin: "20px" }}>
          <thead></thead>
          <tbody>
            {Object.keys(items[0] || {}).map((column, columnIndex) => (
              <tr key={columnIndex}>
                {items.map((row, rowIndex) => (
                  <td key={rowIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DataExel.displayName = "DataExel"; // Add display name

export default DataExel;
