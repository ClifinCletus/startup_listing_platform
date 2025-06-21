//these all present in step by step on nextauth.js, jsut look in video and copy
import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

//nextauth object configuration
const config = {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID || "",
            clientSecret: process.env.AUTH_GITHUB_SECRET || "",
        }),
    ],
    callbacks: {  //object for each operations in the authentication
        async signIn({ user, profile }: {  //from this onwards till end(end of callback, is related to signin the user, then set the id with jwt and assigning them able to create startups and link their name with it)
            user: { name?: string; email?: string; image?: string }, 
            profile?: { id?: string; login?: string; bio?: string } 
        }) {
            const { name, email, image } = user;
            const { id, login, bio } = profile || {};

            const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || "",
                });
            }
            return true; //to continue the signin process
        },
       async jwt({ token, account, profile }) {
        if (account && profile) {
            const id = profile.id;
            const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
            if (user && user._id) {
                token.id = user?._id;
            }
        }
        return token; //to connect the github user with a sanity author to create startups
       },
       async session({session,token}){
        Object.assign(session,{id:token.id});
        return session;
       }
    }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);



//create a route handler in app/api/auth/[...nextauth]