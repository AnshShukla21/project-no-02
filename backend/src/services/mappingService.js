const Dataset = require("../models/Dataset");

const mapDataset = async (datasetId, mapping) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new Error("Dataset not found");
  }

  const mappedRows = dataset.rows.map((row) => {
    const newRow = {};

    Object.keys(mapping).forEach((sourceColumn) => {
      const destinationColumn = mapping[sourceColumn];

      if (destinationColumn) {
        newRow[destinationColumn] = row[sourceColumn];
      }
    });

    return newRow;
  });

  dataset.rows = mappedRows;
  dataset.columns = Object.values(mapping).filter(Boolean);
  dataset.status = "mapped";

  await dataset.save();

  return dataset;
};

module.exports = { mapDataset };