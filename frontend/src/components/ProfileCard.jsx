import { Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";

const ProfileCard = ({ consultant }) => {
  const renderRatingStars = (rating) => {
    const ratingValue = rating || 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FaStar key={i} className="text-yellow-400" />;
          } else if (i === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={i} className="text-yellow-400" />;
          } else {
            return <FaRegStar key={i} className="text-gray-300" />;
          }
        })}
        <span className="text-gray-600 text-sm ml-2">
          {consultant.ratings_count || 0}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative">
            {consultant.photo != "http://127.0.0.1:8000/storage" ? (
              <img
                src={consultant.photo || "/api/placeholder/80/80"}
                alt={`${consultant.firstName} ${consultant.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-indigo-500 shadow-md text-center uppercase">
                {consultant.firstName[0] + "/" + consultant.lastName[0]}
              </div>
            )}

            {consultant.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                <FaCheck className="w-4 h-4 text-indigo-600" />
              </div>
            )}
          </div>
          <div>
            <Link to={`/consultants/${consultant.id}`} className="group">
              <h2 className="text-md text-slate-700 font-semibold capitalize group-hover:underline">
                {consultant.firstName} {consultant.lastName}
              </h2>
            </Link>
            <p className="text-indigo-500 text-sm capitalize">
              {consultant.domainExpertise || "Consultant"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-1 text-indigo-600 text-xs" />
            <span>{consultant.location || "San Francisco"}</span>
          </div>
          <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
            {consultant.experience || 0} years exp
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {(
              consultant.skills || [
                "social media",
                "google ads",
                "strategy",
                "business plan",
              ]
            ).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 font-medium hover:bg-indigo-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Client satisfaction</span>
            {renderRatingStars(consultant.rating || 4.5)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
