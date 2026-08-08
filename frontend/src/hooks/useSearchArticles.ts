import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export interface Article {
    id: string;
    title: string;
    content: string;
    coverImageUrl: string | null;
    createdAt: string;
    authorName?: string;
}

interface ArticlesResponse {
    data: Article[];

    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export function useSearchArticles(query: string) {
    const q = query.trim();

    return useQuery({
        queryKey: ["articles", "public-search", q],

        queryFn: () => {
            const params = new URLSearchParams();

            if (q) {
                params.set("q", q);
            }

            params.set("page", "1");
            params.set("limit", "10");

            return api<ArticlesResponse>(
                `/articles/public/search?${params.toString()}`
            );
        },

        staleTime: 1000 * 30,
    });
}