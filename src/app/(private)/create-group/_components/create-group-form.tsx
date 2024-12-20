"use client";

import { FormHeader } from "./form-header";
import { Steps } from "./_steps/steps";

export function CreateGroupForm() {
  return (
    <form className="flex flex-col gap-10 border p-4 rounded-lg max-w-screen-md w-full mx-auto">
      <FormHeader />
      <Steps />
    </form>
  );
}
