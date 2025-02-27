import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { mockData } from "../mocked/mockData";
import { useMarvelData } from "./useFetchedData";
import { isValidCache } from "../utils/cacheUtils";

vi.mock("../utils/cacheUtils.ts", () => ({
  isValidCache: vi.fn(),
  getCache: vi.fn(),
  setCache: vi.fn(),
}));

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

describe("useMarvelData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupHook = () => renderHook(() => useMarvelData());

  it("should fetch Marvel data successfully the first time", async () => {
    vi.mocked(isValidCache).mockReturnValue(false);
    vi.mocked(axios.get).mockResolvedValue(mockData);

    const { result } = setupHook();

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.heroesList).toEqual(mockData.data.data.results);
    expect(result.current.error).toBeUndefined();
  });

  it("should handle API errors", async () => {
    const mockError = {
      response: {
        status: 404,
        statusText: "Not Found",
      },
    };

    vi.mocked(isValidCache).mockReturnValue(false);
    vi.mocked(axios.get).mockRejectedValueOnce(mockError);

    const { result } = setupHook();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Unknown Error occurred while fetching Marvel data"
    );
    expect(result.current.heroesList).toBeUndefined();
  });

  it("should handle missing API keys", async () => {
    vi.mocked(import.meta.env, true).VITE_MARVEL_PUBLIC_KEY = "";
    vi.mocked(import.meta.env, true).VITE_MARVEL_PRIVATE_KEY = "";

    const { result } = setupHook();

    await waitFor(() => {
      vi.mocked(isValidCache).mockReturnValue(false);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(
        "Marvel API keys are not configured. Please check your .env and/or .env.example file."
      );
    });
  });
});
