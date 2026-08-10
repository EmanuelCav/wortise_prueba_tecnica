import {
    Button,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { signUpSchema, type SignUpInput } from "../../schemas/user.schema";

import { useSignUp } from "../../hooks/useSignUp";

export const Route = createFileRoute("/_guest/signup")({
    component: SignUpPage,
});

function SignUpPage() {

    const navigate = useNavigate();
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

            await navigate({
                to: "/articles",
            });
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-2 text-3xl font-bold">
                    Crear cuenta
                </h1>

                <p className="mb-6 text-default-500">
                    Ingresá tus datos para registrarte
                </p>

                <form
                    className="flex flex-col gap-4"
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
                                    <Label>
                                        Nombre completo
                                    </Label>

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
                                    <Label>
                                        Contraseña
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
                        <p className="text-sm text-danger">
                            {signUpMutation.error.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="mt-2 bg-primary-500"
                        isDisabled={signUpMutation.isPending}
                    >
                        {signUpMutation.isPending
                            ? "Creando cuenta..."
                            : "Registrarse"}
                    </Button>
                </form>
            </div>
        </div>
    );
}