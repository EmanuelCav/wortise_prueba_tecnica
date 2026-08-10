import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "../lib/api";

import type { UpdateArticleInput } from "../schemas/article.schema";

interface UpdateArticleVariables {
    id: string;
    data: UpdateArticleInput;
}

export function useUpdateArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: UpdateArticleVariables) =>
            api(`/articles/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    coverImageUrl: data.coverImageUrl,
                }),
            }),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["my-articles"],
            });

            queryClient.invalidateQueries({
                queryKey: ["article", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["articles"],
            });
        },
    });
}