/// <reference path="./@types/express.d.ts" />
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import rotasUsuario from './routes/auth'
import rotasServico from './routes/servico'


const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", rotasUsuario)
app.use('/servico', rotasServico)

app.listen(3000, () => {
    console.log('Server rodando na porta 3000')
})

export default app