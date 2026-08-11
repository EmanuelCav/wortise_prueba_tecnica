import { Button } from "@heroui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { authClient } from "../../lib/auth";

interface HeaderNavigationProps {
    session: unknown;
}

export function HeaderNavigation({
    session,
}: HeaderNavigationProps) {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        setIsOpen(false);

        await authClient.signOut();

        await navigate({
            to: "/login",
        });
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <nav className="hidden items-center gap-2 md:flex">
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
                            variant="danger"
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
            </nav>

            <div className="md:hidden">
                <Button
                    isIconOnly
                    variant="tertiary"
                    aria-label="Abrir menú"
                    onPress={() =>
                        setIsOpen((current) => !current)
                    }
                >
                    <span className="text-2xl">
                        {isOpen ? "✕" : "☰"}
                    </span>
                </Button>
            </div>

            {isOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-divider bg-white p-3 shadow-xl">
                    <nav className="flex flex-col gap-2">
                        {session ? (
                            <>
                                <Link
                                    to="/articles"
                                    onClick={closeMenu}
                                >
                                    <Button
                                        variant="tertiary"
                                        className="w-full justify-start"
                                    >
                                        Mis artículos
                                    </Button>
                                </Link>

                                <Link
                                    to="/articles/new"
                                    onClick={closeMenu}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Escribir
                                    </Button>
                                </Link>

                                <Button
                                    variant="danger"
                                    className="w-full"
                                    onPress={handleLogout}
                                >
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    <Button
                                        variant="tertiary"
                                        className="w-full justify-start"
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={closeMenu}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Registrarse
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
}