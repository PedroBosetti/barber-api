import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction } from 'express'

export function auth (req: Request, res: Response, next: NextFunction) {

    try {
        const  authHeader = req.headers.authorization

        if(!authHeader) return res.status(401).json({erro: 'Token não fornecido'})

        const token = authHeader!.split(' ')[1]
        
        const tokenVerificado = jwt.verify(token, process.env.SEGREDO!) as {id: string}
        
        req.usuarioId = tokenVerificado.id

        next()
    } catch(erro) {
        return res.status(401).json({
            erro: "Token inválido"
        })
    }
}
