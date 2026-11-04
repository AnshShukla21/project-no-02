const express = require("express");

const router = express.Router();

const {
  transformData,
} = require("../controllers/transformationController");

router.post("/", transformData);

module.exports = router;