import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    /** Optional. When omitted, the client uses the current origin,
     *  which is correct on Vercel (auth API is on the same domain). */
    baseURL: process.env.BETTER_AUTH_URL,
     plugins: [
    jwtClient() 
  ]

})