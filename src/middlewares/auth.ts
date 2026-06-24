import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction } from 'express'
import prisma from '../lib/prisma'

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

export function permitir(...tipos: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarioId = req.usuarioId
            const usuario = await prisma.usuario.findUnique({
            where: {id: usuarioId }
            })

            if(!usuario) return res.status(404).json({erro: 'usuario não encontrado'})
            if(!tipos.includes(usuario.tipo as string)) return res.status(403).json({erro: 'usuario não possui permissão necessária para acessar a rota'})
                next()
        } catch(erro) {
                    return res.status(500).json({
            erro
    
        })
        }
    }}
