const express = require("express");
const router = express.Router();
const {
	comparePrice,
	getTopDeals,
	comparePriceAlt,
} = require("../controllers/compare");

router.route("/:item").get(comparePrice);
router.route("/items/top-deals").get(getTopDeals);
router.route("/alt/:item").get(comparePriceAlt);

module.exports = router;
