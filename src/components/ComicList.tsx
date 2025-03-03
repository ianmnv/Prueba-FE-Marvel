import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import type { MarvelHeroesAPI } from "..";

interface ComicImage {
  extension: string;
  path: string;
}

interface ComicData {
  id?: string;
  name: string;
  resourceURI: string;
  image?: ComicImage;
  loading?: boolean;
  error?: string;
}

export default function ComicList({
  heroeCard,
}: {
  heroeCard: MarvelHeroesAPI | null;
}) {
  const [comicsList, setComicsList] = useState<ComicData[]>([]);

  useEffect(() => {
    if (heroeCard?.comics?.items?.length && comicsList.length === 0) {
      const initialComics = heroeCard.comics.items.map((comic) => ({
        ...comic,
        loading: true,
        error: undefined,
        image: undefined,
      }));

      setComicsList(initialComics);
    }
  }, [heroeCard]);

  useEffect(() => {
    if (comicsList.length === 0) return;

    const comicsToFetch = comicsList.filter(
      (comic) => !comic.image && comic.loading && !comic.error
    );

    comicsToFetch.forEach((comic) => {
      fetchComicImgs(comic.resourceURI)
        .then((image) => {
          setComicsList((currentList) =>
            currentList.map((item) =>
              item.resourceURI === comic.resourceURI
                ? { ...item, image, loading: false }
                : item
            )
          );
        })
        .catch((error) => {
          setComicsList((currentList) =>
            currentList.map((item) =>
              item.resourceURI === comic.resourceURI
                ? { ...item, loading: false, error: error.message }
                : item
            )
          );
        });
    });
  }, [comicsList]);

  async function fetchComicImgs(resourceURI: string): Promise<ComicImage> {
    const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    let url = resourceURI;
    if (!url.startsWith("http")) {
      url = `https://gateway.marvel.com${url.startsWith("/") ? "" : "/"}${url}`;
    }

    url = `${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await axios.get(url);
      if (response.data?.data?.results?.[0]?.images?.[0]) {
        return response.data.data.results[0].images[0];
      }
      throw new Error("No image found in response");
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="comics-list">
      {comicsList.map((comic, i) => (
        <div key={i} className="comic-item">
          {comic.loading && <div className="loading">Loading...</div>}

          {comic.error && <div className="error">Failed to load image</div>}

          {comic.image && (
            <img
              src={`${comic.image.path}/portrait_fantastic.${comic.image.extension}`}
              alt={comic.name}
            />
          )}

          <h3>{comic.name}</h3>
        </div>
      ))}
    </div>
  );
}
