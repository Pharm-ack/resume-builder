import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        return true;
      }
      return true;
    },

    // authorized({ request: { nextUrl }, auth }) {
    //   const isLoggedIn = !!auth?.user;
    //   const { pathname } = nextUrl;

    //   if (pathname.startsWith("/auth") && isLoggedIn) {
    //     return Response.redirect(new URL("/", nextUrl));
    //   }
    //   return true;
    // },

    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }

      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        if (token.email && typeof token.email === "string") {
          session.user.email = token.email;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
