import { db } from "@/lib/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Enter username ",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: any
      ) {
        const user = await db.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
};
