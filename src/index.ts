import type { Dispatch, SetStateAction } from "react";

interface Collection {
  available: number;
  collectionURI: string;
  items: {}[];
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
}

export interface CacheData {
  heroesList: MarvelHeroesAPI[];
  timestamp: number;
}
