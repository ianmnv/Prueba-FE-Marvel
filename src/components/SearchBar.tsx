import { useContext, useEffect, useState } from "react";
import SearchIco from "../assets/search-ico.svg";
import { StateContext } from "../StateContext";
import type { MarvelHeroesAPI } from "../index";

export default function SearchBar() {
  const { heroesList, loading, filteredHeroes, setFilteredHeroes } =
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div>
        <img src={SearchIco} alt="search icon" />
        <input
          type="search"
          placeholder="SEARCH A CHARACTER..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <p>{`${filteredHeroes?.length} results`}</p>
    </section>
  );
}
