import express from 'express'
import apiRoutes from './routes/apiRoutes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', apiRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log('Listening on port', port)
})
