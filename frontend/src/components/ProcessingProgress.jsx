import { useEffect, useState } from "react";

function ProcessingProgress({ rows }) {
  const [progress, setProgress] = useState(0);
  const [processedRows, setProcessedRows] = useState(0);
  const [rowsPerSecond, setRowsPerSecond] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcessing = () => {
    if (!rows || rows.length === 0) {
      alert("No data available for processing!");
      return;
    }

    setProgress(0);
    setProcessedRows(0);
    setRowsPerSecond(0);
    setIsProcessing(true);
  };

  useEffect(() => {
    if (!isProcessing) return;

    const totalRows = rows.length;
    const startTime = Date.now();

    const interval = setInterval(() => {
      setProcessedRows((current) => {
        const nextValue = current + 1;

        const percentage = Math.round(
          (nextValue / totalRows) * 100
        );

        setProgress(percentage);

        const elapsedSeconds = (Date.now() - startTime) / 1000;

        if (elapsedSeconds > 0) {
          setRowsPerSecond(
            Math.round(nextValue / elapsedSeconds)
          );
        }

        if (nextValue >= totalRows) {
          clearInterval(interval);
          setIsProcessing(false);
        }

        return nextValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing, rows]);

  return (
    <div className="section">
      <h2>Processing Progress</h2>

      <button
        onClick={startProcessing}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Start Processing"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            width: "100%",
            height: "25px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              transition: "width 0.1s",
            }}
          />
        </div>

        <p>
          Progress: <strong>{progress}%</strong>
        </p>

        <p>
          Rows Processed:{" "}
          <strong>
            {processedRows} / {rows.length}
          </strong>
        </p>

        <p>
          Rows Processed/sec:{" "}
          <strong>{rowsPerSecond}</strong>
        </p>

        {!isProcessing && progress === 100 && (
          <p>✅ Processing completed successfully!</p>
        )}
      </div>
    </div>
  );
}

export default ProcessingProgress;