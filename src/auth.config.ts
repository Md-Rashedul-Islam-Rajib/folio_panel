import { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
    //   console.log("user in jwt callback", user);
          if (user) {
              token.email = user.email;
          token.role = user.role;
          token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
    //   console.log("token in session callback", token);
        if (session.user) {
        session.user.email = token.email ?? "";
        session.user.role = token.role ?? "";
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
