import { useContext } from "react";
import { StateContext } from "../StateContext";
import FavIconOutline from "../assets/favorite-ico-outlined.svg";
import ComicList from "./ComicList";
import { ContextData } from "..";

export default function HeroeCard() {
  const { heroe } = useContext<ContextData>(StateContext);

  const heroeCard = heroe?.heroeCard;

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

        <div className="heroe-card-info">
          <div className="heroe-card-title-container display-flex">
            <h1 className="heroe-card-title">
              {heroeCard?.name.toUpperCase()}
            </h1>
            <img
              src={FavIconOutline}
              alt="add heroe to favorites"
              className="heroe-card-icon"
            />
          </div>

          <p className="heroe-card-description">
            {heroeCard?.description
              ? heroeCard?.description
              : "Without description."}
          </p>

          <div className="cut-square"></div>
        </div>
      </div>

      <ComicList heroeCard={heroeCard} />
    </section>
  );
}
