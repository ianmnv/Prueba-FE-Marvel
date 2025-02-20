import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useMarvelData from "./useFetchedData";

const mockData = {
  data: {
    data: {
      results: [
        {
          id: 1,
          name: "Iron Man",
          description: "Genius billionaire",
          modified: "2023-01-01",
          resourceURI: "http://example.com",
          thumbnail: {
            path: "http://example.com",
            extension: "jpg",
          },
          comics: {
            available: 1,
            collectionURI: "http://example.com",
            items: [],
            returned: 1,
          },
          series: {
            available: 1,
            collectionURI: "http://example.com",
            items: [],
            returned: 1,
          },
          stories: {
            available: 1,
            collectionURI: "http://example.com",
            items: [],
            returned: 1,
          },
          events: {
            available: 1,
            collectionURI: "http://example.com",
            items: [],
            returned: 1,
          },
          urls: [],
        },
      ],
    },
  },
};

describe("useMarvelData", () => {
  beforeAll(() => {
    vi.mock("axios");
    vi.mock("md5", () => ({
      default: () => "mocked-hash",
    }));
    vi.mock("vite", () => ({
      env: {
        VITE_MARVEL_PUBLIC_KEY: "mock-public-key",
        VITE_MARVEL_PRIVATE_KEY: "mock-private-key",
      },
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetModules();
  });

  it("should start with initial loading state", () => {
    const { result } = renderHook(() => useMarvelData());

    expect(result.current).toEqual({
      data: undefined,
      error: undefined,
      loading: true,
    });
  });

  it("should fetch Marvel data successfully", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useMarvelData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData.data.data.results);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle API errors", async () => {
    const mockError = {
      response: {
        status: 404,
        statusText: "Not Found",
      },
    };

    vi.mocked(axios.get).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useMarvelData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Unknown Error occurred while fetching Marvel data"
    );
    expect(result.current.data).toBeUndefined();
  });

  it("should handle missing API keys", async () => {
    vi.mocked(import.meta.env, true).VITE_MARVEL_PUBLIC_KEY = "";
    vi.mocked(import.meta.env, true).VITE_MARVEL_PRIVATE_KEY = "";

    const { result } = renderHook(() => useMarvelData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(
        "Marvel API keys are not configured. Please check your .env and/or .env.example file."
      );
    });
  });
});
