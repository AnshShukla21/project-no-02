const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

const Dataset = require("../models/Dataset");

const exportDataset = async (datasetId, format = "csv") => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new Error("Dataset not found");
  }

  if (format !== "csv" && format !== "json") {
    throw new Error("Only CSV and JSON export are supported");
  }

  const exportDirectory = path.join(
    __dirname,
    "../../uploads"
  );

  if (!fs.existsSync(exportDirectory)) {
    fs.mkdirSync(exportDirectory, { recursive: true });
  }

  const fileName = `streamweaver_export_${Date.now()}.${format}`;
  const filePath = path.join(exportDirectory, fileName);

  let content;

  if (format === "json") {
    content = JSON.stringify(dataset.rows, null, 2);
  } else {
    const parser = new Parser({
      fields: dataset.columns,
    });

    content = parser.parse(dataset.rows);
  }

  fs.writeFileSync(filePath, content);

  dataset.status = "exported";
  await dataset.save();

  return {
    fileName,
    filePath,
    format,
    rowCount: dataset.rows.length,
  };
};

module.exports = {
  exportDataset,
};