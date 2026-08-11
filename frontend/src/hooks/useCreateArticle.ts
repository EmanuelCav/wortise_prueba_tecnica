import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../lib/api";

import type { CreateArticleInput } from "../schemas/article.schema";

export function useCreateArticle() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateArticleInput) =>
            api("/articles", {
                method: "POST",
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    coverImageUrl: data.coverImageUrl,
                }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-articles"],
            });

            queryClient.invalidateQueries({
                queryKey: ["articles"],
            });

            queryClient.invalidateQueries({
                queryKey: ["authors"],
            });
        },
    });
}