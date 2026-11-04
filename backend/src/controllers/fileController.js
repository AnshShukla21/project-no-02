const {
  processUploadedFile,
} = require("../services/fileService");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or JSON file.",
      });
    }

    const result = await processUploadedFile(req.file);

    res.status(201).json({
      success: true,
      message: "File uploaded and processed successfully.",
      data: {
        file: {
          id: result.file._id,
          originalName: result.file.originalName,
          fileType: result.file.fileType,
          fileSize: result.file.fileSize,
          status: result.file.status,
        },

        dataset: {
          id: result.dataset._id,
          columns: result.dataset.columns,
          rowCount: result.dataset.rowCount,
          rows: result.dataset.rows,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};