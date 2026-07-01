import { z } from 'zod'

export const servicoSchema = z.object({
    nome: z.string().min(3),
    preco: z.number().positive(),
    duracao: z.number().int().positive()
})

export const editarServicoSchema = z.object({
    nome: z.string().min(3).optional(),
    preco: z.number().positive().optional(),
    duracao: z.number().int().positive().optional()
})