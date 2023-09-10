export { default } from "next-auth/middleware"

// paths are need authentication
export const config = {
    matcher: ['/:path*']
}