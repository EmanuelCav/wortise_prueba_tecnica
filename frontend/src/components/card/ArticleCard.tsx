import type { Article } from "../../hooks/useSearchArticles";

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({
    article,
}: ArticleCardProps) {
    return (
        <article className="rounded-xl border border-divider p-5">
            <h3 className="mb-2 text-xl font-semibold">
                {article.title}
            </h3>

            <p className="mb-4 line-clamp-3 text-sm text-default-500">
                {article.content}
            </p>

            <div className="flex items-center justify-between text-sm text-default-400">
                <span>
                    Por {article.authorName || "Autor desconocido"}
                </span>

                <span>
                    {new Date(
                        article.createdAt
                    ).toLocaleDateString()}
                </span>
            </div>
        </article>
    );
}