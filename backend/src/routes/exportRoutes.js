const express = require("express");
const path = require("path");

const router = express.Router();

const {
  exportData,
} = require("../controllers/exportController");

router.post("/", exportData);

router.get("/download/:fileName", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../uploads",
    req.params.fileName
  );

  res.download(filePath, (error) => {
    if (error) {
      res.status(404).json({
        success: false,
        message: "Export file not found",
      });
    }
  });
});

module.exports = router;