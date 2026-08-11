import type { UseQueryResult } from "@tanstack/react-query";

import { ArticleCard } from "../card/ArticleCard"
import type { ArticlesResponse } from "../../hooks/useSearchArticles";

interface ArticlesMainProps {
    debouncedSearch: string;
    articlesQuery: UseQueryResult<ArticlesResponse, Error>;
}

const ArticlesMain = ({ debouncedSearch, articlesQuery }: ArticlesMainProps) => {
    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">
                        {debouncedSearch
                            ? "Resultados de búsqueda"
                            : "Artículos"}
                    </h2>

                    {debouncedSearch && (
                        <p className="mt-2 text-default-500">
                            Resultados para "{debouncedSearch}"
                        </p>
                    )}
                </div>

                {articlesQuery.isLoading && (
                    <p className="text-default-500">
                        Buscando artículos...
                    </p>
                )}

                {articlesQuery.isError && (
                    <p className="text-danger">
                        {articlesQuery.error.message}
                    </p>
                )}

                {articlesQuery.data?.data.length === 0 && (
                    <p className="text-default-500">
                        No encontramos artículos.
                    </p>
                )}

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {articlesQuery.data?.data.map(
                        (article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default ArticlesMain