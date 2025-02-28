import { render, screen } from "@testing-library/react";
import App from "./App";
import { useMarvelData } from "./hooks/useFetchedData";
import { mockData } from "./mocked/mockData";

vi.mock("./hooks/useFetchedData", () => ({
  useMarvelData: vi.fn(),
}));

describe("<App />", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders heroe cards", () => {
    vi.mocked(useMarvelData).mockReturnValue({
      heroesList: mockData.data.data.results,
      error: undefined,
      loading: false,
    });
    render(<App />);

    const heroeNames = screen.getAllByRole("heading");

    expect(heroeNames).toHaveLength(3);
    expect(vi.mocked(useMarvelData)).toHaveBeenCalledTimes(2);
  });

  it("renders search input", () => {
    vi.mocked(useMarvelData).mockReturnValue({
      loading: false,
    });
    render(<App />);

    const inputBar = screen.getByRole("searchbox");

    expect(inputBar).toBeInTheDocument();
  });

  it("renders the Header component when loading", () => {
    vi.mocked(useMarvelData).mockReturnValue({
      heroesList: [],
      error: undefined,
      loading: true,
    });
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders error message", () => {
    vi.mocked(useMarvelData).mockReturnValue({
      heroesList: undefined,
      error: "Unknown Error occurred while fetching Marvel data",
      loading: false,
    });
    render(<App />);

    const errorHeading = screen.getByRole("heading", {
      name: /There was a problem fetching/i,
    });

    expect(errorHeading).toBeInTheDocument();
  });
});
