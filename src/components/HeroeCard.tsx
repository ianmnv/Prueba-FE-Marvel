import { useContext, useEffect, useState } from "react";
import { StateContext } from "../StateContext";
import FavIconOutline from "../assets/favorite-ico-outlined.svg";
import FavIconFilled from "../assets/favorite-ico-filled.svg";
import ComicList from "./ComicList";
import type { ContextData } from "..";

export default function HeroeCard() {
  const { favoriteHeroesList, setFavoriteHeroesList, heroe } =
    useContext<ContextData>(StateContext);
  const [favoriteIconFilled, setFavoriteIconFilled] = useState<boolean>(false);

  const heroeCard = heroe?.heroeCard;

  function handleClick() {
    if (setFavoriteHeroesList && favoriteHeroesList && heroeCard) {
      if (!favoriteHeroesList.includes(heroeCard)) {
        setFavoriteHeroesList([...favoriteHeroesList, heroeCard]);
        setFavoriteIconFilled(true);
      } else {
        const removedHeroe = favoriteHeroesList.filter(
          (heroe) => heroe != heroeCard
        );
        setFavoriteHeroesList([...removedHeroe]);
        setFavoriteIconFilled(false);
      }
    }
  }

  useEffect(() => {
    if (heroeCard && favoriteHeroesList?.includes(heroeCard)) {
      setFavoriteIconFilled(true);
    }
  }, [heroeCard]);

  if (!heroeCard) {
    return <h1>Could not display heroe, please try again.</h1>;
  }

  return (
    <section className="heroe-card-container">
      <div className="heroe-card-resume display-flex">
        <img
          src={`${heroeCard?.thumbnail.path}/detail.${heroeCard?.thumbnail.extension}`}
          alt={`${heroeCard?.name}'s image`}
          className="heroe-card-img"
        />

        <div className="heroe-card-info display-flex">
          <div className="heroe-card-title-container display-flex">
            <h1 className="heroe-card-title">
              {heroeCard?.name.toUpperCase()}
            </h1>

            <button
              className="heroe-card-add-favorite-btn"
              onClick={handleClick}
            >
              <img
                src={favoriteIconFilled ? FavIconFilled : FavIconOutline}
                alt="add heroe to favorites"
                className="heroe-card-icon"
              />
            </button>
          </div>

          <p className="heroe-card-description">
            {heroeCard?.description
              ? heroeCard?.description
              : "Without description."}
          </p>
        </div>

        <div className="cut-square"></div>
      </div>

      <ComicList heroeCard={heroeCard} />
    </section>
  );
}
