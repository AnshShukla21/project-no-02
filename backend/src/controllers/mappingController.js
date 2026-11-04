const { mapDataset } = require("../services/mappingService");

const mapData = async (req, res, next) => {
  try {
    const { datasetId, mapping } = req.body;

    if (!datasetId || !mapping) {
      return res.status(400).json({
        success: false,
        message: "datasetId and mapping are required",
      });
    }

    const dataset = await mapDataset(datasetId, mapping);

    res.status(200).json({
      success: true,
      message: "Column mapping completed successfully",
      data: {
        datasetId: dataset._id,
        columns: dataset.columns,
        rowCount: dataset.rowCount,
        rows: dataset.rows,
        status: dataset.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { mapData };