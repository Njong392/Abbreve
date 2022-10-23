export const LoadingSpinner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        role="alert"
        aria-live="assertive"
        className="absolute top-8 animate-spinner rounded-full border-4 border-t-4 border-t-purple border-gray-200 h-12 w-12">
        <p className="hidden">Content is loading...</p>
      </div>
    </div>
  );
};
