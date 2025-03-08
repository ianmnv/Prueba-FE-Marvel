import type { MarvelHeroesAPI } from "../index";

export const mockData: { data: { data: { results: MarvelHeroesAPI[] } } } = {
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
        {
          id: 2,
          name: "3-D Man",
          description: "",
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
        {
          id: 3,
          name: "A-Bomb (HAS)",
          description:
            "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate!",
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
