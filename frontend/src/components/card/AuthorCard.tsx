import type { Author } from "../../hooks/useAuthors"

interface AuthorCardProps {
    author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
    return (
        <div className="rounded-xl border border-divider p-5 bg-white">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700 border border-2">
                    {author.name.charAt(0).toUpperCase()}
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
}

export default AuthorCard