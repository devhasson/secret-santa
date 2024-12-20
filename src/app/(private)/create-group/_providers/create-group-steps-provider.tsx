"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CreateGroupStepsStore,
  createGroupStepsStore,
} from "../_stores/create-group-steps-store";

export type CreateGroupStepStoresApi = ReturnType<typeof createGroupStepsStore>;

export const CreateGroupStepStoreContext = createContext<
  ReturnType<typeof createGroupStepsStore> | undefined
>(undefined);

export interface CreateGroupStepsStoreProviderProps {
  children: ReactNode;
}

export const CreateGroupStepsStoreProvider = ({
  children,
}: CreateGroupStepsStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createGroupStepsStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createGroupStepsStore();
  }

  return (
    <CreateGroupStepStoreContext.Provider value={storeRef.current}>
      {children}
    </CreateGroupStepStoreContext.Provider>
  );
};

export const useCreateGroupStepStore = <T,>(
  selector: (store: CreateGroupStepsStore) => T
): T => {
  const createGroupStepsStoreContext = useContext(CreateGroupStepStoreContext);

  if (!createGroupStepsStoreContext) {
    throw new Error(
      `useCreateGroupStepStore must be used within CreateGroupStepStoreProvider`
    );
  }

  return useStore(createGroupStepsStoreContext, selector);
};
