import { useState } from "react";

function Export({ datasetId }) {
  const [format, setFormat] = useState("csv");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!datasetId) {
      alert("Please upload and process a dataset first!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/export",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId,
            format,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Export failed"
        );
      }

      console.log(
        "Export API Response:",
        result
      );

      const downloadUrl =
        "http://localhost:5000" +
        result.data.downloadUrl;

      window.open(downloadUrl, "_blank");

      alert("Export completed successfully!");
    } catch (error) {
      console.error(
        "Export Error:",
        error
      );

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Export Dataset</h2>

      <select
        value={format}
        onChange={(e) =>
          setFormat(e.target.value)
        }
      >
        <option value="csv">
          CSV
        </option>

        <option value="json">
          JSON
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={handleExport}
        disabled={loading || !datasetId}
      >
        {loading
          ? "Exporting..."
          : "Export Dataset"}
      </button>
    </div>
  );
}

export default Export;