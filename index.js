const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const compare = require("./routes/compare");

// middleware
app.use(cors());
app.use(bodyParser.json());

// default req
app.get("/", (req, res) => {
	try {
		res
			.status(200)
			.json({ results: "Welcome To Our Web scraping Price Comparison API!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// routes
app.use("/compare", compare);

// Start App
const path = process.env.PORT || 3002;
app.listen(path, () => {
	console.log(`Server Started at ${path}`);
});

module.exports = app;
