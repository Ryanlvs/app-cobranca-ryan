import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/password";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found.");
        }

        const passwordCheck = await comparePassword(
          credentials.password,
          user.password
        );

        if (passwordCheck) {
          console.log("usuario logado");
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log(auth);
      return !!auth;
    },
  },
});
