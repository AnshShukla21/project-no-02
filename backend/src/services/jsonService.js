const fs = require("fs");

const parseJSON = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const data = JSON.parse(fileContent);

  if (!Array.isArray(data)) {
    throw new Error("JSON file must contain an array of objects.");
  }

  return data;
};

module.exports = {
  parseJSON,
};