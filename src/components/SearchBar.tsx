import { useContext, useEffect, useState, useMemo } from "react";
import SearchIco from "../assets/search-ico.svg";
import { StateContext } from "../StateContext";
import type { MarvelHeroesAPI } from "../index";

export default function SearchBar() {
  const { heroesList, filteredHeroes, setFilteredHeroes } =
    useContext(StateContext);
  const [searchTerm, setSearchTerm] = useState("");

  const MemoizedFilteredHeroes = useMemo(() => {
    return heroesList?.filter((hero: MarvelHeroesAPI) =>
      hero.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm, heroesList]);

  useEffect(() => {
    if (setFilteredHeroes) {
      setFilteredHeroes(MemoizedFilteredHeroes);
    }
  }, [MemoizedFilteredHeroes, setFilteredHeroes]);

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
