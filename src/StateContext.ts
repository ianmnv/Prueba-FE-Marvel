import { createContext } from "react";
import type { FetchResult } from "./index";

export const StateContext = createContext<FetchResult | undefined>(undefined);
