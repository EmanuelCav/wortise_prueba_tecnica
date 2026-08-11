interface ApiErrorResponse {
    error?: string;
    message?: string;
}

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
    );

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {

        let message = "Ocurrió un error inesperado";

        if (data && typeof data === "object") {

            const errorData = data as ApiErrorResponse;

            if (typeof errorData.error === "string") {
                message = errorData.error;
            } else if (
                typeof errorData.message === "string"
            ) {
                message = errorData.message;
            }
        }

        throw new Error(message);
    }

    return data as T;
}