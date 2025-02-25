import { createContext } from "react";
import type { FetchResult } from "./index";

export const StateContext = createContext<FetchResult>({
  data: undefined,
  error: undefined,
  loading: true,
});
