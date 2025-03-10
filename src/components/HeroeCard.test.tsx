import { render, screen } from "@testing-library/react";
import HeroeCard from "./HeroeCard";
import Header from "./Header";
import { StateContext } from "../StateContext";
import { mockData } from "../mocked/mockData";
import type { ContextData, MarvelHeroesAPI } from "../index";
import userEvent from "@testing-library/user-event";

vi.mock("./ComicList", () => ({
  default: ({ heroeCard }: { heroeCard: MarvelHeroesAPI }) => (
    <div data-testid="mock-comic-list">Mock ComicList: {heroeCard.name}</div>
  ),
}));

function renderHeroeCardWithContext(
  heroeData: MarvelHeroesAPI | null = null,
  loading: boolean = false
) {
  const contextValue: ContextData = {
    loading,
    heroe: { heroeCard: heroeData, loadingHeroe: loading },
    favoriteHeroesList: heroeData ? [heroeData] : undefined,
  };

  return render(
    <StateContext.Provider value={contextValue}>
      <Header />
      <HeroeCard />
    </StateContext.Provider>
  );
}

describe("<HeroeCard />", () => {
  it("displays error message when heroeCard is null", () => {
    renderHeroeCardWithContext(null);

    const errorMsg = screen.getByRole("heading", {
      level: 1,
      name: /could not display heroe, please try again/i,
    });

    expect(errorMsg).toBeInTheDocument();
  });

  it("renders hero details correctly when data is provided", () => {
    const heroData = mockData.data.data.results[0];
    renderHeroeCardWithContext(heroData);

    const heroName = screen.getByRole("heading", { name: "IRON MAN" });
    expect(heroName).toBeInTheDocument();

    const heroImage = screen.getByAltText("Iron Man's image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      "src",
      `${heroData.thumbnail.path}/detail.${heroData.thumbnail.extension}`
    );

    const heroDescription = screen.getByText("Genius billionaire");
    expect(heroDescription).toBeInTheDocument();

    const favIcon = screen.getByAltText("add heroe to favorites");
    expect(favIcon).toBeInTheDocument();

    const comicList = screen.getByTestId("mock-comic-list");
    expect(comicList).toBeInTheDocument();
    expect(comicList).toHaveTextContent("Mock ComicList: Iron Man");
  });

  it("add favorite heroe to favorite list", async () => {
    const heroData = mockData.data.data.results[0];
    renderHeroeCardWithContext(heroData);

    const favoriteBtnHeroeCard = screen.getByRole("button", {
      name: /add heroe to favorites/i,
    });
    const favoriteBtnHeader = screen.getByRole("button", {
      name: /favorite icon/i,
    });

    await userEvent.click(favoriteBtnHeroeCard);

    expect(favoriteBtnHeader).toHaveTextContent("1");
  });
});
