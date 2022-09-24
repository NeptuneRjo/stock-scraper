import puppeteer from 'puppeteer'

type Coin = {
	image: string
	link: string
	coin: {
		name: string
		symbol: string
	}
	price: {
		currentPrice: string
		priceChange: string
	}
	stats: {
		cap: { price: string; change: string }
		dilutedCap: { price: string; change: string }
		volume: { price: string; change: string }
	}
	supply: {
		circulating: string
		maxSupply: string
		total: string
	}
	rank: string
	description: string
}

export const scrapeSingleCoin = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`https://coinmarketcap.com/currencies/${url}/`)

	const image = await page.$eval(
		'.gpRPnR > img:nth-child(1)',
		async (image) => {
			return (image as HTMLImageElement).src
		}
	)

	const link = await page.$eval(
		'div.sc-10up5z1-1:nth-child(1) > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)',
		async (link) => {
			return (link as HTMLLinkElement).href
		}
	)

	const rank = await page.$eval('.namePillPrimary', async (rank) => {
		return (rank as HTMLElement).innerText
	})

	const nameAndSymbol = await page.$eval(
		'h2.sc-1q9q90x-0:nth-child(2)',
		async (name) => {
			return (name as HTMLElement).innerText.split('\n')
		}
	)

	const currentPrice = await page.$eval(
		'.priceValue > span:nth-child(1)',
		async (price) => {
			return (price as HTMLElement).innerText
		}
	)

	const priceChange = await page.$eval(
		'span.sc-15yy2pl-0:nth-child(2)',
		async (price) => {
			return (price as HTMLElement).innerText
		}
	)

	const cap = await page.$eval(
		'div.statsBlock:nth-child(1) > div:nth-child(1) > div:nth-child(2)',
		async (cap) => {
			return (cap as HTMLElement).innerText.split('\n')
		}
	)

	const dilutedCap = await page.$eval(
		'div.statsBlock:nth-child(2) > div:nth-child(1) > div:nth-child(2)',
		async (cap) => {
			return (cap as HTMLElement).innerText.split('\n')
		}
	)

	const volume = await page.$eval(
		'div.statsBlock:nth-child(3) > div:nth-child(1) > div:nth-child(2)',
		async (volume) => {
			return (volume as HTMLElement).innerText.split('\n')
		}
	)

	const circulatingSupply = await page.$eval(
		'.inUVOz > div:nth-child(1)',
		async (supply) => {
			return (supply as HTMLElement).innerText
		}
	)

	const maxSupply = await page.$eval(
		'.dwCYJB > div:nth-child(2)',
		async (supply) => {
			return (supply as HTMLElement).innerText
		}
	)

	const totalSupply = await page.$eval(
		'.hWTiuI > div:nth-child(2)',
		async (supply) => {
			return (supply as HTMLElement).innerText
		}
	)

	const description = await page.$eval(
		'div.sc-2qtjgt-0.eApVPN div',
		async (description) => {
			return (description as HTMLElement).innerHTML
		}
	)

	const coin = {
		image,
		link,
		coin: {
			name: nameAndSymbol[0],
			symbol: nameAndSymbol[1],
		},
		price: {
			currentPrice,
			priceChange,
		},
		stats: {
			cap: { price: cap[0], change: cap[1] },
			dilutedCap: { price: dilutedCap[0], change: dilutedCap[1] },
			volume: { price: volume[0], change: volume[1] },
		},
		supply: {
			circulating: circulatingSupply,
			max: maxSupply,
			total: totalSupply,
		},
		rank,
		description,
	}

	await browser.close()
	return coin
}
