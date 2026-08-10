import {
    Button,
    Card,
    CardContent,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import {
    createFileRoute,
    Link,
    useNavigate,
    useRouter,
} from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";

import {
    loginSchema,
    type LoginInput,
} from "../../schemas/user.schema";

import { useLogin } from "../../hooks/useLogin";

export const Route = createFileRoute("/_guest/login")({
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate();
    const router = useRouter();
    const loginMutation = useLogin();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } satisfies LoginInput,

        validators: {
            onChange: loginSchema,
        },

        onSubmit: async ({ value }) => {
            await loginMutation.mutateAsync(value);

            await router.invalidate();

            await navigate({
                to: "/articles",
            });
        },
    });

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-blue-50 px-6 py-12">
            <Card className="w-full max-w-md border border-divider bg-white shadow-lg">
                <CardContent className="p-8">
                    <div className="mb-8 flex flex-col items-center text-center">

                        <h1 className="text-3xl font-bold tracking-tight">
                            Bienvenido
                        </h1>

                        <p className="mt-2 text-default-500">
                            Iniciá sesión para continuar en
                            Articles App.
                        </p>
                    </div>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            form.handleSubmit();
                        }}
                    >
                        <form.Field name="email">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <TextField
                                        type="email"
                                        isInvalid={hasError}
                                        value={field.state.value}
                                        onChange={(value) => {
                                            field.handleChange(value);
                                        }}
                                    >
                                        <Label>Email</Label>

                                        <Input
                                            placeholder="email@ejemplo.com"
                                            onBlur={field.handleBlur}
                                        />

                                        {hasError && (
                                            <FieldError>
                                                {
                                                    field.state.meta
                                                        .errors[0]?.message
                                                }
                                            </FieldError>
                                        )}
                                    </TextField>
                                );
                            }}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <TextField
                                        type="password"
                                        isInvalid={hasError}
                                        value={field.state.value}
                                        onChange={(value) => {
                                            field.handleChange(value);
                                        }}
                                    >
                                        <Label>
                                            Contraseña
                                        </Label>

                                        <Input
                                            placeholder="••••••••"
                                            onBlur={field.handleBlur}
                                        />

                                        {hasError && (
                                            <FieldError>
                                                {
                                                    field.state.meta
                                                        .errors[0]?.message
                                                }
                                            </FieldError>
                                        )}
                                    </TextField>
                                );
                            }}
                        </form.Field>

                        {loginMutation.isError && (
                            <div className="rounded-lg bg-danger-50 px-4 py-3">
                                <p className="text-sm text-danger">
                                    {loginMutation.error.message}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-2 w-full"
                            isDisabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending
                                ? "Ingresando..."
                                : "Iniciar sesión"}
                        </Button>
                    </form>

                    <div className="mt-6 border-t border-divider pt-6 text-center">
                        <p className="text-sm text-default-500">
                            ¿Todavía no tenés una cuenta?
                        </p>

                        <Link
                            to="/signup"
                            className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                        >
                            Crear una cuenta
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}