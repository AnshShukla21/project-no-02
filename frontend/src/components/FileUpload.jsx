import { useState } from "react";

function FileUpload({ onDataParsed, onDatasetCreated }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
  }

  async function handleUploadClick() {
    if (!selectedFile) {
      alert("Please Select a File...!!");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Upload failed"
        );
      }

      console.log("Backend Upload Response:", result);

      const dataset = result.data.dataset;

      // Send rows to frontend
      onDataParsed(dataset.rows);

      // Send dataset information to App
      if (onDatasetCreated) {
        onDatasetCreated(dataset);
      }

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Upload CSV File</h2>

      <input
        type="file"
        accept=".csv,.json"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <p>
          Selected file: {selectedFile.name}
        </p>
      )}

      <button
        onClick={handleUploadClick}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;