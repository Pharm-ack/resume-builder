import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import { Pool } from "@neondatabase/serverless";

const neon = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
