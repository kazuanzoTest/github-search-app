// GitHub Search API レスポンスの型定義

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface SearchParams {
  query: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export interface SearchState {
  repositories: Repository[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  query: string;
}