"use server";

import { signIn } from "@/auth";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ message: "E-mail is required." })
    .email({ message: "Invalid e-mail address." }),
});

type State = {
  errors?: {
    email?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function sendMagicLink(_prevState: State, formData: FormData) {
  const validatedData = formSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
      success: false,
    };
  }

  try {
    signIn("resend", formData);

    return {
      success: true,
      message: "We sent a magic link to your inbox. Check your e-mail.",
    };
  } catch {
    return {
      success: false,
      message: "An error occurred. Please, try again.",
    };
  }
}
