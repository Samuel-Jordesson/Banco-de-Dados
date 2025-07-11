import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiKeyRoutes from './routes/apiKeys'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/keys', apiKeyRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
