import puppeteer from 'puppeteer'
import fs from 'fs/promises'

export const scrapeArticle = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(url)

	const headline: string = await page.$eval('main h1', async (headline) => {
		return (headline as HTMLElement).innerText
	})

	const description: string = await page.$eval(
		'main h2',
		async (description) => {
			return (description as HTMLElement).innerText
		}
	)

	const author: string = await page.$eval(
		'a.css-1ohky7u-AuthorLink.e10pnb9y0',
		async (author) => {
			return (author as HTMLLinkElement).href
		}
	)

	const date: string = await page.$eval('main time', async (date) => {
		return (date as HTMLElement).innerText
	})

	const content: string[] = await page.$$eval('main p', async (content) => {
		return content.map((index) => (index as HTMLElement).innerText)
	})

	await fs.writeFile(
		'article.json',
		JSON.stringify({ headline, description, author, date, content })
	)

	await browser.close()
}

scrapeArticle(
	'https://www.wsj.com/articles/rising-interest-rates-squeeze-stocks-on-both-sides-constraining-earnings-multiples-11663637921'
)
