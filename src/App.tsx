import { useState } from "react";
import "./App.css";
import MarvelLogo from "./assets/Marvel-logo.svg";
import FavIconFilled from "./assets/favorite-ico-filled.svg";
import FavIconOutlined from "./assets/favorite-ico-outlined.svg";
import useMarvelData from "./hooks/useFetchedData";

function App() {
  const { data: heroesData, error, loading } = useMarvelData();
  const [favHeroes, setFavHeroes] = useState(0);

  console.log(heroesData);

  return (
    <>
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
    </>
  );
}

export default App;
