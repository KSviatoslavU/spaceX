import { createContext, useContext } from "react";
import type { State, Action } from "./types";

type LaunchesContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const LaunchesContext = createContext<LaunchesContextType | null>(null);

export function useLaunchesContext() {
  const context = useContext(LaunchesContext);
  if (!context) {
    throw new Error(
      "useLaunchesContext можно использовать только в LaunchesProvider"
    );
  }
  return context;
}
