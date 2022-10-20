export const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div
        role="alert"
        aria-live="assertive"
        className="animate-spinner ease-linear rounded-full border-4 border-t-4 border-t-purple border-gray-200 h-12 w-12 mb-4">
        <p className="invisible">Content is loading...</p>
      </div>
    </div>
  );
};
