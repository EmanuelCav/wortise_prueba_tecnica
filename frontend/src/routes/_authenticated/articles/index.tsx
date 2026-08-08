import {
  Button,
  Card,
  CardContent,
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

function MyArticlesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const articlesQuery = useMyArticles(page);

  const articles =
    articlesQuery.data?.data ?? [];

  const pagination =
    articlesQuery.data?.pagination;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Mis artículos
          </h1>

          <p className="mt-2 text-default-500">
            Administrá los artículos que publicaste.
          </p>
        </div>

        <Link to="/articles/new">
          <Button variant="primary">
            Nuevo artículo
          </Button>
        </Link>
      </div>

      {articlesQuery.isLoading && (
        <p className="text-default-500">
          Cargando artículos...
        </p>
      )}

      {articlesQuery.isError && (
        <p className="text-danger">
          {articlesQuery.error.message}
        </p>
      )}

      {!articlesQuery.isLoading &&
        articles.length === 0 && (
          <Card>
            <CardContent className="items-center py-12 text-center">
              <h2 className="text-xl font-semibold">
                Todavía no tenés artículos
              </h2>

              <p className="mt-2 text-default-500">
                Empezá escribiendo tu primer
                artículo.
              </p>

              <Link
                to="/articles/new"
                className="mt-5"
              >
                <Button variant="primary">
                  Crear artículo
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent>
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  {article.coverImageUrl && (
                    <img
                      src={
                        article.coverImageUrl
                      }
                      alt=""
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                    />
                  )}

                  <h2 className="text-xl font-semibold">
                    {article.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-default-500">
                    {article.content}
                  </p>

                  <p className="mt-4 text-sm text-default-400">
                    Creado el{" "}
                    {new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="primary"
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
                    articleId={
                      article.id
                    }
                    articleTitle={
                      article.title
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination &&
        pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="primary"
              isDisabled={page === 1}
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

            <span className="text-sm text-default-500">
              Página {pagination.page} de{" "}
              {pagination.totalPages}
            </span>

            <Button
              variant="primary"
              isDisabled={
                page >=
                pagination.totalPages
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