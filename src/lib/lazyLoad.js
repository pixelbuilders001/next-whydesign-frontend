import { lazy, Suspense } from 'react';

// Create a lazy loading wrapper with error boundary
export const createLazyComponent = (importFn, fallback = null) => {
  const LazyComponent = lazy(importFn);
  
  return (props) => (
    <Suspense fallback={fallback || <div className="animate-pulse h-32 bg-gray-200 rounded"></div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Common fallback components
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

export const LoadingCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="bg-gray-200 rounded h-4 mb-2"></div>
    <div className="bg-gray-200 rounded h-4 w-3/4"></div>
  </div>
);
