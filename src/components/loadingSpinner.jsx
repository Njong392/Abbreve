export const LoadingSpinner = () => (
  <div className="relative">
    <div
      role="alert"
      aria-live="assertive"
      className="absolute left-0 top-0 animate-spinner rounded-full border-4 border-t-4 border-t-purple border-gray-200 h-8 w-8">
      <p className="hidden">Content is loading...</p>
    </div>
  </div>
);
