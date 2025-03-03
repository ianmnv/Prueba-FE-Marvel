import "./App.css";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useMarvelData } from "./hooks/useFetchedData";
import { StateContext } from "./StateContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HeroesList from "./components/HeroesList";
import HeroeCard from "./components/HeroeCard";
import type { ContextData, MarvelHeroesAPI } from "./index";

function App() {
  const { heroesList, error, loading }: ContextData = useMarvelData();
  const [favoriteHeroesList, setFavoriteHeroesList] = useState<
    typeof heroesList
  >([]);
  const [filteredHeroes, setFilteredHeroes] =
    useState<typeof heroesList>(undefined);
  const [animate, setAnimate] = useState<boolean>(false);
  const [heroe, setHeroe] = useImmer<{
    heroeCard: MarvelHeroesAPI | null;
    loadingHeroe: boolean;
  }>({
    heroeCard: null,
    loadingHeroe: false,
  });

  useEffect(() => {
    setFilteredHeroes(heroesList);
    setAnimate(true);
  }, [heroesList]);

  if (loading || heroe.loadingHeroe) {
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
        heroe,
        setHeroe,
      }}
    >
      <Header />
      {heroe.heroeCard === null ? <SearchBar /> : ""}
      {heroe.heroeCard !== null ? <HeroeCard /> : <HeroesList />}
    </StateContext.Provider>
  );
}

export default App;
