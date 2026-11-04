import { useState } from "react";

function DataValidation({ rows, datasetId }) {
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateData = async () => {
    if (!datasetId) {
      alert("Dataset not found. Please upload file first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/validation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Validation failed"
        );
      }

      console.log(
        "Validation API Response:",
        result
      );

      setValidated(true);

      setErrors(result.data.errors || []);

      alert(
        result.data.valid
          ? "Data is valid!"
          : "Validation completed with errors."
      );
    } catch (error) {
      console.error(
        "Validation Error:",
        error
      );

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Data Validation</h2>

      <button
        onClick={validateData}
        disabled={loading || !rows?.length}
      >
        {loading
          ? "Validating..."
          : "Validate Data"}
      </button>

      {!validated ? (
        <p>
          Click "Validate Data" to check your data.
        </p>
      ) : errors.length === 0 ? (
        <p>✅ Data is valid!</p>
      ) : (
        <div>
          <h3>Validation Errors</h3>

          {errors.map((error, index) => (
            <p key={index}>
              Row {error.row}: {error.error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataValidation;