const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },

    columns: {
      type: [String],
      default: [],
    },

    rows: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    rowCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "mapped",
        "transformed",
        "validated",
        "exported",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dataset", datasetSchema);