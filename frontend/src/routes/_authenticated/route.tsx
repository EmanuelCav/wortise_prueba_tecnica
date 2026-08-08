import {
    Outlet,
    createFileRoute,
    redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute(
    "/_authenticated"
)({
    beforeLoad: ({ context, location }) => {
        if (!context.session) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },

    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <Outlet />
        </div>
    );
}