import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export interface MyArticle {
    id: string;
    title: string;
    content: string;
    coverImageUrl: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MyArticlesResponse {
    data: MyArticle[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export function useMyArticles(
    userId: string | undefined,
    page: number,
    limit = 10
) {
    return useQuery({
        queryKey: ["my-articles", userId, page, limit],

        queryFn: () =>
            api<MyArticlesResponse>(
                `/articles?page=${page}&limit=${limit}`
            ),

        enabled: Boolean(userId),

        placeholderData: (previousData) => previousData,

        staleTime: 30_000,
    });
}