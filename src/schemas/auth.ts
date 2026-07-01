import { z } from 'zod'

export const registrarSchema = z.object({
    usuario: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
    tipo: z.enum(['CLIENTE', 'BARBEIRO', 'ADMIN']).optional()
})

export const logarSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
})