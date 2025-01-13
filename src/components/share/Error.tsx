
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-red-300">
        <h1 className="text-xl font-bold mb-4">🚨 Oops! Something went wrong.</h1>
        <p className="text-base mb-6">
          We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          🔄 Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Error;
