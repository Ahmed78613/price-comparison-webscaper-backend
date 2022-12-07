const express = require("express");
const router = express.Router();
const { comparePrice, getTopDeals } = require("../controllers/compare");

router.route("/:item").get(comparePrice);
router.route("/items/top-deals").get(getTopDeals);

module.exports = router;
