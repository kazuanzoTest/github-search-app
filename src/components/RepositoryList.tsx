import React from 'react';
import { Repository } from '../types/github';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>リポジトリを検索中...</p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="empty-state">
        <p>リポジトリが見つかりませんでした。別の検索キーワードをお試しください。</p>
      </div>
    );
  }

  return (
    <div className="repository-list">
      {repositories.map((repo) => (
        <div key={repo.id} className="repository-card">
          <div className="repository-header">
            <div className="repository-info">
              <h3 className="repository-name">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repository-link"
                >
                  {repo.full_name}
                </a>
              </h3>
              <p className="repository-description">
                {repo.description || '説明がありません'}
              </p>
            </div>
            <div className="repository-owner">
              <img 
                src={repo.owner.avatar_url} 
                alt={repo.owner.login}
                className="owner-avatar"
              />
            </div>
          </div>
          
          <div className="repository-metadata">
            <div className="repository-stats">
              <span className="stat">
                <span className="stat-icon">⭐</span>
                {repo.stargazers_count.toLocaleString()}
              </span>
              <span className="stat">
                <span className="stat-icon">🍴</span>
                {repo.forks_count.toLocaleString()}
              </span>
              {repo.language && (
                <span className="stat language">
                  <span className="language-dot"></span>
                  {repo.language}
                </span>
              )}
            </div>
            <div className="repository-updated">
              更新日: {new Date(repo.updated_at).toLocaleDateString('ja-JP')}
            </div>
          </div>
          
          {repo.topics && repo.topics.length > 0 && (
            <div className="repository-topics">
              {repo.topics.slice(0, 5).map((topic) => (
                <span key={topic} className="topic">
                  {topic}
                </span>
              ))}
              {repo.topics.length > 5 && (
                <span className="topic-more">他 +{repo.topics.length - 5}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;