import type { UseQueryResult } from "@tanstack/react-query";

import type { Author } from "../../hooks/useAuthors";
import AuthorCard from "../card/AuthorCard";

interface AuthorsMainProps {
    authorsQuery: UseQueryResult<Author[], Error>;
}

const AuthorsMain = ({ authorsQuery }: AuthorsMainProps) => {
    return (
        <section className="border-t border-divider">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">
                        Nuestros autores
                    </h2>

                    <p className="mt-2 text-default-500">
                        Conocé a las personas que comparten
                        sus ideas en Articles App.
                    </p>
                </div>

                {authorsQuery.isLoading && (
                    <p className="text-default-500">
                        Cargando autores...
                    </p>
                )}

                {authorsQuery.isError && (
                    <p className="text-danger">
                        {authorsQuery.error.message}
                    </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {authorsQuery.data?.map(
                        (author, index) => (
                            <AuthorCard author={author} key={index} />
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default AuthorsMain