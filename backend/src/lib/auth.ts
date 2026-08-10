import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'

import { config } from '../config/config.js'

import { connectDB } from '../database/database.js'

const db = await connectDB()

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    secret: config.better_auth_secret,
    trustedOrigins: [config.frontend_url],
    baseURL: config.better_auth_url,
})