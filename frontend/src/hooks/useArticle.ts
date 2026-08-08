import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export interface ArticleDetail {
    id: string;
    title: string;
    content: string;
    coverImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    authorName: string;
    authorEmail: string;
}

export function useArticle(id: string) {
    return useQuery({
        queryKey: ["article", id],

        queryFn: () =>
            api<ArticleDetail>(
                `/articles/${id}`
            ),

        enabled: Boolean(id),

        staleTime: 30_000,
    });
}