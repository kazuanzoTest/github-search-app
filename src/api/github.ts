import { SearchResponse, SearchParams } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export const searchRepositories = async (params: SearchParams): Promise<SearchResponse> => {
  const {
    query,
    sort = 'stars',
    order = 'desc',
    per_page = 30,
    page = 1
  } = params;

  const searchParams = new URLSearchParams({
    q: query,
    sort,
    order,
    per_page: per_page.toString(),
    page: page.toString()
  });

  const url = `${GITHUB_API_BASE}/search/repositories?${searchParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new GitHubApiError('API rate limit exceeded. Please try again later.', response.status);
      }
      if (response.status === 422) {
        throw new GitHubApiError('Invalid search query. Please check your search terms.', response.status);
      }
      throw new GitHubApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError('Network error occurred. Please check your connection.', 0);
  }
};