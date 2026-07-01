import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { servicoSchema, editarServicoSchema } from "../schemas/servico";

export async function criarServico(req: Request, res: Response ) {
    try {
        const validacao = servicoSchema.safeParse(req.body)
        if(!validacao.success) return res.status(400).json({ erro: validacao.error.issues })
        const { nome, preco, duracao } = validacao.data
        const novoServico = await prisma.servico.create({
            data: {
                nome,
                preco,
                duracao
            }
        })
        return res.status(201).json(novoServico)
    } catch (erro) {
        return res.status(500).json({erro: 'Erro ao criar serviço'})
    }
}

export async function editarServico(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string }
        const validacao = editarServicoSchema.safeParse(req.body)
        if(!validacao.success) return res.status(400).json({ erro: validacao.error.issues })
        const { nome, preco, duracao } = validacao.data

        const servico = await prisma.servico.update({
            where: { id },
            data: { nome, preco, duracao }
        })
        return res.status(200).json(servico)
    } catch(erro) {
        return res.status(500).json({ erro: "Erro ao editar serviço" })
    }
}

export async function listarServicos(req: Request, res: Response) {
    try {
        const servicos = await prisma.servico.findMany()
        return res.status(200).json(servicos)
    } catch(erro) {
        return res.status(500).json({ erro: "Erro ao listar serviços" })
    }
}

export async function deletarServico(req: Request, res:Response) {
    try {
        const { id } = req.params as { id: string}
        await prisma.servico.delete({
            where: { id }
        })
        return res.status(204).json()
    } catch (erro) {
        return res.status(500).json({erro: 'Erro ao deletar servico'})
    }
}