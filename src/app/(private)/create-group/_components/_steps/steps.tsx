"use client";

import { AnimatePresence } from "framer-motion";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { useCreateGroupStepStore } from "../../_providers/create-group-steps-provider";

export function Steps() {
  const { step } = useCreateGroupStepStore((state) => state);

  return (
    <AnimatePresence mode="wait">
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
    </AnimatePresence>
  );
}
