import { z } from "zod";

export const createArticleSchema = z.object({
    title: z
        .string({
            error: "El título es obligatorio",
        })
        .trim()
        .min(
            3,
            "El título debe tener al menos 3 caracteres"
        )
        .max(
            120,
            "El título no puede superar los 120 caracteres"
        ),

    content: z
        .string({
            error: "El contenido es obligatorio",
        })
        .trim()
        .min(
            10,
            "El contenido debe tener al menos 10 caracteres"
        ),

    coverImageUrl: z.preprocess(
        (value) => {
            if (
                typeof value === "string" &&
                value.trim() === ""
            ) {
                return undefined;
            }

            return value;
        },
        z
            .url("Ingresá una URL válida")
            .trim()
            .optional()
    ),
});

export const updateArticleSchema =
    createArticleSchema.partial();