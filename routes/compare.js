const express = require("express");
const router = express.Router();
const { comparePrice } = require("../controllers/compare");

router.route("/").get(comparePrice);

module.exports = router;
