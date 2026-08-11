import { Button, Card, FieldError, Input, Label, TextField } from "@heroui/react";

import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import HeaderAuth from "../../components/form/HeaderAuth";
import FooterForm from "../../components/form/FooterForm";

import { useSignUp } from "../../hooks/useSignUp";

import { signUpSchema, type SignUpInput } from "../../schemas/user.schema";

export const Route = createFileRoute("/_guest/signup")({
    component: SignUpPage,
});

function SignUpPage() {

    const navigate = useNavigate();
    const router = useRouter();

    const signUpMutation = useSignUp();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm: "",
        } satisfies SignUpInput,

        validators: {
            onChange: signUpSchema,
        },

        onSubmit: async ({ value }) => {
            await signUpMutation.mutateAsync({
                name: value.name,
                email: value.email,
                password: value.password,
            });

            await router.invalidate();

            await navigate({
                to: "/articles",
            });
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 px-6 py-12">
            <Card className="w-full max-w-md border border-blue-100 shadow-xl">
                <Card.Content className="p-8">
                    <HeaderAuth
                        title="Crear cuenta"
                        subtitle="Creá tu cuenta y empezá a compartir tus ideas"
                    />

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            form.handleSubmit();
                        }}
                    >
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <TextField
                                        type="text"
                                        isInvalid={hasError}
                                        value={field.state.value}
                                        onChange={(value) => {
                                            field.handleChange(value);
                                        }}
                                    >
                                        <Label>Nombre completo</Label>

                                        <Input
                                            placeholder="Juan Pérez"
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
                                        <Label>Contraseña</Label>

                                        <Input
                                            placeholder="********"
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

                        <form.Field name="confirm">
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
                                            Confirmar contraseña
                                        </Label>

                                        <Input
                                            placeholder="********"
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

                        {signUpMutation.isError && (
                            <div className="rounded-lg bg-danger-50 px-4 py-3">
                                <p className="text-sm text-danger">
                                    {signUpMutation.error.message}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="mt-1 bg-primary-500 font-semibold text-white"
                            isDisabled={signUpMutation.isPending}
                        >
                            {signUpMutation.isPending
                                ? "Creando cuenta..."
                                : "Registrarse"}
                        </Button>
                    </form>

                    <FooterForm
                        question="¿Ya tenés una cuenta?"
                        navigate="login"
                        action="Iniciar sesión"
                    />

                </Card.Content>
            </Card>
        </div>
    );
}