import type { Dispatch, SetStateAction } from "react";
import type { Updater } from "use-immer";

interface Collection {
  available: number;
  collectionURI: string;
  items: {
    name: string;
    resourceURI: string;
  }[];
  returned: number;
}

export interface MarvelHeroesAPI {
  name: string;
  description: string;
  id: number;
  modified: string;
  resourceURI: string;
  comics: Collection;
  events: Collection;
  series: Collection;
  stories: Collection;
  thumbnail: {
    extension: string;
    path: string;
  };
  urls: {}[];
}

export interface ContextData {
  heroesList?: MarvelHeroesAPI[];
  error?: string;
  loading: boolean;
  filteredHeroes?: MarvelHeroesAPI[];
  setFilteredHeroes?: Dispatch<SetStateAction<MarvelHeroesAPI[] | undefined>>;
  favoriteHeroesList?: MarvelHeroesAPI[];
  setFavoriteHeroesList?: Dispatch<
    SetStateAction<MarvelHeroesAPI[] | undefined>
  >;
  heroe?: { heroeCard: MarvelHeroesAPI | null; loadingHeroe: boolean };
  setHeroe?: Updater<{
    heroeCard: MarvelHeroesAPI | null;
    loadingHeroe: boolean;
  }>;
}

export interface CacheData {
  heroesList: MarvelHeroesAPI[];
  timestamp: number;
}
