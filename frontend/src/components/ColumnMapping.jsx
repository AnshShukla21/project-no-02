import { useState } from "react";

function ColumnMapping({
  columns,
  datasetId,
  onMappingComplete,
}) {
  const [mapping, setMapping] = useState({});
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMappingChange = (sourceColumn, value) => {
    if (value !== "") {
      const alreadyMapped = Object.keys(mapping).some(
        (column) =>
          column !== sourceColumn &&
          mapping[column] === value
      );

      if (alreadyMapped) {
        alert("This destination field is already mapped!");
        return;
      }
    }

    setMapping((prev) => ({
      ...prev,
      [sourceColumn]: value,
    }));
  };

  const handleSaveMapping = async () => {
    if (!datasetId) {
      alert("Please upload a file first!");
      return;
    }

    const selectedMappings = Object.values(mapping).filter(Boolean);

    if (selectedMappings.length === 0) {
      alert("Please select at least one destination field!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/mapping",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId,
            mapping,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Mapping failed"
        );
      }

      console.log("Mapping API Response:", result);

      const mappedRows = result.data.rows;

      setMappedData(mappedRows);

      if (onMappingComplete) {
        onMappingComplete(mappedRows);
      }

      alert("Column Mapping Saved Successfully!");
    } catch (error) {
      console.error("Mapping Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!columns || columns.length === 0) {
    return (
      <div className="section">
        <h2>Column Mapping</h2>
        <p>Please upload a CSV or JSON file first.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Column Mapping</h2>

      <p>
        Map your uploaded columns to the required
        destination fields.
      </p>

      {columns.map((column) => (
        <div
          key={column}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              minWidth: "150px",
              fontWeight: "bold",
            }}
          >
            {column}
          </span>

          <select
            value={mapping[column] || ""}
            onChange={(e) =>
              handleMappingChange(
                column,
                e.target.value
              )
            }
          >
            <option value="">
              Select Destination Field
            </option>

            <option value="orderId">
              Order ID
            </option>

            <option value="date">
              Date
            </option>

            <option value="productName">
              Product Name
            </option>

            <option value="category">
              Category
            </option>

            <option value="price">
              Price
            </option>

            <option value="quantity">
              Quantity
            </option>

            <option value="total">
              Total
            </option>

            <option value="city">
              City
            </option>

            <option value="paymentMode">
              Payment Mode
            </option>
          </select>
        </div>
      ))}

      <br />

      <button
        onClick={handleSaveMapping}
        disabled={loading || !datasetId}
      >
        {loading
          ? "Saving Mapping..."
          : "Save Mapping"}
      </button>

      {mappedData.length > 0 && (
        <div style={{ marginTop: "25px" }}>
          <h2>Mapped Data Preview</h2>

          <p>
            Total Mapped Rows: {mappedData.length}
          </p>

          <div
            style={{
              maxHeight: "400px",
              overflow: "auto",
              border: "1px solid #ccc",
            }}
          >
            <table
              border="1"
              cellPadding="8"
              cellSpacing="0"
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  {Object.keys(mappedData[0]).map(
                    (column) => (
                      <th key={column}>
                        {column}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {mappedData.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(mappedData[0]).map(
                      (column) => (
                        <td key={column}>
                          {row[column] ?? ""}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColumnMapping;