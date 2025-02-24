import { useState } from "react";
import "./App.css";
import MarvelLogo from "./assets/Marvel-logo.svg";
import FavIconFilled from "./assets/favorite-ico-filled.svg";
import FavIconOutlined from "./assets/favorite-ico-outlined.svg";
import { useMarvelData } from "./hooks/useFetchedData";
import { StateContext } from "./StateContext";
import type { FetchResult } from "./index";

function App() {
  const { data, error, loading }: FetchResult = useMarvelData();
  const [favHeroes, setFavHeroes] = useState(0);

  return (
    <StateContext.Provider value={{ data, error, loading }}>
      <header className="display-flex">
        <img src={MarvelLogo} alt="Marvel Logo" />

        <button id="btn-show-fav-heroes" className="display-flex">
          <img
            src={FavIconFilled}
            alt="Favorite icon"
            className="fav-heores-ico"
          />
          <p id="numb-of-fav-heroes">{favHeroes}</p>
        </button>
      </header>
    </StateContext.Provider>
  );
}

export default App;
