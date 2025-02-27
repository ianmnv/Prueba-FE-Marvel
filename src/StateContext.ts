import { createContext } from "react";
import type { ContextData } from "./index";

export const StateContext = createContext<ContextData>({
  heroesList: undefined,
  error: undefined,
  loading: true,
});
