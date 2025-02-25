import { render, screen } from "@testing-library/react";
import HeroesList from "./HeroesList";
import { StateContext } from "../StateContext";
import { mockData } from "../mocked/mockData";
import type { FetchResult } from "../index";

describe("<HeroesList/>", () => {
  function helperRenderContext(fakeData: FetchResult) {
    return render(
      <StateContext.Provider value={fakeData}>
        <HeroesList />
      </StateContext.Provider>
    );
  }

  it("should render heroe's name and alt text", () => {
    helperRenderContext({
      data: mockData.data.data.results,
      error: undefined,
      loading: false,
    });

    const { results } = mockData.data.data;
    results.map((heroe) => {
      const herosName = screen.getByRole("heading", { name: heroe.name });
      const altHeroesText = screen.getByAltText(`heroe image of ${heroe.name}`);

      expect(herosName).toBeInTheDocument();
      expect(herosName).toHaveTextContent(heroe.name);

      expect(altHeroesText).toBeInTheDocument();
      expect(altHeroesText).toHaveAttribute(
        "src",
        `${heroe.thumbnail.path}/portrait_fantastic.${heroe.thumbnail.extension}`
      );
    });
  });
});
