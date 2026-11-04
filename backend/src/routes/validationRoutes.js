const express = require("express");

const router = express.Router();

const {
  validateData,
} = require("../controllers/validationController");

router.post("/", validateData);

module.exports = router;