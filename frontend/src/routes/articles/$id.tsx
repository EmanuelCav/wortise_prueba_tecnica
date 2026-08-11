import { Button, Card } from "@heroui/react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { DeleteArticleDialog } from "../../components/form/DeleteArticleDialog";

import { useArticle } from "../../hooks/useArticle";

import { authClient } from "../../lib/auth";

export const Route = createFileRoute("/articles/$id")({
    component: ArticleDetailPage,
});

function ArticleDetailPage() {

    const { id } = Route.useParams();

    const navigate = useNavigate();

    const articleQuery = useArticle(id);

    const { data: session } = authClient.useSession();

    const article = articleQuery.data;

    const isAuthor = Boolean(session?.user?.id && article?.authorId === session.user.id);

    if (articleQuery.isLoading) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-16">
                <p className="text-default-500">
                    Cargando artículo...
                </p>
            </div>
        );
    }

    if (articleQuery.isError) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-16">
                <Card>
                    <Card.Content className="items-center py-12 text-center">
                        <h1 className="text-2xl font-bold">
                            No se pudo cargar el artículo
                        </h1>

                        <p className="mt-2 text-danger">
                            {articleQuery.error.message}
                        </p>

                        <Button
                            className="mt-6"
                            variant="primary"
                            onPress={() =>
                                navigate({
                                    to: "/",
                                })
                            }
                        >
                            Volver al inicio
                        </Button>
                    </Card.Content>
                </Card>
            </div>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12 bg-white mt-2">
            <article>
                {article.coverImageUrl ? (
                    <img
                        src={article.coverImageUrl}
                        alt={article.title}
                        className="mb-8 h-72 w-full rounded-2xl object-cover md:h-96"
                    />
                ) : (
                    <img
                        src="/default-article.jpg"
                        alt=""
                        className="mb-8 h-72 w-full rounded-2xl object-cover md:h-96"
                    />
                )}

                <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                            {article.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-default-500">
                            <span>
                                Por{" "}
                                <strong className="text-foreground">
                                    {article.authorName}
                                </strong>
                            </span>

                            <span>•</span>

                            <span>
                                {new Date(
                                    article.createdAt
                                ).toLocaleDateString(
                                    "es-AR",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>
                    </div>

                    {isAuthor && (
                        <div className="flex shrink-0 gap-2">
                            <Button
                                variant="primary"
                                onPress={() =>
                                    navigate({
                                        to: "/articles/$id/edit",
                                        params: {
                                            id: article.id,
                                        },
                                    })
                                }
                            >
                                Editar
                            </Button>

                            <DeleteArticleDialog
                                articleId={article.id}
                                articleTitle={article.title}
                                onDeleted={() =>
                                    navigate({
                                        to: "/articles",
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
                <div className="whitespace-pre-wrap text-lg leading-8 text-foreground">
                    {article.content}
                </div>
            </article>
        </main>
    );
}