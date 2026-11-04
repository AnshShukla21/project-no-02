function ErrorRows({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="section">
        <h2>Validation Errors</h2>
        <p>There are no validation errors.</p>
      </div>
    );
  }

  const errors = [];

  rows.forEach((row, index) => {
    const rowErrors = [];

    // Price validation
    if (row.price === "" || isNaN(Number(row.price))) {
      rowErrors.push("Price must be a number");
    }

    // Quantity validation
    if (row.quantity === "" || isNaN(Number(row.quantity))) {
      rowErrors.push("Quantity must be a number");
    }

    // Order ID validation
    if (!row.orderId || String(row.orderId).trim() === "") {
      rowErrors.push("Order ID is required");
    }

    if (rowErrors.length > 0) {
      errors.push({
        rowNumber: index + 1,
        data: row,
        errors: rowErrors,
      });
    }
  });

  if (errors.length === 0) {
    return (
      <div className="section">
        <h2>Validation Errors</h2>
        <p>✅ No validation errors found.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Validation Errors</h2>

      <p>
        ❌ Invalid Rows: <strong>{errors.length}</strong>
      </p>

      <div
        style={{
          overflowX: "auto",
          maxHeight: "400px",
          border: "1px solid #777",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Row</th>

              {Object.keys(rows[0]).map((column) => (
                <th key={column}>{column}</th>
              ))}

              <th>Errors</th>
            </tr>
          </thead>

          <tbody>
            {errors.map((item) => (
              <tr
                key={item.rowNumber}
                style={{
                  backgroundColor: "#3a1f1f",
                }}
              >
                <td>{item.rowNumber}</td>

                {Object.keys(rows[0]).map((column) => (
                  <td
                    key={column}
                    style={{
                      border: "1px solid #777",
                      padding: "8px",
                    }}
                  >
                    {item.data[column]}
                  </td>
                ))}

                <td
                  style={{
                    border: "1px solid #777",
                    padding: "8px",
                    color: "#ff7777",
                  }}
                >
                  {item.errors.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ErrorRows;