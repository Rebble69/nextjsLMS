import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../db/client";

enum Roles {
  admin = "admin",
  user = "user",
}

declare module "Next-Auth" {
  export interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: keyof typeof Roles;
    };
  }
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async ({ user, session, token }) => {
      session.user!.role = user.role as Roles;

      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId:
        "943982912314-krfpnpdrq19hutnukgaf1frftfkirum1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
