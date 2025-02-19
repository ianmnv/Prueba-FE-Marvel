import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App/>", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render alt text attribute in Marvel Logo", () => {
    const altTextImg = screen.getByAltText(/marvel logo/i);
    expect(altTextImg).toBeDefined();
    expect(altTextImg).toBeInTheDocument();
  });

  it("should check button value & alt text", () => {
    const btn = screen.getByRole("button");
    const favIcoFilledImg = screen.getByRole("img", {
      name: /favorite icon/i,
    });
    const numberOfFavHeroes = screen.getByText(/0/i);

    expect(btn).toBeVisible();
    expect(btn).toBeEnabled();
    expect(btn).toContainElement(favIcoFilledImg);
    expect(btn).toContain(numberOfFavHeroes);

    expect(favIcoFilledImg).toBeInTheDocument();
  });
});
