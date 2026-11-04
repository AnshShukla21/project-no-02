const {
  validateDataset,
} = require("../services/validationService");

const validateData = async (req, res, next) => {
  try {
    const { datasetId } = req.body;

    if (!datasetId) {
      return res.status(400).json({
        success: false,
        message: "datasetId is required",
      });
    }

    const result = await validateDataset(datasetId);

    res.status(200).json({
      success: true,
      message: "Validation completed successfully",
      data: {
        datasetId: result.dataset._id,
        valid: result.valid,
        totalErrors: result.totalErrors,
        errors: result.errors,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { validateData };