import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    role?: string;
  }

  interface Session extends DefaultSession {
    user: {
      token?: string;
      role: string;
      
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}
