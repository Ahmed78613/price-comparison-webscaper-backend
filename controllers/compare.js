const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

const scrapeWeb = async (item) => {
	// Stealth
	puppeteer.use(hidden());
	// Regex
	const updatedItem = item.split(" ").join("+");
	// Open browser
	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		headless: false,
		ignoreHTTPSErrors: true,
		executablePath: executablePath(),
	});

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

const priceRunner = async (item) => {
	// Stealth
	puppeteer.use(hidden());
	// Regex
	const updatedItem = item.split(" ").join("+");
	// Open browser
	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		headless: true,
		ignoreHTTPSErrors: true,
		executablePath: executablePath(),
	});

	// Opens new tab in browser
	const page = await browser.newPage();
	// Enter link in tab
	await page.goto(
		`https://www.pricerunner.com/results?q=${updatedItem}&suggestionsActive=true&suggestionClicked=false&suggestionReverted=false`
	);

	await page.click(".KYuPdOZh2w.pr-c9kuyn");

	/* Getting Multiple Elements */
	const elements = await page.evaluate(() => {
		let array = [];
		let links = [];
		let images = [];
		let ratings = [];
		let descriptions = [];
		let watchers = [];

		const allElements = document.querySelectorAll(".k6oEmfY83J.pr-6r3upd");
		allElements.forEach((item, i) => {
			// Title
			const title = item.querySelector(".pr-7iigu3");
			// Price
			const price = item.querySelector(".pr-be5x0o");

			array.push({
				title: title.innerText,
				price: price.innerText,
			});
		});

		const allLinks = document.querySelectorAll(".k6oEmfY83J.pr-6r3upd a");
		allLinks.forEach((item, i) => {
			links.push({ link: item.href });
		});

		const allImgs = document.querySelectorAll(".xUAmIg3IAt.pr-1jnu7fb");
		allImgs.forEach((item, i) => {
			images.push({ img: item.src });
		});

		const allRatings = document.querySelectorAll(".pr-1ob9nd8");
		allRatings.forEach((item, i) => {
			ratings.push({ ratings: item.innerText });
		});

		const allDesc = document.querySelectorAll(".pr-13b83wt");
		allDesc.forEach((item, i) => {
			descriptions.push({ ratings: item.innerText });
		});

		const allWatchers = document.querySelectorAll(".pr-13vcnfy");
		allWatchers.forEach((item, i) => {
			watchers.push({ ratings: item.innerText });
		});

		const AllData = array.map((item, i) => {
			return {
				item,
				...links[i],
				...images[i],
				...ratings[i],
				...descriptions[i],
				...watchers[i],
			};
		});

		return AllData;
	});

	return elements;
};

const priceRunnerTendingDeals = async () => {
	// Stealth
	puppeteer.use(hidden());
	// Open browser
	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		headless: true,
		ignoreHTTPSErrors: true,
		executablePath: executablePath(),
	});

	// Opens new tab in browser
	const page = await browser.newPage();
	// Enter link in tab
	await page.goto(`https://www.pricerunner.com/bo/popular-products`);

	await page.click(".KYuPdOZh2w.pr-c9kuyn");

	/* Getting Multiple Elements */
	const elements = await page.evaluate(() => {
		let titles = [];
		let prices = [];
		let images = [];
		let links = [];
		let ratings = [];

		const allTitles = document.querySelectorAll(".pr-16uzt6l");
		allTitles.forEach((item, i) => {
			titles.push({ link: item.textContent });
		});
		const allPrices = document.querySelectorAll(".pr-be5x0o");
		allPrices.forEach((item, i) => {
			prices.push({ prices: item.textContent });
		});
		const allImages = document.querySelectorAll(".cHORm9q4_D.pr-19l9ibq img");
		allImages.forEach((item, i) => {
			images.push({ img: item.src });
		});
		const allLinks = document.querySelectorAll(".mIkxpLfxgo.pr-syqquf a");
		allLinks.forEach((item, i) => {
			links.push({ link: item.href });
		});
		const allRatings = document.querySelectorAll(".pr-1ob9nd8");
		allRatings.forEach((item, i) => {
			ratings.push({ rating: item.innerText });
		});

		const AllData = titles.map((item, i) => {
			return {
				item,
				...titles[i],
				...prices[i],
				...images[i],
				...links[i],
				...ratings[i],
			};
		});

		return AllData;
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

const comparePriceAlt = async (req, res) => {
	const { item } = req.params;
	try {
		const data = await priceRunner(item);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const topDealsAlt = async (req, res) => {
	try {
		const data = await priceRunnerTendingDeals();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = {
	comparePrice,
	getTopDeals,
	comparePriceAlt,
	priceRunnerTendingDeals,
	topDealsAlt,
};
