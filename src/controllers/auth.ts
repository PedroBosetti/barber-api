import prisma from '../lib/prisma'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TiposUsuario } from '@prisma/client'

export async function registrar(req: Request, res: Response) {
    try {
        const {usuario, email, senha, tipo} = req.body
        const senhaHash = await bcrypt.hash(senha, 10)
    
        const novoUsuario = await prisma.usuario.create({
            data: {
                usuario,
                email,
                senha: senhaHash,
                tipo
            }
        })
        const {senha: _, ...usuarioSemSenha} = novoUsuario
        return res.status(201).json(usuarioSemSenha)
    } catch(erro) {
        return res.status(500).json({erro: 'Erro ao registrar usuário'})
    }
}

export async function logar (req: Request, res: Response) {
    try {
        const { email, senha } = req.body

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        })
        if(!usuario) return res.status(404).json({erro: 'Usuário não encontrado'})

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if(!senhaValida) return res.status(401).json({erro: 'Senha incorreta'})

        const token = jwt.sign({ id: usuario.id }, process.env.SEGREDO!, {expiresIn: '7d'})
        const {senha: _, ...usuarioSemSenha} = usuario
        return res.status(200).json({
            usuario: usuarioSemSenha,
            token
        })
    } catch (erro) {
        return res.status(500).json({erro: 'Erro ao fazer login'})
    }
}

export async function mostrarPerfil(req: Request, res: Response) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.usuarioId
            }
        })
        if(!usuario) return res.status(404).json({ erro: "Usuário não encontrado" })
        const {senha: _, ...usuarioSemSenha} = usuario
        return res.status(200).json(usuarioSemSenha)
        
    } catch(erro){

                return res.status(500).json({
            erro: "Erro ao buscar perfil"
        })

    }
}