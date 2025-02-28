import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { StateContext } from "../StateContext";
import { mockData } from "../mocked/mockData";
import { ContextData, MarvelHeroesAPI } from "../index";

function helperRenderContext(
  fakeData: ContextData,
  favHeroes: MarvelHeroesAPI[] | undefined = []
) {
  render(
    <StateContext.Provider
      value={{ ...fakeData, favoriteHeroesList: favHeroes }}
    >
      <Header />
    </StateContext.Provider>
  );
}

describe("<Header/>", () => {
  it("renders Marvel Logo", () => {
    helperRenderContext({ loading: false });

    const altTextImg = screen.getByAltText(/marvel logo/i);
    expect(altTextImg).toBeDefined();
    expect(altTextImg).toBeInTheDocument();
  });

  it("should have correct classes in header, favorite button & favorite icon", () => {
    helperRenderContext({ loading: false }, []);

    const header = screen.getByRole("banner");
    const favBtn = screen.getByRole("button");
    const favoriteIcon = screen.getByRole("img", { name: "Favorite icon" });

    expect(header).toHaveClass("display-flex");
    expect(favBtn).toHaveClass("display-flex");
    expect(favBtn).toHaveAttribute("id", "btn-show-fav-heroes");
    expect(favoriteIcon).toHaveClass("fav-heroes-ico");
  });

  it("renders favorite button with default value of 0 and favorite icon", () => {
    helperRenderContext({ loading: false }, []);

    const favIcoFilledImg = screen.getByRole("img", {
      name: /favorite icon/i,
    });
    const btn = screen.getByRole("button");

    expect(btn).toBeEnabled();
    expect(btn).toContainElement(favIcoFilledImg);
    expect(btn).toHaveTextContent("0");
    expect(btn).toBeInTheDocument();
    expect(favIcoFilledImg).toBeInTheDocument();
  });

  it("should handle undefined favoriteHeroesList correctly", () => {
    helperRenderContext({ loading: false }, undefined);

    const btn = screen.getByRole("button");

    expect(btn).toHaveTextContent("0");
    expect(btn).toBeInTheDocument();
  });

  it("renders correctly number of favorite heroes", () => {
    helperRenderContext({ loading: false }, mockData.data.data.results);

    const favfavCountElement = screen.getByText("3");

    expect(favfavCountElement).toBeInTheDocument();
  });
});
