const puppeteer = require("puppeteer");

const scrapeWeb = async () => {
	// Open browser
	const browser = await puppeteer.launch({ headless: false });
	// Opens new tab in browser
	const page = await browser.newPage();
	// Enter link in tab
	await page.goto(
		"https://www.idealo.co.uk/mscat.html?q=playstation+5+console"
	);
	/* Getting Multiple Elements */
	const elements = await page.evaluate(() => {
		const element = document.querySelectorAll(".offerList-itemWrapper");
		let array = [];
		element.forEach((item) => {
			// title
			const title = item.querySelector(".offerList-item-description-title");
			// price
			const price = item.querySelector(
				".offerList-item-priceWrapper"
			).innerText;
			const updatedPrice = price.replace("\n", " ");

			// img
			const img = item.querySelector(".offerList-item-image");
			array.push({
				title: title.innerText,
				price: updatedPrice,
				img: img.src,
			});
		});

		return { titles: array };
	});

	await browser.close();
	return elements;
};

const comparePrice = async (req, res) => {
	const { item } = req.params;
	try {
		const data = await scrapeWeb(item);
		console.log(data);
		res.status(200).json({ results: data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { comparePrice };
