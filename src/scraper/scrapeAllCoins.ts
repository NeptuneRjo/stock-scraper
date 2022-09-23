import puppeteer from 'puppeteer'
import fs from 'fs/promises'

type Coin = {
	image: string
	name: {
		name: string
		symbol: string
	}
	price: string
	priceHistory: {
		hour: string
		day: string
		week: string
	}
	marketCap: string
	dayVolume: {
		USD: string
		coin: string
	}
	rank: string
	circulation: string
	id: string
}

export const scrapeAllCoins = async (coinCount: number) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto('https://coinmarketcap.com/')
	await page.setViewport({
		height: 7750,
		width: 1440,
	})

	const coinsCollection: Coin[] = []

	const numberOfCoins = await page.$$eval('tbody tr', async (coins) => {
		return coins.length
	})

	const images = await page.$$eval('img.coin-logo', async (images) => {
		return images.map((index) => (index as HTMLImageElement).src)
	})

	const names = await page.$$eval(
		'a.cmc-link div.sc-16r8icm-0.sc-1teo54s-0.dBKWCw div.sc-16r8icm-0.sc-1teo54s-1.dNOTPP p.sc-1eb5slv-0.iworPT',
		async (names) => {
			return names.map((index) => (index as HTMLElement).innerText)
		}
	)

	const symbols = await page.$$eval(
		'div.sc-16r8icm-0.escjiH a.cmc-link div.sc-16r8icm-0.sc-1teo54s-0.dBKWCw div.sc-16r8icm-0.sc-1teo54s-1.dNOTPP div.sc-1teo54s-2.fZIJcI p.sc-1eb5slv-0.gGIpIK.coin-item-symbol',
		async (symbols) => {
			return symbols.map((index) => (index as HTMLElement).innerText)
		}
	)

	const prices = await page.$$eval(
		'div.sc-131di3y-0.cLgOOr a.cmc-link span',
		async (prices) => {
			return prices.map((index) => (index as HTMLElement).innerText)
		}
	)

	const priceChanges = await page.$$eval(
		'div.h7vnx2-1.bFzXgL table.h7vnx2-2.juYUEZ.cmc-table tbody tr td span.sc-15yy2pl-0',
		async (changes) => {
			const priceChanges = changes.map(
				(index) => (index as HTMLElement).innerText
			)

			let setsOfThree: string[] = []
			let priceChangeSets = []

			for (let i = 0; i <= priceChanges.length; i++) {
				if (setsOfThree.length === 3) {
					priceChangeSets.push(setsOfThree)
					setsOfThree = []
				}

				setsOfThree.push(priceChanges[i])
			}

			return priceChangeSets
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
		'div.sc-16r8icm-0.j3nwcd-0.cRcnjD div p.sc-1eb5slv-0.etpvrL',
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

	const ranks = await page.$$eval(
		'tbody tr td div.sc-16r8icm-0.escjiH a.cmc-link div.sc-16r8icm-0.sc-1teo54s-0.dBKWCw div.sc-16r8icm-0.sc-1teo54s-1.dNOTPP div.sc-1teo54s-2.fZIJcI div.sc-1teo54s-3.etWhyV',
		async (ranks) => {
			return ranks.map((index) => (index as HTMLElement).innerText)
		}
	)

	// splits the url at the identifier for each coin
	const ids = await page.$$eval(
		'div.sc-16r8icm-0.escjiH a.cmc-link',
		async (urls) => {
			const fullUrls = urls.map((index) => (index as HTMLLinkElement).href)
			let splitUrls = []

			for (let urls of fullUrls) {
				const split = urls.split('/')

				splitUrls.push(split[4])
			}

			return splitUrls
		}
	)

	for (let i = 0; i < coinCount; i++) {
		const coin = {
			image: images[i],
			name: {
				name: names[i],
				symbol: symbols[i],
			},
			price: prices[i],
			priceHistory: {
				hour: priceChanges[i][0],
				day: priceChanges[i][1],
				week: priceChanges[i][2],
			},
			marketCap: marketCaps[i],
			dayVolume: {
				USD: dayVolumeUSD[i],
				coin: dayVolumeCoin[i],
			},
			rank: ranks[i],
			circulation: circulations[i],
			id: ids[i],
		}

		coinsCollection.push(coin)
	}

	await browser.close()
	return coinsCollection
}

scrapeAllCoins(100)
