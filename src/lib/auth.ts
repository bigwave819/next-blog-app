import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { betterAuth } from "better-auth"
import { db } from "./db"
import * as schema from "./db/schema"

export const auth = betterAuth({
    appName: "Nextjs 15 blog Platform",
    secret: process.env.BETTER_AUTH_SECRET || "BETTER_AUTH_SECRET",
    baseURL: process.env.BASE_URL,
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            ...schema,
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts
        }
    }) ,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: false
    },
    session: {
        expiresIn : 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5
        },
        disableSessionRefresh: true,
    },
    useSecureCookies: process.env.NODE_ENV == 'production',
    defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
})