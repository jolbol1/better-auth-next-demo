"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { LoginSchema, SignUpSchema } from "@/lib/types";
import { redirect } from "next/navigation";

export const signUpEmail = validatedAction(SignUpSchema, async (data) => {
  const { email, password, name } = data;

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  redirect("/dashboard");
});

export const loginEmail = validatedAction(LoginSchema, async (data) => {
  const { email, password } = data;

  await auth.api.signInEmail({
    body: { email, password },
  });

  redirect("/dashboard");
});
