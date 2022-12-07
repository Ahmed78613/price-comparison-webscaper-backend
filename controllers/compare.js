const puppeteer = require("puppeteer");

const scrapeWeb = async (item) => {
	// Regex
	const updatedItem = item.split(" ").join("+");
	// Open browser
	const browser = await puppeteer.launch({ headless: true });

	// Opens new tab in browser
	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
	);
	// Enter link in tab
	await page.goto(`https://www.idealo.co.uk/mscat.html?q=${updatedItem}`);
	/* Getting Multiple Elements */
	const elements = await page.evaluate(() => {
		const allElements = document.querySelectorAll(".offerList-itemWrapper");
		let array = [];
		allElements.forEach((item, i) => {
			// link
			const link = item.href;
			// title
			const title = item.querySelector(".offerList-item-description-title");
			// price
			const price = item.querySelector(
				".offerList-item-priceWrapper"
			).innerText;
			const updatedPrice = price.replace("\n", " ");

			// img
			const img = item.querySelector(".offerList-item-image");

			if (
				img.src !== "https://cdn.idealo.com/storage/ipc/pics/common/spacer.png"
			) {
				array.push({
					title: title.innerText,
					price: updatedPrice,
					img: img.src,
					link,
					index: i,
				});
			}
		});

		return array;
	});
	return elements;
};

const topDeals = async () => {
	// Open browser
	const browser = await puppeteer.launch({ headless: true });
	// Opens new tab in browser
	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
	);
	// Enter link in tab
	await page.goto(`https://www.idealo.co.uk/mscat/100oE0oJ4.html`);
	/* Getting Multiple Elements */
	const elements = await page.evaluate(() => {
		const allElements = document.querySelectorAll(".offerList-itemWrapper");
		let array = [];
		allElements.forEach((item, i) => {
			// link
			const link = item.href;
			// title
			const title = item.querySelector(".offerList-item-description-title");
			// price
			const price = item.querySelector(
				".offerList-item-priceWrapper"
			).innerText;
			const updatedPrice = price.replace("\n", " ");
			// img
			const img = item.querySelector(".offerList-item-image");
			if (
				img.src !== "https://cdn.idealo.com/storage/ipc/pics/common/spacer.png"
			) {
				array.push({
					title: title.innerText,
					price: updatedPrice,
					img: img.src,
					link,
					index: i,
				});
			}
		});
		return array;
	});
	return elements;
};

const comparePrice = async (req, res) => {
	const { item } = req.params;
	try {
		const data = await scrapeWeb(item);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTopDeals = async (req, res) => {
	try {
		const data = await topDeals();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { comparePrice, getTopDeals };
