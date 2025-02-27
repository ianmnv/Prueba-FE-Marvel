import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { StateContext } from "../StateContext";
import { mockData } from "../mocked/mockData";
import type { ContextData } from "../index";
import HeroesList from "./HeroesList";

function helperRenderContext(fakeData: ContextData) {
  return render(
    <StateContext.Provider
      value={{ ...fakeData, filteredHeroes: fakeData.heroesList }}
    >
      <SearchBar />
      <HeroesList />
    </StateContext.Provider>
  );
}

describe("<SearchBar />", () => {
  it("renders image alt text & number of heroes displayed", () => {
    helperRenderContext({
      heroesList: mockData.data.data.results,
      error: undefined,
      loading: false,
    });

    const altText = screen.getByAltText("search icon");
    const numberOfHeroes = screen.getByText("3 results");

    expect(altText).toBeInTheDocument();
    expect(altText).toBeDefined();

    expect(numberOfHeroes).toHaveTextContent("3 results");
  });

  it("input search flow", async () => {
    helperRenderContext({
      heroesList: mockData.data.data.results,
      error: undefined,
      loading: false,
      setFilteredHeroes: vi.fn(),
    });

    const input = screen.getByRole("searchbox");

    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
    expect(input).toHaveAttribute("placeholder", "SEARCH A CHARACTER...");

    await userEvent.type(input, "iron");

    const heroeName = screen.getByRole("heading", { name: "Iron Man" });
    expect(heroeName).toBeInTheDocument();
  });

  it("renders loading text", () => {
    helperRenderContext({
      heroesList: undefined,
      error: undefined,
      loading: true,
    });

    const loadingText = screen.getAllByText("Loading...");

    loadingText.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });
});
