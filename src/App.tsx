import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import md5 from "md5";

function App() {
  const [heroesData, setHeroesData] = useState([]);

  useEffect(() => {
    async function fetchMarvelData(): Promise<void> {
      const publicKey = "dfd70ce94ba0fa47654798c89de6835e";
      const privateKey = "44fc613e918e79f96fe8cc08cfdc8214667e0112";
      const ts = new Date().getTime().toString();
      const hash = md5(ts + privateKey + publicKey);

      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await Axios.get(url);
        setHeroesData(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMarvelData();
  }, []);

  console.log(heroesData);

  return <>Starters</>;
}

export default App;
