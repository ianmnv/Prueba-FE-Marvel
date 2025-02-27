import type { CacheData, MarvelHeroesAPI } from "../index";

const CACHE_KEY = "marvel_heroes_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function isValidCache(): boolean {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return false;

  const { timestamp } = JSON.parse(cached) as CacheData;
  const now = new Date().getTime();
  return now - timestamp < CACHE_DURATION;
}

export function getCache(): MarvelHeroesAPI[] | null {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { heroesList } = JSON.parse(cached) as CacheData;
  return heroesList;
}

export function setCache(heroesList: MarvelHeroesAPI[]): void {
  const cacheData: CacheData = {
    heroesList,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}
