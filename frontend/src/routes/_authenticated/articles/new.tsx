import { Card } from "@heroui/react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ArticleForm } from "../../../components/form/ArticleForm";

import { useCreateArticle } from "../../../hooks/useCreateArticle";

export const Route = createFileRoute("/_authenticated/articles/new")({
    component: NewArticlePage,
});

function NewArticlePage() {

    const navigate = useNavigate();

    const createMutation = useCreateArticle();

    const handleSubmit = async (values: {
        title: string;
        content: string;
        coverImageUrl?: string;
    }) => {
        await createMutation.mutateAsync(
            values
        );

        await navigate({
            to: "/articles",
        });
    };

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Crear artículo
                </h1>

                <p className="mt-2 text-default-500">
                    Compartí tus ideas con la comunidad.
                </p>
            </div>

            {createMutation.isError && (
                <p className="mb-5 text-danger">
                    {createMutation.error.message}
                </p>
            )}

            <Card>
                <Card.Content className="p-6">
                    <ArticleForm
                        submitLabel="Publicar artículo"
                        isPending={
                            createMutation.isPending
                        }
                        onSubmit={handleSubmit}
                    />
                </Card.Content>
            </Card>
        </div>
    );
}