import { render, screen, waitFor } from "@testing-library/react";
import ComicList from "./ComicList";
import axios from "axios";
import { mockData } from "../mocked/mockData";
import type { MarvelHeroesAPI } from "../index";

vi.mock("axios");

vi.mock("md5", () => ({
  default: () => "mocked-hash",
}));

vi.mock("import.meta", () => ({
  env: {
    VITE_MARVEL_PUBLIC_KEY: "mock-public-key",
    VITE_MARVEL_PRIVATE_KEY: "mock-private-key",
  },
}));

const heroWithComics: MarvelHeroesAPI = {
  ...mockData.data.data.results[0],
  comics: {
    available: 2,
    collectionURI: "http://example.com/comics",
    returned: 2,
    items: [
      {
        name: "Iron Man Comic #1",
        resourceURI: "http://example.com/comics/1",
      },
      {
        name: "Avengers featuring Iron Man",
        resourceURI: "http://example.com/comics/2",
      },
    ],
  },
};

const mockComicResponse = {
  data: {
    data: {
      results: [
        {
          images: [
            {
              path: "http://example.com/comic-image",
              extension: "jpg",
            },
          ],
        },
      ],
    },
  },
};

describe("<ComicList />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders comics names from heroeCard", async () => {
    axios.get = vi.fn().mockResolvedValue(mockComicResponse);

    render(<ComicList heroeCard={heroWithComics} />);

    await waitFor(() => {
      expect(screen.getByText("Iron Man Comic #1")).toBeInTheDocument();
    });

    expect(screen.getByText("Avengers featuring Iron Man")).toBeInTheDocument();
  });

  it("displays loading state initially", async () => {
    axios.get = vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockComicResponse), 50)
          )
      );

    render(<ComicList heroeCard={heroWithComics} />);

    await waitFor(() => {
      const loadingElement = screen.getAllByText("Loading...");
      expect(loadingElement.length).toBe(2);
    });
  });

  it("renders comic images when fetch is successful", async () => {
    axios.get = vi.fn().mockResolvedValue(mockComicResponse);

    render(<ComicList heroeCard={heroWithComics} />);

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(2);
    });

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("http://example.com/comic-image")
    );
    expect(images[1]).toHaveAttribute(
      "src",
      expect.stringContaining("http://example.com/comic-image")
    );
  });

  it("handles errors when fetching comic images", async () => {
    axios.get = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<ComicList heroeCard={heroWithComics} />);

    await waitFor(() => {
      const errorElements = screen.getAllByText("Failed to load image");
      expect(errorElements.length).toBe(2);
    });
  });

  it("renders nothing when heroeCard is null", () => {
    const { container } = render(<ComicList heroeCard={null} />);

    const comicsList = container.querySelector(".comics-list");

    expect(comicsList).toBeInTheDocument();
    expect(comicsList).toBeEmptyDOMElement();
  });
});
