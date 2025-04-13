const ArticleCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Why Client Management Is Important</h1>
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-5 h-5 mr-2"></div>
          <span>Status History</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-5 h-5 mr-2"></div>
          <span>In Contact</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-5 h-5 mr-2"></div>
          <span>Lead</span>
        </div>
        <p className="mb-4">
          Client management is about more than contacts - it's about trust and lasting relationships. Learn why it matters and
        </p>
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Jean Damon"
            className="rounded-full w-10 h-10 mr-2"
          />
          <div>
            <h3 className="font-bold">Jean Damon</h3>
            <p className="text-gray-500">business plan</p>
            <p className="text-gray-500">google ads</p>
            <p className="text-gray-500">12/01/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
