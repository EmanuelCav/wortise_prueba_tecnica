import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Presentation from "../components/main/Presentation";
import ArticlesMain from "../components/main/ArticlesMain";
import AuthorsMain from "../components/main/AuthorsMain";

import { useAuthors } from "../hooks/useAuthors";
import { useSearchArticles } from "../hooks/useSearchArticles";

import { authClient } from "../lib/auth";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {

    const { data: session } = authClient.useSession();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    const articlesQuery = useSearchArticles(debouncedSearch);
    const authorsQuery = useAuthors();

    return (
        <div>
            <Presentation
                search={search}
                setSearch={setSearch}
                session={session}
            />
            <ArticlesMain
                articlesQuery={articlesQuery}
                debouncedSearch={debouncedSearch}
            />
            <AuthorsMain
                authorsQuery={authorsQuery}
            />
        </div>
    );
}