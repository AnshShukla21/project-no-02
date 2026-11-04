const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    datasetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "upload",
        "mapping",
        "transformation",
        "validation",
        "export",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    totalRows: {
      type: Number,
      default: 0,
    },

    processedRows: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);