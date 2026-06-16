import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import reviewsRoutes from './routes/reviewsRoutes'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok'
    })
})

app.use('/api/reviews', reviewsRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})