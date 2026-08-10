import 'dotenv/config'

export const config = {
    port: Number(process.env.PORT?.trim()) || 3000,
    frontend_url: process.env.FRONTEND_URL?.trim() || 'http://localhost:5173',
    mongoUri: process.env.MONGO_URI?.trim()!,
    better_auth_secret: process.env.BETTER_AUTH_SECRET?.trim()!,
    better_auth_url: process.env.BETTER_AUTH_URL?.trim()! || 'http://localhost:3000'
}