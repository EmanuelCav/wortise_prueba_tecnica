import { Button, Card } from '@heroui/react'
import { Link } from '@tanstack/react-router'

const FirstArticle = () => {
    return (
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
    )
}

export default FirstArticle