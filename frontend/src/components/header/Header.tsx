import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";

import { authClient } from "../../lib/auth";

export function Header() {
    const { data: session } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <header className="border-b border-divider">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 font-bold text-white">
                        A
                    </div>

                    <span className="text-xl font-bold">
                        Articles App
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    {session ? (
                        <>
                            <Link to="/articles">
                                <Button variant="ghost">
                                    Mis artículos
                                </Button>
                            </Link>

                            <Link to="/articles/new">
                                <Button variant="primary">
                                    Escribir
                                </Button>
                            </Link>

                            <Button
                                variant="primary"
                                onPress={handleLogout}
                            >
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">
                                    Iniciar sesión
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button variant="primary">
                                    Registrarse
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}