import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>エラーが発生しました</h3>
        <p>{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            再試行
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;