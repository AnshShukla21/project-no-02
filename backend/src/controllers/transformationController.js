const {
  transformDataset,
} = require("../services/transformationService");

const transformData = async (req, res, next) => {
  try {
    const {
      datasetId,
      column,
      operation,
    } = req.body;

    if (!datasetId || !column || !operation) {
      return res.status(400).json({
        success: false,
        message: "datasetId, column and operation are required",
      });
    }

    const dataset = await transformDataset(
      datasetId,
      column,
      operation
    );

    res.status(200).json({
      success: true,
      message: "Transformation completed successfully",
      data: {
        datasetId: dataset._id,
        status: dataset.status,
        rows: dataset.rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { transformData };