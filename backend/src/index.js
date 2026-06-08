import express from 'express'
import 'dotenv/config'
import urlRoutes from './routes/urlRoutes.js'
import connectDB from './db/dbConfig.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/url', urlRoutes)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})