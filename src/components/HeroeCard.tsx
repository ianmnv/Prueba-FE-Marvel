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
    <section>
      <div>
        <img
          src={`${heroeCard?.thumbnail.path}/standard_fantastic.${heroeCard?.thumbnail.extension}`}
          alt={`${heroeCard?.name}'s image`}
        />

        <div>
          <h1>{heroeCard?.name}</h1>
          <img src={FavIconOutline} alt="add heroe to favorites" />
        </div>

        <p>{heroeCard?.description}</p>
      </div>

      <div>
        <h2>COMICS</h2>
        <ComicList heroeCard={heroeCard} />
      </div>
    </section>
  );
}
