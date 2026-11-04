const Dataset = require("../models/Dataset");

const validateDataset = async (datasetId) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new Error("Dataset not found");
  }

  const errors = [];

  dataset.rows.forEach((row, index) => {
    if (!row.orderId || String(row.orderId).trim() === "") {
      errors.push({
        row: index + 1,
        error: "Order ID is required",
      });
    }

    if (
      row.price === "" ||
      isNaN(Number(row.price))
    ) {
      errors.push({
        row: index + 1,
        error: "Price must be a number",
      });
    }

    if (
      row.quantity === "" ||
      isNaN(Number(row.quantity))
    ) {
      errors.push({
        row: index + 1,
        error: "Quantity must be a number",
      });
    }
  });

  dataset.status = "validated";
  await dataset.save();

  return {
    dataset,
    valid: errors.length === 0,
    errors,
    totalErrors: errors.length,
  };
};

module.exports = { validateDataset };