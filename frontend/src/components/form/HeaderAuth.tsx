interface HeaderAuthProps {
    title: string;
    subtitle: string;
}

const HeaderAuth = ({ title, subtitle }: HeaderAuthProps) => {
    return (
        <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>
            <p className="mt-2 text-default-500">
                {subtitle}
            </p>
        </div>
    )
}

export default HeaderAuth