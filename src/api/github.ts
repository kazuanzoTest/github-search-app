import axios, { AxiosError } from 'axios';
import { SearchResponse, SearchParams } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

// Axios インスタンスの作成
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000, // 10秒タイムアウト
});

export const searchRepositories = async (params: SearchParams): Promise<SearchResponse> => {
  const {
    query,
    sort = 'stars',
    order = 'desc',
    per_page = 30,
    page = 1
  } = params;

  try {
    const response = await githubApi.get<SearchResponse>('/search/repositories', {
      params: {
        q: query,
        sort,
        order,
        per_page,
        page,
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response?.status === 403) {
        throw new GitHubApiError('API rate limit exceeded. Please try again later.', 403);
      }
      if (axiosError.response?.status === 422) {
        throw new GitHubApiError('Invalid search query. Please check your search terms.', 422);
      }
      if (axiosError.response?.status) {
        throw new GitHubApiError(`HTTP error! status: ${axiosError.response.status}`, axiosError.response.status);
      }
      if (axiosError.code === 'ECONNABORTED') {
        throw new GitHubApiError('Request timeout. Please try again.', 408);
      }
    }
    
    throw new GitHubApiError('Network error occurred. Please check your connection.', 0);
  }
};