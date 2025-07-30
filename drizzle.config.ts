import { Config } from "drizzle-kit"

export default {
    schema: '',
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials : {
        url : process.env.DATABASE_URL || '',
    },
    verbose: true,
    strict: true
} satisfies Config