import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  loading
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // 表示するページ数
    const halfShow = Math.floor(showPages / 2);
    
    let start = Math.max(1, currentPage - halfShow);
    let end = Math.min(totalPages, start + showPages - 1);
    
    // 終端に近い場合の調整
    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }
    
    // 最初のページ
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }
    
    // メインページ群
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // 最後のページ
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>合計: {totalCount.toLocaleString()} リポジトリ</span>
        <span>{totalPages} ページ中 {currentPage} ページ</span>
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="pagination-button"
        >
          ← 前へ
        </button>
        
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className={`pagination-number ${
                    page === currentPage ? 'active' : ''
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="pagination-button"
        >
          次へ →
        </button>
      </div>
    </div>
  );
};

export default Pagination;