const path = require("path");

const File = require("../models/File");
const Dataset = require("../models/Dataset");

const { parseCSV } = require("./csvService");
const { parseJSON } = require("./jsonService");

const processUploadedFile = async (uploadedFile) => {
  const extension = path
    .extname(uploadedFile.originalname)
    .toLowerCase();

  let rows = [];
  let fileType;

  if (extension === ".csv") {
    fileType = "csv";
    rows = await parseCSV(uploadedFile.path);
  } else if (extension === ".json") {
    fileType = "json";
    rows = parseJSON(uploadedFile.path);
  } else {
    throw new Error("Unsupported file type.");
  }

  const columns =
    rows.length > 0
      ? Object.keys(rows[0])
      : [];

  const file = await File.create({
    originalName: uploadedFile.originalname,
    fileName: uploadedFile.filename,
    filePath: uploadedFile.path,
    fileType,
    fileSize: uploadedFile.size,
  });

  const dataset = await Dataset.create({
    fileId: file._id,
    columns,
    rows,
    rowCount: rows.length,
  });

  return {
    file,
    dataset,
  };
};

module.exports = {
  processUploadedFile,
};