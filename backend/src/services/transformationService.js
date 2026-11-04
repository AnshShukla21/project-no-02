const Dataset = require("../models/Dataset");

const transformDataset = async (
  datasetId,
  column,
  operation
) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new Error("Dataset not found");
  }

  dataset.rows = dataset.rows.map((row) => {
    const newRow = { ...row };

    if (newRow[column] !== undefined) {
      const value = String(newRow[column]);

      if (operation === "uppercase") {
        newRow[column] = value.toUpperCase();
      }

      if (operation === "lowercase") {
        newRow[column] = value.toLowerCase();
      }

      if (operation === "trim") {
        newRow[column] = value.trim();
      }
    }

    return newRow;
  });

  dataset.status = "transformed";

  await dataset.save();

  return dataset;
};

module.exports = { transformDataset };