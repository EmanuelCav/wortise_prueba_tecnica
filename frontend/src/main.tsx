import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { queryClient } from "./lib/query-client";
import { router } from "./router";

import "./globals.css";

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);