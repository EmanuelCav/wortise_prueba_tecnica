import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export interface Author {
    id: string;
    name: string;
    email: string;
    articlesCount: number;
}

export function useAuthors() {
    return useQuery({
        queryKey: ["authors"],

        queryFn: () => {
            return api<Author[]>("/authors");
        },

        staleTime: 1000 * 60 * 5,
    });
}