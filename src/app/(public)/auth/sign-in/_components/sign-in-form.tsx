"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useActionState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMagicLink } from "../_actions/send-magic-link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const initialState = { errors: {}, message: "", success: false };

export function SignInForm() {
  const [state, dispatch, pending] = useActionState(
    sendMagicLink,
    initialState
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form action={dispatch} className="space-y-8 w-96 m-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-foreground">Sign in</h1>
          <span className="text-sm text-muted-foreground">
            Type your e-mail address to receive a magic link
          </span>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@example.com"
                  disabled={pending || state.success}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={pending || state.success}
          type="submit"
          className="w-full"
        >
          {state.success
            ? "Link sent - check your inbox"
            : pending
            ? "Sending link"
            : "Continue with e-mail"}
        </Button>
      </form>
    </Form>
  );
}
