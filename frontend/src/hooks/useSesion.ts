import { useQuery } from "@tanstack/react-query";

import { authClient } from "../lib/auth";

export function useSession() {
    return useQuery({
        queryKey: ["auth", "session"],

        queryFn: async () => {
            const result = await authClient.getSession();

            if (result.error) {
                throw new Error(result.error.message);
            }

            return result.data;
        },
    });
}