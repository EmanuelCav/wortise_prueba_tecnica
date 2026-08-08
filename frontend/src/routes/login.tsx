import { Button, FieldError, Input, Label, TextField } from "@heroui/react";

import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { loginSchema, type LoginInput } from "../schemas/user.schema";

import { useLogin } from "../hooks/useLogin";

export const Route = createFileRoute("/login")({
    component: LoginPage,
});

function LoginPage() {

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
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-2 text-3xl font-bold">
                    Iniciar sesión
                </h1>

                <p className="mb-6 text-default-500">
                    Ingresá a tu cuenta
                </p>

                <form
                    className="flex flex-col gap-4"
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
                                                field.state.meta.errors[0]?.message
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
                                                field.state.meta.errors[0]?.message
                                            }
                                        </FieldError>
                                    )}
                                </TextField>
                            );
                        }}
                    </form.Field>

                    {loginMutation.isError && (
                        <p className="text-sm text-danger">
                            {loginMutation.error.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="mt-2 bg-primary-500"
                        isDisabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                    </Button>
                </form>
            </div>
        </div>
    );
}