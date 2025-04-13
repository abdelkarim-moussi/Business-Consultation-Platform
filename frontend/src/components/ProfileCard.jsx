const ProfileCard = ({name}) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-xl p-4">
      
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg capitalize text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">Marketing expert</p>
          <p className="text-sm text-gray-500">10 years of experience</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex flex-wrap gap-2">
        {[
          "social media",
          "google ads",
          "strategy",
          "business plan",
          "product design",
          "fundraising",
          "entrepreneurship",
        ].map((skill, index) => (
          <span
            key={index}
            className="text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center mt-4 text-sm text-gray-600">
        <span className="mr-2 text-lg">📍</span> 
        San Francisco
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex items-center justify-center text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-lg">⭐</span>
        ))}
        <span className="text-gray-600 text-sm ml-2">(200)</span>
      </div>
    </div>
  );
};

export default ProfileCard;