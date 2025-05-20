import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER!}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          const user = await res.json();
            if (!user) {
                throw new Error("No user found");
            }
          if (!res.ok) {
            throw new Error(user?.message || "Invalid credentials");
          }

          return {
            email: user.data.email,
            role: user.data.role,
            token: user.data.token,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || "Login failed");
          }
          return null;
        }
      },
    })
  ],
});
