import React from "react";

function DataSummary({ rows }) {
  if (rows.length === 0) {
    return (
      <div>
        <h2>Data Summary</h2>
        <p>Please upload a CSV file first.</p>
      </div>
    );
  }

  const totalOrders = rows.length;

  const totalQuantity = rows.reduce(
    (sum, row) => sum + Number(row.quantity || 0),
    0
  );

  const totalSales = rows.reduce(
    (sum, row) => sum + Number(row.total || 0),
    0
  );

  const averageOrderValue =
    totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <div>
      <h2>Data Summary</h2>

      <p>
        <strong>Total Orders:</strong> {totalOrders}
      </p>

      <p>
        <strong>Total Quantity:</strong> {totalQuantity}
      </p>

      <p>
        <strong>Total Sales:</strong> ₹{totalSales.toFixed(2)}
      </p>

      <p>
        <strong>Average Order Value:</strong> ₹
        {averageOrderValue.toFixed(2)}
      </p>
    </div>
  );
}

export default DataSummary;