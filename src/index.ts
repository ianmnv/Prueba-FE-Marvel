interface Collection {
  available: number;
  collectionURI: string;
  items: {}[];
  returned: number;
}

export interface MarvelData {
  name: string;
  description: string;
  id: number;
  modified: string;
  resourceURI: string;
  comics: Collection;
  events: Collection;
  series: Collection;
  stories: Collection;
  thumbnail: {
    extension: string;
    path: string;
  };
  urls: {}[];
}

export interface FetchResult {
  data?: MarvelData[];
  error?: string;
  loading: boolean;
}
