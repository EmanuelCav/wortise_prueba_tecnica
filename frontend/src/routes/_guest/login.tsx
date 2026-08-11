import { Button, Card, FieldError, Input, Label, TextField } from "@heroui/react";

import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import HeaderAuth from "../../components/form/HeaderAuth";
import FooterForm from "../../components/form/FooterForm";

import { useLogin } from "../../hooks/useLogin";

import { loginSchema, type LoginInput } from "../../schemas/user.schema";

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
                <Card.Content className="p-8">
                    <HeaderAuth
                        title="Bienvenido"
                        subtitle="
                            Iniciá sesión para continuar en
                            Articles App.
                        "
                    />
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

                    <FooterForm
                        question="¿Todavía no tenés una cuenta?"
                        navigate="signup"
                        action="Crear una cuenta"
                    />

                </Card.Content>
            </Card>
        </div>
    );
}