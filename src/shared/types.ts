export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba?: boolean;
  background_image: string;
  rating?: number;
  rating_top?: number;
  ratings?: Rating[];
  ratings_count?: number;
  reviews_text_count?: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic?: number;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;
  user_game?: any; // Replace 'any' with a specific type if known
  reviews_count?: number;
  saturated_color?: string;
  dominant_color?: string;
  platforms: PlatformInfo[];
  parent_platforms?: ParentPlatform[];
  genres: Genre[];
  stores: StoreInfo[];
  clip?: any; // Replace 'any' if the structure is known
  tags: Tag[];
}

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface PlatformInfo {
  platform: Platform;
  released_at: string;
  requirements_en?: Requirements;
  requirements_ru?: Requirements | null;
}

interface Platform {
  id: number;
  name: string;
  slug?: string;
  image?: string | null;
  year_end?: number | null;
  year_start?: number | null;
  games_count?: number;
  image_background?: string;
}

interface Requirements {
  minimum?: string;
  recommended?: string;
}

interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Genre {
  id: number;
  name: string;
  slug?: string;
  games_count?: number;
  image_background?: string;
}

interface StoreInfo {
  id: number;
  store: GameStore;
}

interface GameStore {
  id: number;
  name: string;
  slug?: string;
  domain: string;
  games_count?: number;
  image_background: string;
}

interface Tag {
  id: number;
  name: string;
  slug?: string;
  language?: string;
  games_count?: number;
  image_background: string;
}

export interface Creator {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_background: string;
  games_count: number;
  positions: Position[];
  games: CreatorsGame[];
}

interface Position {
  id: number;
  name: string;
  slug: string;
}

interface CreatorsGame {
  id: number;
  slug: string;
  name: string;
  added: number;
}

export interface Store {
  id: number;
  name: string;
  domain: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: StoreGame[];
}

interface StoreGame {
  id: number;
  slug: string;
  name: string;
  added: number;
}