import { useEffect } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import md5 from "md5";
import { isValidCache, getCache, setCache } from "../utils/cacheUtils";
import type { ContextData, MarvelHeroesAPI } from "../index";

export function useMarvelData(): ContextData {
  const [state, updateState] = useImmer<ContextData>({
    heroesList: undefined,
    error: undefined,
    loading: true,
  });

  useEffect(() => {
    const fetchMarvelData = async () => {
      if (isValidCache()) {
        const cachedData = getCache();
        if (cachedData) {
          updateState((draft) => {
            draft.heroesList = cachedData;
            draft.loading = false;
          });
          return;
        }
      }

      const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
      const ts = new Date().getTime().toString();
      const hash = md5(ts + privateKey + publicKey);

      if (!publicKey || !privateKey) {
        updateState((draft) => {
          draft.error =
            "Marvel API keys are not configured. Please check your .env and/or .env.example file.";
          draft.loading = false;
        });
        return;
      }

      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`;

      try {
        const response = await Axios.get<{
          data: { results: MarvelHeroesAPI[] };
        }>(url);

        if (response?.data?.data?.results) {
          const heroesData = response.data.data.results;
          setCache(heroesData);
          updateState((draft) => {
            draft.heroesList = heroesData;
            draft.loading = false;
          });
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error: unknown) {
        updateState((draft) => {
          draft.error = Axios.isAxiosError(error)
            ? `Axios Error: ${error.response?.status} - ${
                error.response?.statusText || "Unknown Error"
              }`
            : "Unknown Error occurred while fetching Marvel data";
          draft.loading = false;
        });
      }
    };

    fetchMarvelData();
  }, [updateState]);

  return state;
}
