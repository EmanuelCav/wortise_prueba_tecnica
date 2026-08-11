import { Button, Input } from '@heroui/react'
import { Link } from '@tanstack/react-router'

interface PresentationProps {
    session: any;
    search: string;
    setSearch: (search: string) => void;
}

const Presentation = ({ session, search, setSearch }: PresentationProps) => {
    return (
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

                <div className="mt-8 w-full max-w-4xl">
                    <Input
                        type="search"
                        placeholder="Buscar por título, contenido o autor..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        aria-label="Buscar artículos"
                        size={42}
                    />
                </div>

                <Link
                    to={session ? "/articles" : "/login"}
                    className="mt-5"
                >
                    <Button size="lg">
                        {session
                            ? "Escribir un artículo"
                            : "Empezar a escribir"}
                    </Button>
                </Link>
            </div>
        </section>

    )
}

export default Presentation