import {
    Card,
    CardContent,
} from "@heroui/react";

import {
    createFileRoute,
    useNavigate,
} from "@tanstack/react-router";

import { ArticleForm } from "../../../../components/form/ArticleForm";

import { useArticle } from "../../../../hooks/useArticle";

import { useUpdateArticle } from "../../../../hooks/useUpdateArticle";

export const Route = createFileRoute(
    "/_authenticated/articles/$id/edit"
)({
    component: EditArticlePage,
});

function EditArticlePage() {
    const { id } = Route.useParams();

    const navigate = useNavigate();

    const articleQuery = useArticle(id);

    const updateMutation = useUpdateArticle();

    if (articleQuery.isLoading) {
        return (
            <div className="flex justify-center py-12">
                <p className="text-default-500">
                    Cargando artículo...
                </p>
            </div>
        );
    }

    if (articleQuery.isError) {
        return (
            <div className="py-12">
                <p className="text-danger">
                    {articleQuery.error.message}
                </p>
            </div>
        );
    }

    const article = articleQuery.data;

    if (!article) {
        return (
            <p className="text-default-500">
                Artículo no encontrado.
            </p>
        );
    }

    const handleSubmit = async (values: {
        title: string;
        content: string;
        coverImageUrl?: string;
    }) => {
        await updateMutation.mutateAsync({
            id,
            data: values,
        });

        await navigate({
            to: "/articles",
        });
    };

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Editar artículo
                </h1>

                <p className="mt-2 text-default-500">
                    Modificá el contenido de tu artículo.
                </p>
            </div>

            {updateMutation.isError && (
                <p className="mb-5 text-danger">
                    {updateMutation.error.message}
                </p>
            )}

            <Card>
                <CardContent className="p-6">
                    <ArticleForm
                        defaultValues={{
                            title: article.title,
                            content: article.content,
                            coverImageUrl:
                                article.coverImageUrl ?? "",
                        }}
                        submitLabel="Guardar cambios"
                        isPending={
                            updateMutation.isPending
                        }
                        onSubmit={handleSubmit}
                    />
                </CardContent>
            </Card>
        </div>
    );
}