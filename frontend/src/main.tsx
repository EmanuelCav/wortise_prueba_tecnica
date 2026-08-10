import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";
import { queryClient } from "./lib/query-client";
import { authClient } from "./lib/auth";

import "./globals.css";

const rootElement = document.getElementById("root")!;

function App() {

    const session = authClient.useSession();

    useEffect(() => {
        if (!session.isPending) {
            router.invalidate();
        }
    }, [session.data, session.isPending]);

    if (session.isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Cargando...
            </div>
        );
    }

    return (
        <RouterProvider
            router={router}
            context={{
                session: session.data,
                isSessionPending: session.isPending,
            }}
        />
    );
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);