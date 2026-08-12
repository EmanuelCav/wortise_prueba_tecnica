import { Button } from '@heroui/react'
import type { UseQueryResult } from '@tanstack/react-query';

import type { MyArticlesResponse } from '../../hooks/useMyArticles';

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    articlesQuery: UseQueryResult<MyArticlesResponse, Error>;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

const Pagination = ({ page, setPage, articlesQuery, pagination }: PaginationProps) => {
    return (
        <div className="mt-8 flex items-center justify-center gap-4">

            <Button
                variant="primary"
                isDisabled={
                    page === 1 ||
                    articlesQuery.isFetching
                }
                onPress={() =>
                    setPage((current) =>
                        Math.max(1, current - 1)
                    )
                }
            >
                Anterior
            </Button>

            <div className="min-w-32 text-center">
                <p className="text-sm font-medium">
                    Página {pagination.page} de{" "}
                    {pagination.totalPages}
                </p>

                <p className="mt-1 text-xs text-default-400">
                    {pagination.total} artículos
                </p>
            </div>

            <Button
                variant="primary"
                isDisabled={
                    page >=
                    pagination.totalPages ||
                    articlesQuery.isFetching
                }
                onPress={() =>
                    setPage((current) =>
                        Math.min(
                            pagination.totalPages,
                            current + 1
                        )
                    )
                }
            >
                Siguiente
            </Button>
        </div>
    )
}

export default Pagination