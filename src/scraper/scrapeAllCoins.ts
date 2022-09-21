import puppeteer from 'puppeteer'
import fs from 'fs/promises'

type Coin = {
	image: string
	name: {
		name: string
		symbol: string
	}
	price: string
	priceChange: {
		oneHour: string
		oneDay: string
		sevenDays: string
	}
	marketCap: string
	dayVolume: {
		USD: string
		coin: string
	}
	circulation: string
	rank: string
}

const scraper = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto('https://coinmarketcap.com/')

	const coinsCollection: Coin[] = []

	const numberOfCoins = await page.$$eval('tbody tr', async (coins) => {
		return coins.length
	})

	const images = await page.$$eval('img.coin-logo', async (images) => {
		return images.map((index) => (index as HTMLImageElement).src)
	})

	const names = await page.$$eval('p.sc-1eb5slv-0.iworPT', async (names) => {
		return names.map((index) => (index as HTMLElement).innerText)
	})

	const symbols = await page.$$eval(
		'p.sc-1eb5slv-0.gGIpIK.coin-item-symbol',
		async (symbols) => {
			return symbols.map((index) => (index as HTMLElement).innerText)
		}
	)

	const prices = await page.$$eval('a.cmc-link span', async (prices) => {
		return prices.map((index) => (index as HTMLElement).innerText)
	})

	const priceChange_1hr = await page.$$eval(
		'span.sc-15yy2pl-0.hzgCfk',
		async (prices) => {
			return prices.map((index) => (index as HTMLElement).innerText)
		}
	)

	const priceChange_24hr = await page.$$eval(
		'span.sc-15yy2pl-0.hzgCfk',
		async (prrices) => {
			return prrices.map((index) => (index as HTMLElement).innerText)
		}
	)

	const priceChange_7d = await page.$$eval(
		'span.sc-15yy2pl-0.hzgCfk',
		async (prices) => {
			return prices.map((index) => (index as HTMLElement).innerText)
		}
	)

	const marketCaps = await page.$$eval(
		'span.sc-1ow4cwt-1.ieFnWP',
		async (caps) => {
			return caps.map((index) => (index as HTMLElement).innerText)
		}
	)

	const dayVolumeUSD = await page.$$eval(
		'p.sc-1eb5slv-0.hykWbK.font_weight_500',
		async (volumes) => {
			return volumes.map((index) => (index as HTMLElement).innerText)
		}
	)

	const dayVolumeCoin = await page.$$eval(
		'p.sc-1eb5slv-0.etpvrL',
		async (volumes) => {
			return volumes.map((index) => (index as HTMLElement).innerText)
		}
	)

	const circulations = await page.$$eval(
		'p.sc-1eb5slv-0.kZlTnE',
		async (circulations) => {
			return circulations.map((index) => (index as HTMLElement).innerText)
		}
	)

	const ranks = await page.$$eval('p.sc-1eb5slv-0.etpvrL', async (ranks) => {
		return ranks.map((index) => (index as HTMLElement).innerText)
	})

	for (let i = 0; i < numberOfCoins; i++) {
		const coin = {
			image: images[i],
			name: {
				name: names[i],
				symbol: symbols[i],
			},
			price: prices[i],
			priceChange: {
				oneHour: priceChange_1hr[i],
				oneDay: priceChange_24hr[i],
				sevenDays: priceChange_7d[i],
			},
			marketCap: marketCaps[i],
			dayVolume: {
				USD: dayVolumeUSD[i],
				coin: dayVolumeCoin[i],
			},
			circulation: circulations[i],
			rank: ranks[i],
		}

		coinsCollection.push(coin)
	}

	await fs.writeFile('coins.json', JSON.stringify(coinsCollection))

	await browser.close()
}

scraper()
