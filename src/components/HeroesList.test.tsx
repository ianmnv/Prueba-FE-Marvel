import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

  it("should render heroe's name with truncation if needed", () => {
    helperRenderContext({
      data: mockData.data.data.results,
      error: undefined,
      loading: false,
    });

    const { results } = mockData.data.data;

    results.map((heroe) => {
      const cutName = `${
        heroe.name.length > 10 ? `${heroe.name.slice(0, 10)}...` : heroe.name
      }`;

      const heroesName = screen.getByRole("heading", {
        name: cutName,
      });

      expect(heroesName).toBeInTheDocument();
      expect(heroesName).toHaveTextContent(cutName);
      expect(heroesName).toHaveClass("heroes-name");
    });
  });

  it("should render heroe images with correct alt text and source", () => {
    helperRenderContext({
      data: mockData.data.data.results,
      error: undefined,
      loading: false,
    });

    const { results } = mockData.data.data;
    results.map((heroe) => {
      const altHeroesText = screen.getByAltText(`heroe image of ${heroe.name}`);

      expect(altHeroesText).toBeInTheDocument();
      expect(altHeroesText).toHaveAttribute(
        "src",
        `${heroe.thumbnail.path}/portrait_fantastic.${heroe.thumbnail.extension}`
      );
    });
  });

  it("should change background color when heroe card is hovered", async () => {
    helperRenderContext({
      data: mockData.data.data.results,
      error: undefined,
      loading: false,
    });

    const { results } = mockData.data.data;
    const heroe = results[0];
    const parentDivEl = screen.getByTestId(`heroes-card${heroe.id}`);
    const childDivEl = screen.getByTestId(`heroe-color-bar${heroe.id}`);

    await userEvent.hover(parentDivEl);

    expect(childDivEl).toHaveClass("heroe-color-bar-cover");
  });

  it("should render error problem", () => {
    helperRenderContext({
      data: undefined,
      error: "Unknown Error occurred while fetching Marvel data",
      loading: false,
    });

    const errorMsg = screen.getByRole("heading", {
      name: /There was a problem fetching data. Unknown Error occurred while fetching Marvel data/i,
    });

    expect(errorMsg).toBeInTheDocument();
  });
});
