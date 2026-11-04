const {
  exportDataset,
} = require("../services/exportService");

const exportData = async (req, res, next) => {
  try {
    const {
      datasetId,
      format = "csv",
    } = req.body;

    if (!datasetId) {
      return res.status(400).json({
        success: false,
        message: "datasetId is required",
      });
    }

    const result = await exportDataset(
      datasetId,
      format
    );

    res.status(200).json({
      success: true,
      message: "Dataset exported successfully",
      data: {
        fileName: result.fileName,
        format: result.format,
        rowCount: result.rowCount,
        downloadUrl:
          `/api/export/download/${result.fileName}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  exportData,
};