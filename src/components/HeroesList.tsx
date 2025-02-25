import { useContext } from "react";
import { StateContext } from "../StateContext";
import { FetchResult } from "../index";

export default function HeroesList() {
  const { data, error, loading }: FetchResult = useContext(StateContext);

  if (error) {
    return <h1>There was a problem fetching data. {error}</h1>;
  }

  return (
    <>
      {data?.map((heroe) => {
        return (
          <div key={heroe.id}>
            <img
              src={`${heroe.thumbnail.path}/portrait_fantastic.${heroe.thumbnail.extension}`}
              alt={`heroe image of ${heroe.name}`}
            />
            <h1>{heroe.name}</h1>
          </div>
        );
      })}
    </>
  );
}
