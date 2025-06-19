//these all present in step by step on nextauth.js, jsut look in video and copy
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

//nextauth object configuration
const config = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

//create a route handler in app/api/auth/[...nextauth]