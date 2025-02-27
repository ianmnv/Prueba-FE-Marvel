import { isValidCache, getCache, setCache } from "./cacheUtils";
import { mockData } from "../mocked/mockData";
import type { CacheData } from "../index";

describe("Cache utility functions", async () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.restoreAllMocks();
  });

  test("isValidCache should return false when no cache exists", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValue(null);
    expect(isValidCache()).toBeFalsy();
  });

  test("isValidCache should return true for cache less than 24h old", () => {
    setCache(mockData.data.data.results);
    expect(isValidCache()).toBeTruthy();
  });

  test("isValidCache should return false for cache older than 24h", () => {
    const expiredCache: CacheData = {
      heroesList: [],
      timestamp: new Date().getTime() - 25 * 60 * 60 * 1000,
    };
    vi.spyOn(localStorage, "getItem").mockReturnValue(
      JSON.stringify(expiredCache)
    );
    expect(isValidCache()).toBeFalsy();
  });

  test("isValidCache() should return true if cache is valid", () => {
    setCache(mockData.data.data.results);
    expect(isValidCache()).toBeTruthy();
  });

  test("getCache should return null when no cache exists", () => {
    expect(getCache()).toBeNull();
  });

  test("getCache should return cached data when it exists", () => {
    setCache(mockData.data.data.results);
    expect(getCache()).toEqual(mockData.data.data.results);
  });
});
