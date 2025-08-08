import React, { useState, useCallback } from 'react';
import './App.css';
import { SearchState } from './types/github';
import { searchRepositories, GitHubApiError } from './api/github';
import SearchForm from './components/SearchForm';
import RepositoryList from './components/RepositoryList';
import Pagination from './components/Pagination';
import ErrorMessage from './components/ErrorMessage';

const ITEMS_PER_PAGE = 30;

function App() {
  const [state, setState] = useState<SearchState>({
    repositories: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
    query: '',
  });

  const handleSearch = useCallback(async (
    query: string, 
    sort: string = 'stars', 
    order: string = 'desc',
    page: number = 1
  ) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      ...(page === 1 && { repositories: [] }),
      query,
      currentPage: page,
    }));

    try {
      const response = await searchRepositories({
        query,
        sort: sort as 'stars' | 'forks' | 'updated',
        order: order as 'asc' | 'desc',
        per_page: ITEMS_PER_PAGE,
        page,
      });

      const totalPages = Math.min(
        Math.ceil(response.total_count / ITEMS_PER_PAGE),
        34 // GitHub APIは最大1000件（34ページ）までしか返さない
      );

      setState(prev => ({
        ...prev,
        repositories: response.items,
        totalCount: response.total_count,
        totalPages,
        loading: false,
        error: null,
      }));
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      
      if (error instanceof GitHubApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        repositories: page === 1 ? [] : prev.repositories,
      }));
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (!state.query || state.loading) return;
    
    // URLパラメータから現在のソート設定を保持するか、デフォルト値を使用
    handleSearch(state.query, 'stars', 'desc', page);
    
    // ページ変更時に画面最上部にスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.query, state.loading, handleSearch]);

  const handleRetry = useCallback(() => {
    if (state.query) {
      handleSearch(state.query, 'stars', 'desc', state.currentPage);
    }
  }, [state.query, state.currentPage, handleSearch]);

  return (
    <div className="App">
      <header className="header">
        <h1>GitHub リポジトリ検索</h1>
        <p>GitHubのリポジトリを検索・発見しよう</p>
      </header>

      <SearchForm
        onSearch={(query, sort, order) => handleSearch(query, sort, order, 1)}
        loading={state.loading}
      />

      {state.error && (
        <ErrorMessage 
          error={state.error} 
          onRetry={handleRetry}
        />
      )}

      {!state.error && (
        <>
          <RepositoryList
            repositories={state.repositories}
            loading={state.loading}
          />

          {state.repositories.length > 0 && !state.loading && (
            <Pagination
              currentPage={state.currentPage}
              totalPages={state.totalPages}
              totalCount={state.totalCount}
              onPageChange={handlePageChange}
              loading={state.loading}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
