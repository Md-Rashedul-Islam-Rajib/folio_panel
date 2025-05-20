"use server";
import { signIn } from "@/auth";

export const credSignIn = async (data: { email: string; password: string }) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
