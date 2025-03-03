import { useContext, useState } from "react";
import FavIconOutlined from "../assets/favorite-ico-outlined.svg";
import FavIconFilled from "../assets/favorite-ico-filled.svg";
import CutIcon from "../assets/Cut.svg";
import { StateContext } from "../StateContext";
import type { MarvelHeroesAPI } from "../index";

export default function HeroesList() {
  const {
    error,
    filteredHeroes,
    favoriteHeroesList,
    setFavoriteHeroesList,
    setHeroe,
  } = useContext(StateContext);
  const [hoveredHeroId, setHoveredHeroId] = useState<number | null>(null);

  function handleHeroe(heroe: MarvelHeroesAPI) {
    if (setHeroe) {
      setHeroe((draft) => {
        draft.loadingHeroe = true;
      });

      setTimeout(() => {
        setHeroe((draft) => {
          draft.loadingHeroe = false;
          draft.heroeCard = heroe;
        });
      }, 2500);
    }
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
            onClick={() => handleHeroe(heroe)}
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
                src={
                  favoriteHeroesList?.includes(heroe)
                    ? FavIconFilled
                    : FavIconOutlined
                }
                alt="Favorite icon"
                className="heroe-info-ico"
                onClick={() => {
                  if (favoriteHeroesList && setFavoriteHeroesList)
                    setFavoriteHeroesList([...favoriteHeroesList, heroe]);
                }}
              />
              <img src={CutIcon} alt="cut card icon" className="cut-ico" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
