const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "StreamWeaver backend is healthy",
  });
};

module.exports = {
  getHealth,
};