const puppeteer = require("puppeteer");

const fetchData = async () => {
	// Open browser
	const browser = await puppeteer.launch();
	// Opens new tab in browser
	const page = await browser.newPage();
	// Enter link in tab
	await page.goto("https://quotes.toscrape.com/");

	/* Getting Multiple Elements */
	const grabQuotes = await page.evaluate(() => {
		const quotes = document.querySelectorAll(".quote");
		let quotesArray = [];
		quotes.forEach((quoteTag) => {
			// Getting all spans inside of quote (quotes & author)
			const quoteInfo = quoteTag.querySelectorAll("span");
			const actualQuote = quoteInfo[0];
			const actualAuthor = quoteInfo[1];
			// Author is more nested (In <small> Tag)
			const authorName = actualAuthor.querySelector("small");

			quotesArray.push({
				quote: actualQuote.innerText,
				author: authorName.innerText,
			});
		});
		return quotesArray;
	});

	return grabQuotes;
};

const comparePrice = async (req, res) => {
	try {
		const data = await fetchData();
		console.log(data);
		res.status(200).json({ results: data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { comparePrice };
