import { Request, Response } from 'express'
import { scrapeAllCoins } from '../scraper/scrapeAllCoins'
import coins from '../coins.json'
import fs from 'fs'

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
