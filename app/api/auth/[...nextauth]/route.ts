import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ profile }: any) {
            console.log("signIn", profile)
            return true
        },
        async session({ session }: any) {
            console.log("session", session)
            return session
        }
    }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }