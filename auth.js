// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

// NextAuth configuration
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    // Called after successful sign-in
    async signIn({ user, profile }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile || {};

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

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

      return true; // Proceed with sign-in
    },

    // Customize JWT token
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const id = profile.id;
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
        if (user && user._id) {
          token.id = user._id;
        }
      }
      return token;
    },

    // Customize session returned to client
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
};

// // Required export for App Router in Next.js (route handler)
// export const handler = NextAuth(authOptions);
// // app/api/auth/[...nextauth]/route.ts
// export { GET, POST } from "@/auth";
// // Export the auth function for use in server components and middleware
// export const auth = handler.auth;


// Create NextAuth instance and destructure all exports
const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

// Export handlers for API routes
export const { GET, POST } = handlers;

// Export auth functions for use in components and middleware
export { auth, signIn, signOut };
