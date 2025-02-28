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
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setFilteredHeroes(heroesList);
    setAnimate(true);
  }, [heroesList]);

  if (loading) {
    return (
      <div style={{ position: "relative" }}>
        <Header />
        <div className={`loading-bar ${animate ? "animate" : ""}`}></div>
      </div>
    );
  }

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
