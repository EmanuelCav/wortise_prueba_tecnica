import {
  Button,
  Card,
} from "@heroui/react";

import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { useState } from "react";

import { useMyArticles } from "../../../hooks/useMyArticles";
import { DeleteArticleDialog } from "../../../components/form/DeleteArticleDialog";

export const Route = createFileRoute(
  "/_authenticated/articles/"
)({
  component: MyArticlesPage,
});

const DEFAULT_ARTICLE_IMAGE = "/default-article.png";

function MyArticlesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const articlesQuery = useMyArticles(page);

  const articles = articlesQuery.data?.data ?? [];
  const pagination = articlesQuery.data?.pagination;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mis artículos
          </h1>

          <p className="mt-2 text-default-500">
            Administrá los artículos que publicaste.
          </p>
        </div>

        <Link to="/articles/new">
          <Button
            variant="primary"
            className="w-full sm:w-auto"
          >
            Nuevo artículo
          </Button>
        </Link>
      </div>

      {articlesQuery.isLoading && (
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-default-500">
            Cargando artículos...
          </p>
        </div>
      )}

      {articlesQuery.isError && (
        <Card className="border border-danger/20">
          <Card.Content className="p-6">
            <div className="text-center">
              <h2 className="font-semibold text-danger">
                No se pudieron cargar los artículos
              </h2>

              <p className="mt-2 text-sm text-default-500">
                {articlesQuery.error.message}
              </p>

              <Button
                className="mt-5"
                variant="primary"
                onPress={() =>
                  articlesQuery.refetch()
                }
              >
                Intentar nuevamente
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}

      {!articlesQuery.isLoading &&
        !articlesQuery.isError &&
        articles.length === 0 && (
          <Card>
            <Card.Content className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">
                  ✍️
                </span>
              </div>

              <h2 className="text-xl font-semibold">
                Todavía no tenés artículos
              </h2>

              <p className="mt-2 max-w-md text-default-500">
                Empezá escribiendo tu primer
                artículo y compartí tus ideas
                con la comunidad.
              </p>

              <Link
                to="/articles/new"
                className="mt-6"
              >
                <Button variant="primary">
                  Crear mi primer artículo
                </Button>
              </Link>
            </Card.Content>
          </Card>
        )}

      {!articlesQuery.isLoading &&
        !articlesQuery.isError &&
        articles.length > 0 && (
          <div className="space-y-4">

            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <Card.Content className="p-0">
                  <div className="flex flex-col sm:flex-row">

                    <Link
                      to="/articles/$id"
                      params={{ id: article.id }}
                      className="shrink-0 sm:w-56"
                    >
                      <img
                        src={
                          article.coverImageUrl ||
                          DEFAULT_ARTICLE_IMAGE
                        }
                        alt={`Imagen de portada de ${article.title}`}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-full sm:min-h-52"
                        onError={(event) => {
                          event.currentTarget.src =
                            DEFAULT_ARTICLE_IMAGE;
                        }}
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">

                      <Link
                        to="/articles/$id"
                        params={{ id: article.id }}
                        className="min-w-0 flex-1"
                      >
                        <h2 className="line-clamp-2 text-xl font-semibold transition-colors hover:text-primary">
                          {article.title}
                        </h2>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-default-500">
                          {article.content}
                        </p>
                      </Link>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <p className="text-xs text-default-400">
                          Creado el{" "}
                          {new Date(
                            article.createdAt
                          ).toLocaleDateString("es-AR")}
                        </p>

                        <div className="flex shrink-0 gap-2">

                          <Button
                            variant="primary"
                            size="sm"
                            onPress={() =>
                              navigate({
                                to: "/articles/$id/edit",
                                params: {
                                  id: article.id,
                                },
                              })
                            }
                          >
                            Editar
                          </Button>

                          <DeleteArticleDialog
                            articleId={article.id}
                            articleTitle={article.title}
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        )}

      {pagination &&
        pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">

            <Button
              variant="secondary"
              isDisabled={
                page === 1 ||
                articlesQuery.isFetching
              }
              onPress={() =>
                setPage((current) =>
                  Math.max(
                    1,
                    current - 1
                  )
                )
              }
            >
              Anterior
            </Button>

            <div className="min-w-32 text-center">
              <p className="text-sm font-medium">
                Página {pagination.page} de{" "}
                {pagination.totalPages}
              </p>

              <p className="mt-1 text-xs text-default-400">
                {pagination.total} artículos
              </p>
            </div>

            <Button
              variant="secondary"
              isDisabled={
                page >=
                pagination.totalPages ||
                articlesQuery.isFetching
              }
              onPress={() =>
                setPage((current) =>
                  Math.min(
                    pagination.totalPages,
                    current + 1
                  )
                )
              }
            >
              Siguiente
            </Button>
          </div>
        )}
    </div>
  );
}