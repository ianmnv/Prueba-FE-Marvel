import { useEffect, useState } from "react";
import "./App.css";
import MarvelLogo from "./assets/Marvel-logo.svg";
import FavIconFilled from "./assets/favorite-ico-filled.svg";
import { useMarvelData } from "./hooks/useFetchedData";
import { StateContext } from "./StateContext";
import type { ContextData, MarvelHeroesAPI } from "./index";
import HeroesList from "./components/HeroesList";
import SearchBar from "./components/SearchBar";

function App() {
  const { heroesList, error, loading }: ContextData = useMarvelData();
  const [favoriteHeroesList, setFavoriteHeroesList] = useState<
    MarvelHeroesAPI[]
  >([]);
  const [filteredHeroes, setFilteredHeroes] = useState<
    MarvelHeroesAPI[] | undefined
  >(undefined);

  useEffect(() => {
    setFilteredHeroes(heroesList);
  }, [heroesList]);

  return (
    <StateContext.Provider
      value={{ heroesList, error, loading, filteredHeroes, setFilteredHeroes }}
    >
      <header className="display-flex">
        <img src={MarvelLogo} alt="Marvel Logo" />

        <button id="btn-show-fav-heroes" className="display-flex">
          <img
            src={FavIconFilled}
            alt="Favorite icon"
            className="fav-heroes-ico"
          />
          <p id="numb-of-fav-heroes">{favoriteHeroesList.length}</p>
        </button>
      </header>

      <main>
        <SearchBar />
        <HeroesList />
      </main>
    </StateContext.Provider>
  );
}

export default App;
