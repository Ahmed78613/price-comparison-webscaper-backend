const express = require("express");
const router = express.Router();
const {
	comparePrice,
	getTopDeals,
	comparePriceAlt,
	topDealsAlt,
	getScrapedData,
} = require("../controllers/compare");

router.route("/:item").get(comparePrice);
router.route("/items/top-deals").get(getTopDeals);
router.route("/alt/:item").get(comparePriceAlt);
router.route("/deals/items").get(topDealsAlt);
router.route("/deals/items/default").get(getScrapedData);

module.exports = router;
