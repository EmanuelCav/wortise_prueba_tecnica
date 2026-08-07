import { z } from 'zod'

export const createArticleSchema = z.object({
    title: z
        .string({ error: 'El título es obligatorio' })
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(120, 'El título no puede superar los 120 caracteres')
        .trim(),
    content: z
        .string({ error: 'El contenido es obligatorio' })
        .min(10, 'El contenido debe tener al menos 10 caracteres')
        .trim(),
    coverImageUrl: z
        .url('Debe ser una URL válida')
        .trim()
        .or(z.literal(''))
        .optional(),
})

export const updateArticleSchema = createArticleSchema.partial()