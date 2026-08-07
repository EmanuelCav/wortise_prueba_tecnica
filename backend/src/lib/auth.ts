import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'

import { getDB } from '../database/database.js'

export const auth = betterAuth({
    database: mongodbAdapter(getDB()),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    trustedOrigins: ['http://localhost:5173'],
})