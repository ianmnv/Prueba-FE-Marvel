import { useEffect } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import md5 from "md5";

interface Collection {
  available: number;
  collectionURI: string;
  items: {}[];
  returned: number;
}

interface MarvelData {
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

interface FetchResult {
  data?: MarvelData[];
  error?: string;
  loading: boolean;
}

function useMarvelData(): FetchResult {
  const [state, updateState] = useImmer<FetchResult>({
    data: undefined,
    error: undefined,
    loading: true,
  });

  useEffect(() => {
    const fetchMarvelData = async () => {
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
        const response = await Axios.get<{ data: { results: MarvelData[] } }>(
          url
        );

        if (response?.data?.data?.results) {
          updateState((draft) => {
            draft.data = response.data.data.results;
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

export default useMarvelData;
