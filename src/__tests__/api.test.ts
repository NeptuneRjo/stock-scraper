import 'jest'
import request from 'supertest'
import express from 'express'

const app = express()
const server = request(app)

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
