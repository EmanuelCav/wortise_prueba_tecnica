import { Card } from "@heroui/react";
import { Link } from "@tanstack/react-router";

import type { Article } from "../../hooks/useSearchArticles";

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {

    const imageUrl = article.coverImageUrl || "/default-article.png";

    return (
        <Link to="/articles/$id" className="block h-full" params={{
            id: article.id,
        }}
        >
            <Card className="group h-full overflow-hidden border border-divider transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-52 w-full overflow-hidden">
                    <img src={imageUrl} alt={`Imagen de portada de ${article.title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <Card.Content className="flex flex-col p-5">
                    <div className="flex flex-1 flex-col">
                        <h2 className="line-clamp-2 text-xl font-bold tracking-tight">
                            {article.title}
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-default-500">
                            {article.content}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-divider pt-4">
                        <div className="min-w-0">
                            <p className="text-xs text-default-400">
                                Escrito por
                            </p>

                            <p className="truncate text-sm font-medium">
                                {article.authorName ||
                                    "Autor desconocido"}
                            </p>
                        </div>

                        <time dateTime={article.createdAt} className="shrink-0 text-xs text-default-400">
                            {new Date(article.createdAt).toLocaleDateString("es-AR",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </time>
                    </div>
                </Card.Content>
            </Card>
        </Link>
    );
}