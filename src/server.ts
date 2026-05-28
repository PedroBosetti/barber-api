import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log('Server rodando na porta 3000')
})

export default app