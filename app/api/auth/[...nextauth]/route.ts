import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // insert user into db
      if (profile) {
        const prisma = new PrismaClient();
        await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email!,
            username: profile.name!,
          },
        });
        console.log("User inserted into db");
      }

      return true;
    },
    jwt: async ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // session.accessToken = token.access_token as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
