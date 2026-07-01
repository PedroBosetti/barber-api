import { z } from 'zod'

export const agendamentoSchema = z.object({
    barbeiroId: z.string(),
    servicoId: z.string(),
    data: z.string().datetime()
})

export const reagendarSchema = z.object({
    barbeiroId: z.string().optional(),
    servicoId: z.string().optional(),
    data: z.string().datetime().optional()
})