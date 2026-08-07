import type { Context, MiddlewareHandler } from 'hono'

import { auth } from '../lib/auth.js'

export const authMiddleware: MiddlewareHandler = async (c, next) => {

    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    })

    if (!session) {
        return c.json({ error: 'No autorizado. Debes iniciar sesión para realizar esta acción.' }, 401)
    }

    c.set('user', session.user)
    c.set('session', session.session)

    await next()
}

export const getAuthUser = (c: Context) => {

    const user = c.get('user')

    if (!user) {
        throw new Error('Usuario no autenticado')
    }

    return user

}