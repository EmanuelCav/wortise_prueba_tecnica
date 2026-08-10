import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export interface ArticleDetail {
    id: string;
    title: string;
    content: string;
    coverImageUrl: string | null;
    authorName: string;
    authorId: string;
    authorEmail: string;
    createdAt: string;
    updatedAt: string;
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