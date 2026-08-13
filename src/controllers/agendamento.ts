import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { agendamentoSchema, reagendarSchema } from '../schemas/agendamento';

export async function criarAgendamento(req: Request, res: Response) {
    try {
        const validacao = agendamentoSchema.safeParse(req.body)
        if(!validacao.success) return res.status(400).json({ erro: validacao.error.issues })
        const { barbeiroId, servicoId, data } = validacao.data
    
    const conflito = await prisma.agendamento.findFirst({
    where: { barbeiroId, data }
    })
    if(conflito) return res.status(409).json({ erro: 'Barbeiro já tem agendamento nesse horário' })

        const novoAgendamento = await prisma.agendamento.create({
            data: {
                usuarioId: req.usuarioId!,
                barbeiroId,
                servicoId,
                data,
                status: 'PENDENTE'
            }
        })
            
        return res.status(201).json(novoAgendamento)
        } catch(erro) {
            return res.status(500).json({ erro: 'Não foi possível criar agendamento' })
        }
    }

export async function listarAgendamentosEnviados(req: Request, res: Response) {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            where: { usuarioId: req.usuarioId }
        })
        if(agendamentos.length === 0) return res.status(404).json({ erro: 'Não há agendamentos para este usuário' })
        return res.status(200).json(agendamentos)
    } catch(erro) {
        return res.status(500).json({ erro: 'Não foi possível encontrar agendamentos' })
    }
}

export async function listarAgendamentosRecebidos(req: Request, res: Response) {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            where: { barbeiroId: req.usuarioId }
        })
        if(agendamentos.length === 0) return res.status(404).json({ erro: 'Não há agendamentos para este Barbeiro' })
        return res.status(200).json(agendamentos)
    } catch(erro) {
        return res.status(500).json({ erro: 'Não foi possível encontrar agendamentos' })
    }
}

export async function reagendar(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string }
        const validacao = reagendarSchema.safeParse(req.body)
        if(!validacao.success) return res.status(400).json({ erro: validacao.error.issues })
        const { barbeiroId, servicoId, data } = validacao.data

        const agendamento = await prisma.agendamento.update({
            where: { id },
            data: { barbeiroId, servicoId, data }
        })
        return res.status(200).json(agendamento)
    } catch(erro) {
        return res.status(500).json({ erro: 'Não foi possível editar este agendamento' })
    }
}

export async function desmarcar(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string }
        await prisma.agendamento.delete({
            where: { id }
        })
        return res.status(204).send()
    } catch(erro) {
        return res.status(500).json({ erro: 'Não foi possível desmarcar o agendamento' })
    }
}
