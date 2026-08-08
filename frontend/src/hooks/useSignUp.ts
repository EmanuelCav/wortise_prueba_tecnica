import { useMutation } from "@tanstack/react-query";

import { authClient } from "../lib/auth";

interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}

export function useSignUp() {
    return useMutation({
        mutationFn: async ({
            name,
            email,
            password,
        }: SignUpPayload) => {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return result.data;
        },
    });
}