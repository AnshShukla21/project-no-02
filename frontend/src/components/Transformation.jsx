import { useState } from "react";

function Transformation({
  rows,
  datasetId,
  onTransformationComplete,
}) {
  const [selectedColumn, setSelectedColumn] =
    useState("");

  const [transformation, setTransformation] =
    useState("uppercase");

  const [loading, setLoading] = useState(false);

  if (!rows || rows.length === 0) {
    return (
      <div className="section">
        <h2>Data Transformation</h2>
        <p>Please upload and map data first.</p>
      </div>
    );
  }

  const columns = Object.keys(rows[0]);

  const applyTransformation = async () => {
    if (!datasetId) {
      alert("Dataset not found. Please upload file first.");
      return;
    }

    if (!selectedColumn) {
      alert("Please select a column!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/transformation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId,
            column: selectedColumn,
            operation: transformation,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Transformation failed"
        );
      }

      console.log(
        "Transformation API Response:",
        result
      );

      const transformedRows = result.data.rows;

      onTransformationComplete(transformedRows);

      alert(
        "Transformation Applied Successfully!"
      );
    } catch (error) {
      console.error(
        "Transformation Error:",
        error
      );

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Data Transformation</h2>

      <div>
        <label>
          Select Column:
        </label>

        <select
          value={selectedColumn}
          onChange={(e) =>
            setSelectedColumn(e.target.value)
          }
        >
          <option value="">
            Select Column
          </option>

          {columns.map((column) => (
            <option
              key={column}
              value={column}
            >
              {column}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>
          Transformation:
        </label>

        <select
          value={transformation}
          onChange={(e) =>
            setTransformation(e.target.value)
          }
        >
          <option value="uppercase">
            Uppercase
          </option>

          <option value="lowercase">
            Lowercase
          </option>

          <option value="trim">
            Trim
          </option>
        </select>
      </div>

      <br />

      <button
        onClick={applyTransformation}
        disabled={loading}
      >
        {loading
          ? "Applying..."
          : "Apply Transformation"}
      </button>
    </div>
  );
}

export default Transformation;