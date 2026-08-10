import {
    createRouter,
} from "@tanstack/react-router";

import {
    routeTree,
} from "./routeTree.gen";

import type {
    RouterContext,
} from "./routes/__root";

export const router = createRouter({
    routeTree,
    context: {
        session: undefined,
        isSessionPending: true,
    } satisfies RouterContext,
});