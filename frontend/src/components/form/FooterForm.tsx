import { Link } from "@tanstack/react-router"

interface FooterFormProps {
    question: string;
    action: string;
    navigate: string
}

const FooterForm = ({ question, action, navigate }: FooterFormProps) => {
    return (
        <div className="mt-6 border-t border-divider pt-6 text-center">
            <p className="text-sm text-default-500">
                {question}
            </p>
            <Link
                to={`/${navigate}`}
                className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
                {action}
            </Link>
        </div>
    )
}

export default FooterForm