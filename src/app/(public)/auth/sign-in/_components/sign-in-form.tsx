"use client";

import { useActionState, useEffect } from "react";
import { useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { sendMagicLink } from "../_actions/send-magic-link";

const initialState = { errors: {}, message: "" };

export function SignInForm() {
  const [email, setEmail] = useQueryState("message");
  const [state, dispatch, pending] = useActionState(
    sendMagicLink,
    initialState
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      state.message = "";
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-8 w-96 m-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground">Sign in</h1>
        <span className="text-sm text-muted-foreground">
          Type your e-mail address to receive a magic link
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className={`${state.errors?.email && "text-red-700"}`}
        >
          E-mail
        </Label>
        <Input
          placeholder="example@example.com"
          disabled={pending || state.success}
          name="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        {state.errors?.email &&
          state.errors.email.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>
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
  );
}
