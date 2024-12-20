import { createStore } from "zustand/vanilla";

export type CreateGroupStepsState = {
  step: number;
};

export type CreateGroupStepsActions = {
  decrementStep: () => void;
  incrementStep: () => void;
};

export type CreateGroupStepsStore = CreateGroupStepsState &
  CreateGroupStepsActions;

export const defaultInitState: CreateGroupStepsState = {
  step: 1,
};

export const createGroupStepsStore = (
  initState: CreateGroupStepsState = defaultInitState
) => {
  return createStore<CreateGroupStepsStore>()((set) => ({
    ...initState,
    decrementStep: () => set((state) => ({ step: state.step - 1 })),
    incrementStep: () => set((state) => ({ step: state.step + 1 })),
  }));
};
