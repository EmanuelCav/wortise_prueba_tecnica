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
    page: number,
    limit = 10
) {
    return useQuery({
        queryKey: ["my-articles", page, limit],

        queryFn: () =>
            api<MyArticlesResponse>(
                `/articles?page=${page}&limit=${limit}`
            ),

        placeholderData: (previousData) =>
            previousData,

        staleTime: 30_000,
    });
}