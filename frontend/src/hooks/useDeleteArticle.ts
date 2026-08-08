import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "../lib/api";

export function useDeleteArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api(`/articles/${id}`, {
                method: "DELETE",
            }),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["my-articles"],
            });

            queryClient.removeQueries({
                queryKey: ["article", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["authors"],
            });

            queryClient.invalidateQueries({
                queryKey: ["articles"],
            });
        },
    });
}