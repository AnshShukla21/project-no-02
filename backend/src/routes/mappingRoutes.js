const express = require("express");

const router = express.Router();

const { mapData } = require("../controllers/mappingController");

router.post("/", mapData);

module.exports = router;