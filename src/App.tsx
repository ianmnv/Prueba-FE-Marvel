import { useState, useEffect } from "react";
import Axios from "axios";
import md5 from "md5";
import "./App.css";
import MarvelLogo from "./assets/Marvel-logo.svg";
import FavIconFilled from "./assets/favorite-ico-filled.svg";
import FavIconOutlined from "./assets/favorite-ico-outlined.svg";

function App() {
  const [heroesData, setHeroesData] = useState([]);
  const [favoriteHeroes, setFavoriteHeroes] = useState<number>(0);

  useEffect(() => {
    async function fetchMarvelData(): Promise<void> {
      const publicKey = "dfd70ce94ba0fa47654798c89de6835e";
      const privateKey = "44fc613e918e79f96fe8cc08cfdc8214667e0112";
      const ts = new Date().getTime().toString();
      const hash = md5(ts + privateKey + publicKey);

      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`;

      try {
        const response = await Axios.get(url);
        setHeroesData(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMarvelData();
  }, []);

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
          <p id="numb-of-fav-heroes">{favoriteHeroes}</p>
        </button>
      </header>
    </>
  );
}

export default App;
