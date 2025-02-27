import { useState } from "react";
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

  return (
    <StateContext.Provider value={{ heroesList, error, loading }}>
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

      <SearchBar />
      <HeroesList />
    </StateContext.Provider>
  );
}

export default App;
