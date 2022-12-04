const express = require("express");
const router = express.Router();
const { comparePrice } = require("../controllers/compare");

router.route("/:item").get(comparePrice);

module.exports = router;
