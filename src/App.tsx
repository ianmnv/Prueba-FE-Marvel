import { useEffect, useState } from "react";
import "./App.css";
import { useMarvelData } from "./hooks/useFetchedData";
import { StateContext } from "./StateContext";
import HeroesList from "./components/HeroesList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import type { ContextData } from "./index";

function App() {
  const { heroesList, error, loading }: ContextData = useMarvelData();
  const [favoriteHeroesList, setFavoriteHeroesList] = useState<
    typeof heroesList
  >([]);
  const [filteredHeroes, setFilteredHeroes] =
    useState<typeof heroesList>(undefined);

  useEffect(() => {
    setFilteredHeroes(heroesList);
  }, [heroesList]);

  return (
    <StateContext.Provider
      value={{
        heroesList,
        error,
        loading,
        filteredHeroes,
        setFilteredHeroes,
        favoriteHeroesList,
        setFavoriteHeroesList,
      }}
    >
      <Header />

      <main>
        <SearchBar />
        <HeroesList />
      </main>
    </StateContext.Provider>
  );
}

export default App;
