import MarvelLogo from "../assets/Marvel-logo.svg";
import FavIconFilled from "../assets/favorite-ico-filled.svg";
import { useContext } from "react";
import { StateContext } from "../StateContext";

export default function Header() {
  const { favoriteHeroesList, heroesList, setFilteredHeroes } =
    useContext(StateContext);

  function handleHeroesList(listOfHeroes: typeof heroesList) {
    if (favoriteHeroesList && setFilteredHeroes) {
      setFilteredHeroes(listOfHeroes);
    }
  }

  return (
    <header className="display-flex">
      <img
        src={MarvelLogo}
        alt="Marvel Logo"
        style={{ cursor: "pointer" }}
        onClick={() => handleHeroesList(heroesList)}
      />

      <button
        id="btn-show-fav-heroes"
        className="display-flex"
        onClick={() => handleHeroesList(favoriteHeroesList)}
      >
        <img
          src={FavIconFilled}
          alt="Favorite icon"
          className="fav-heroes-ico"
        />
        <p id="numb-of-fav-heroes">
          {favoriteHeroesList ? favoriteHeroesList.length : 0}
        </p>
      </button>
    </header>
  );
}
