import { z } from "zod";

export const createArticleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(
            3,
            "El título debe tener al menos 3 caracteres"
        )
        .max(
            150,
            "El título no puede superar los 150 caracteres"
        ),

    content: z
        .string()
        .trim()
        .min(
            10,
            "El contenido debe tener al menos 10 caracteres"
        ),

    coverImageUrl: z
        .url("Ingresá una URL válida")
        .trim()
        .optional()
        .or(z.literal("")),
});

export const updateArticleSchema =
    createArticleSchema;

export type CreateArticleInput =
    z.infer<typeof createArticleSchema>;

export type UpdateArticleInput =
    z.infer<typeof updateArticleSchema>;