import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** Optional. When omitted, the client uses the current origin,
     *  which is correct on Vercel (auth API is on the same domain). */
    baseURL: process.env.NEXT_PUBLIC_APP_URL || undefined,
})