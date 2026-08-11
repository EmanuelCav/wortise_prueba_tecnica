import {
    Outlet,
    createRootRouteWithContext,
} from "@tanstack/react-router";

import { Header } from "../components/header/Header";

export interface RouterContext {
    session: any;
    isSessionPending: boolean;
}

export const Route =
    createRootRouteWithContext<RouterContext>()({
        component: RootLayout,
    });

function RootLayout() {
    return (
        <div className="min-h-screen bg-blue-100">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}