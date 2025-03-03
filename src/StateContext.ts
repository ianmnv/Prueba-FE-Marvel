import { createContext } from "react";
import type { ContextData } from "./index";

export const StateContext = createContext<ContextData>({
  heroesList: undefined,
  error: undefined,
  loading: true,
  filteredHeroes: undefined,
  setFilteredHeroes: undefined,
  favoriteHeroesList: undefined,
  setFavoriteHeroesList: undefined,
  setHeroe: undefined,
});
