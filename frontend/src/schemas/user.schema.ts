import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Ingresá un email válido').trim(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.email('Ingresá un email válido').trim(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirm: z.string().min(1, 'Confirmá tu contraseña'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm']
  })

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpInput = z.infer<typeof signUpSchema>