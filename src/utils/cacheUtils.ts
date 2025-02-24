import type { CacheData, MarvelData } from "../index";

const CACHE_KEY = "marvel_heroes_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function isValidCache(): boolean {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return false;

  const { timestamp } = JSON.parse(cached) as CacheData;
  const now = new Date().getTime();
  return now - timestamp < CACHE_DURATION;
}

export function getCache(): MarvelData[] | null {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data } = JSON.parse(cached) as CacheData;
  return data;
}

export function setCache(data: MarvelData[]): void {
  const cacheData: CacheData = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}
