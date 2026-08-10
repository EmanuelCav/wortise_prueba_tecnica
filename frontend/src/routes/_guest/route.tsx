import {
    Outlet,
    createFileRoute,
    redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_guest")({
    beforeLoad: ({ context }) => {
        if (context.session) {
            throw redirect({
                to: "/articles",
            });
        }
    },

    component: GuestLayout,
});

function GuestLayout() {
    return <Outlet />;
}