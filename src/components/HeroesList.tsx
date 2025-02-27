import { useContext, useState } from "react";
import FavIconOutlined from "../assets/favorite-ico-outlined.svg";
import CutIcon from "../assets/Cut.svg";
import { StateContext } from "../StateContext";
import type { MarvelHeroesAPI } from "../index";

export default function HeroesList() {
  const { loading, error, filteredHeroes } = useContext(StateContext);
  const [hoveredHeroId, setHoveredHeroId] = useState<number | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h1>There was a problem fetching data. {error}</h1>;
  }

  return (
    <section id="heroes-container">
      {filteredHeroes?.map((heroe: MarvelHeroesAPI) => {
        return (
          <div
            key={heroe.id}
            className="heroes-card display-flex"
            data-testid={`heroes-card${heroe.id}`}
            onMouseEnter={() => setHoveredHeroId(heroe.id)}
            onMouseLeave={() => setHoveredHeroId(null)}
          >
            <img
              src={`${heroe.thumbnail.path}/portrait_fantastic.${heroe.thumbnail.extension}`}
              alt={`heroe image of ${heroe.name}`}
              className="heroes-img"
            />

            <div className="heroe-info display-flex">
              <div
                className={`heroe-color-bar ${
                  hoveredHeroId === heroe.id ? "heroe-color-bar-cover" : ""
                }`}
                data-testid={`heroe-color-bar${heroe.id}`}
              ></div>
              <h1 className="heroes-name">
                {heroe.name.length > 10
                  ? `${heroe.name.slice(0, 10)}...`
                  : heroe.name}
              </h1>
              <img
                src={FavIconOutlined}
                alt="Favorite icon"
                className="heroe-info-ico"
              />
              <img src={CutIcon} alt="cut card icon" className="cut-ico" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
