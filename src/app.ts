import express from 'express'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello world'))

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log('Listening on port', port)
})
