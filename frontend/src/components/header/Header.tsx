import { Link } from "@tanstack/react-router";

import { HeaderNavigation } from "./HeaderNavigation";

import { authClient } from "../../lib/auth";

export function Header() {

    const { data: session } = authClient.useSession();

    return (
        <header className="border-b border-divider bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/logo.png"
                        alt="Articles App"
                        className="h-9 w-9 rounded-lg object-contain"
                    />

                    <span className="text-lg font-bold sm:text-xl">
                        Articles App
                    </span>
                </Link>

                <HeaderNavigation session={session} />
            </div>
        </header>
    );
}