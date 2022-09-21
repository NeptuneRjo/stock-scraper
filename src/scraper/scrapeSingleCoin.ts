import puppeteer from 'puppeteer'
import fs from 'fs/promises'

type Coin = {
	image: string
	coin: {
		name: string
		symbol: string
	}
	price: {
		currentPrice: string
		priceChange: string
	}
	stats: {
		cap: string
		dilutedCap: string
		volume: string
	}
	supply: {
		circulating: string
		max: string
		total: string
	}
	rank: string
}

export const scrapeSingleCoin = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(url)

	const image = await page.$eval(
		'div.sc-16r8icm-0.gpRPnR.nameHeader img',
		async (image) => {
			return (image as HTMLImageElement).src
		}
	)

	const rank = await page.$eval(
		'div.namePill.namePillPrimary',
		async (rank) => {
			return (rank as HTMLElement).innerText
		}
	)

	// this selector returns a name and symbol, so this splits at \n and
	// returns both in an array
	const name = await page.$eval('h2.sc-1q9q90x-0.jCInrl.h1', async (name) => {
		const fullName = (name as HTMLElement).innerText
		const splitName = fullName.split('\n')

		return splitName
	})

	const coinSymbol = await page.$eval(
		'h2.sc-1q9q90x-0.jCInrl.h1 small.nameSymbol',
		async (symbol) => {
			return (symbol as HTMLElement).innerText
		}
	)

	const currentPrice = await page.$eval(
		'div.priceValue span',
		async (price) => {
			return (price as HTMLElement).innerText
		}
	)

	const priceChange = await page.$eval(
		'span.sc-15yy2pl-0.feeyND',
		async (price) => {
			return (price as HTMLElement).innerText
		}
	)

	// the stats use the same selector so they are mapped as an array
	// market cap -> diluted cap -> volume
	const stats = await page.$$eval(
		'div.statsItemRight div.statsValue',
		async (marketCap) => {
			return marketCap.map((index) => (index as HTMLElement).innerText)
		}
	)

	const circulatingSupply = await page.$eval(
		'div.sc-16r8icm-0.inUVOz div.statsValue',
		async (supply) => {
			return (supply as HTMLElement).innerText
		}
	)

	const maxSupply = await page.$eval('div.maxSupplyValue', async (supply) => {
		return (supply as HTMLElement).innerText
	})

	const totalSupply = await page.$eval('div.maxSupplyValue', async (supply) => {
		return (supply as HTMLElement).innerText
	})

	const coin = {
		image,
		coin: {
			name: name[0],
			symbol: name[1],
		},
		price: {
			currentPrice,
			priceChange,
		},
		stats: {
			cap: stats[0],
			dilutedCap: stats[1],
			volume: stats[2],
		},
		supply: {
			circulating: circulatingSupply,
			max: maxSupply,
			total: totalSupply,
		},
		rank,
	}
	await fs.writeFile('coin.json', JSON.stringify(coin))

	await browser.close()
}

scrapeSingleCoin('https://coinmarketcap.com/currencies/bitcoin/')
