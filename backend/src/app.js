const express = require("express");
const cors = require("cors");
const mappingRoutes = require("./routes/mappingRoutes");
const transformationRoutes = require("./routes/transformationRoutes");
const healthRoutes = require("./routes/healthRoutes");
const fileRoutes = require("./routes/fileRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const validationRoutes = require("./routes/validationRoutes");
const exportRoutes = require("./routes/exportRoutes");
const app = express();

app.use(cors());
app.use(express.json());
 

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StreamWeaver Backend is running!",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/mapping", mappingRoutes);
app.use("/api/transformation", transformationRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/validation", validationRoutes);
app.use("/api/export", exportRoutes);
app.use(errorMiddleware);

module.exports = app;