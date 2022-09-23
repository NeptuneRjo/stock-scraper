import { Request, Response } from 'express'
import { scrapeAllCoins } from '../scraper/scrapeAllCoins'
import { scrapeSingleCoin } from '../scraper/scrapeSingleCoin'

export const get_all_coins = async (req: Request, res: Response) => {
	scrapeAllCoins(100)
		.then((coins) => {
			res.status(200).json({ data: coins })
		})
		.catch((err) => {
			res.status(400).json({ error: err })
		})
}

export const get_top_fifty_coins = async (req: Request, res: Response) => {
	scrapeAllCoins(50)
		.then((coins) => {
			res.status(200).json({ data: coins })
		})
		.catch((err) => {
			res.status(400).json({ err: err })
		})
}

export const get_single_coin = async (req: Request, res: Response) => {
	const { id } = req.params

	scrapeSingleCoin(id)
		.then((coin) => res.status(200).json({ data: coin }))
		.catch((err) => res.status(400).json({ error: err }))
}
