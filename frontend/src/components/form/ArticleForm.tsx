import {
    Button,
    FieldError,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

import { useForm } from "@tanstack/react-form";

import {
    createArticleSchema,
    type CreateArticleInput,
} from "../../schemas/article.schema";

interface ArticleFormProps {
    defaultValues?: CreateArticleInput;

    submitLabel: string;

    isPending?: boolean;

    onSubmit: (
        values: CreateArticleInput
    ) => Promise<void>;
}

export function ArticleForm({
    defaultValues = {
        title: "",
        content: "",
        coverImageUrl: "",
    },

    submitLabel,

    isPending = false,

    onSubmit,
}: ArticleFormProps) {
    const form = useForm({
        defaultValues,

        validators: {
            onChange: createArticleSchema,
        },

        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();

                form.handleSubmit();
            }}
        >
            <form.Field name="title">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        !field.state.meta.isValid;

                    return (
                        <TextField
                            isInvalid={hasError}
                            value={field.state.value}
                            onChange={(value) =>
                                field.handleChange(value)
                            }
                        >
                            <Label>Título</Label>

                            <Input
                                placeholder="Mi primer artículo"
                                onBlur={field.handleBlur}
                            />

                            {hasError && (
                                <FieldError>
                                    {
                                        field.state.meta
                                            .errors[0]?.message
                                    }
                                </FieldError>
                            )}
                        </TextField>
                    );
                }}
            </form.Field>

            <form.Field name="content">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        !field.state.meta.isValid;

                    return (
                        <TextField
                            isInvalid={hasError}
                            value={field.state.value}
                            onChange={(value) =>
                                field.handleChange(value)
                            }
                        >
                            <Label>Contenido</Label>

                            <TextArea
                                placeholder="Escribí tu artículo..."
                                rows={10}
                                onBlur={field.handleBlur}
                            />

                            {hasError && (
                                <FieldError>
                                    {
                                        field.state.meta
                                            .errors[0]?.message
                                    }
                                </FieldError>
                            )}
                        </TextField>
                    );
                }}
            </form.Field>

            <form.Field name="coverImageUrl">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        !field.state.meta.isValid;

                    return (
                        <TextField
                            isInvalid={hasError}
                            value={field.state.value}
                            onChange={(value) =>
                                field.handleChange(value)
                            }
                        >
                            <Label>
                                Imagen de portada
                            </Label>

                            <Input
                                type="url"
                                placeholder="https://..."
                                onBlur={field.handleBlur}
                            />

                            {hasError && (
                                <FieldError>
                                    {
                                        field.state.meta
                                            .errors[0]?.message
                                    }
                                </FieldError>
                            )}
                        </TextField>
                    );
                }}
            </form.Field>

            <Button
                type="submit"
                variant="primary"
                isDisabled={isPending}
            >
                {isPending
                    ? "Guardando..."
                    : submitLabel}
            </Button>
        </form>
    );
}