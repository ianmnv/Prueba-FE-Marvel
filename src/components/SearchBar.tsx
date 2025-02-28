import { useContext, useEffect, useState } from "react";
import SearchIco from "../assets/search-ico.svg";
import { StateContext } from "../StateContext";
import type { MarvelHeroesAPI } from "../index";

export default function SearchBar() {
  const { heroesList, filteredHeroes, setFilteredHeroes } =
    useContext(StateContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (filteredHeroes && setFilteredHeroes) {
      setFilteredHeroes(
        heroesList?.filter((heroe: MarvelHeroesAPI) =>
          heroe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, heroesList]);

  return (
    <section id="search-section">
      <div className="search-div display-flex">
        <img src={SearchIco} alt="search icon" />
        <input
          type="search"
          placeholder="SEARCH A CHARACTER..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          id="search-inp"
        />
      </div>
      <p id="search-p">{`${filteredHeroes?.length} RESULTS`}</p>
    </section>
  );
}
