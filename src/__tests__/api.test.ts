import 'jest'
import request from 'supertest'
import express from 'express'
import { scrapeAllCoins } from '../scraper/scrapeAllCoins'
import { scrapeSingleCoin } from '../scraper/scrapeSingleCoin'

const app = express()
const server = request(app)

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

describe('API tests', () => {
	it('GETs /all-coins', async () => {
		server.get('/all-coins').expect('Content-Type', /json/).expect(200)
	})

	it('GETs /half-coins', async () => {
		server.get('/half-coins').expect('Content-Type', /json/).expect(200)
	})

	it('GETs /:id', async () => {
		server.get('/bitcoin').expect('Content-Type', /json/).expect(200)
	})
})
