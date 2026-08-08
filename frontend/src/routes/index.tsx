import {
    Button,
    Input,
} from "@heroui/react";

import {
    createFileRoute,
    Link,
} from "@tanstack/react-router";

import {
    useEffect,
    useState,
} from "react";

import { ArticleCard } from "../components/card/ArticleCard";
import { useAuthors } from "../hooks/useAuthors";
import { useSearchArticles } from "../hooks/useSearchArticles";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    const authorsQuery = useAuthors();

    const articlesQuery =
        useSearchArticles(debouncedSearch);

    return (
        <div>
            <section className="border-b border-divider">
                <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
                    <span className="mb-4 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                        Comparte tus ideas
                    </span>

                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
                        Descubrí grandes artículos
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg text-default-500">
                        Explorá artículos escritos por nuestra
                        comunidad y encontrá contenido sobre los
                        temas que más te interesan.
                    </p>

                    <div className="mt-8 w-full max-w-2xl">
                        <Input
                            // size="lg"
                            type="search"
                            placeholder="Buscar por título, contenido o autor..."
                            value={search}
                            // onChange={setSearch}
                            aria-label="Buscar artículos"
                        />
                    </div>

                    <Link
                        to="/login"
                        className="mt-5"
                    >
                        <Button
                            size="lg"
                        >
                            Empezar a escribir
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">
                        {debouncedSearch
                            ? "Resultados de búsqueda"
                            : "Últimos artículos"}
                    </h2>

                    {debouncedSearch && (
                        <p className="mt-2 text-default-500">
                            Resultados para "{debouncedSearch}"
                        </p>
                    )}
                </div>

                {articlesQuery.isLoading && (
                    <p className="text-default-500">
                        Buscando artículos...
                    </p>
                )}

                {articlesQuery.isError && (
                    <p className="text-danger">
                        {articlesQuery.error.message}
                    </p>
                )}

                {articlesQuery.data?.data.length === 0 && (
                    <p className="text-default-500">
                        No encontramos artículos.
                    </p>
                )}

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {articlesQuery.data?.data.map(
                        (article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                            />
                        )
                    )}
                </div>
            </section>

            {/* AUTHORS */}
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
                            (author) => (
                                <div
                                    key={author.id}
                                    className="rounded-xl border border-divider p-5"
                                >
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                                            {author.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {author.name}
                                            </h3>

                                            <p className="text-sm text-default-500">
                                                {author.email}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-default-500">
                                        {author.articlesCount}{" "}
                                        {author.articlesCount === 1
                                            ? "artículo"
                                            : "artículos"}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}