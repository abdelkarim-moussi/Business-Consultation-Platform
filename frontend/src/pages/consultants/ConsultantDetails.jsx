import Navbar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";
import User from "../../assets/images/user.png";
import Button from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReservationModal from "../../components/ReservationModal";
import ReviewModal from "../../components/modals-forms/ReviewModal";
import { toast } from "react-toastify";

export default function ConsultantDetails() {
  const [consultant, setConsultant] = useState({});
  const [consultationsNum, setConsultationsNum] = useState(0);
  const [reviews, setReview] = useState([]);
  const [reviewsNum, setReviewsNum] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const id = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleRequestCall = async (data) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/consultations",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log("error submiting the request call", error);
    }
  };

  const handleAdReview = async (data) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/reviews",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.data.message) {
        toast.success(response.data.message);
      } else toast.error(response.data.error);
    } catch (error) {
      throw ("there is an error when trying to add review", error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Review deletion failed");
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/consultants/${id.id}`
      );

      setConsultant(response.data[0].consultant);
      setConsultationsNum(response.data[0].consultations_num);
      setReview(response.data[0].reviews);
      setReviewsNum(response.data[0].reviews_num);
    };
    fetchUser();
  }, [consultant]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <AuthProvider>
        <Navbar />
      </AuthProvider>

      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-3 gap-6">
            <div className="col-span-2 p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={User}
                    alt={`${consultant.firstName} ${consultant.lastName}`}
                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {consultant.firstName} {consultant.lastName}
                    </h2>
                    <p className="text-lg text-indigo-600 font-medium">
                      {consultant.domainExpertise}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {consultant.experience || 0} years experience
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Location
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">About</h3>
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      "overview" Expert in PR/Public Relations and Growth
                      Hacking. Founder of several multi-million dollar Internet
                      1000 retailers, including CanvasPop.com. Helped launch
                      MyFax.com (which sold for over 220M) and launched a top 1%
                      iOS app. I'm also a global mentor for 500 Startups. I can
                      show you how to get massive
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <Button
                    text="Request a Call"
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-200 font-medium"
                  />

                  <button
                    className="w-full bg-white border-2 border-indigo-500 text-indigo-600 py-3 font-medium rounded-lg hover:bg-indigo-50 transition duration-200"
                    onClick={() => setReviewModalOpen(true)}
                  >
                    Add Review
                  </button>

                  <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 font-medium rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Save to Favorites
                  </button>
                </div>

                <div className="bg-indigo-50 rounded-lg p-5">
                  <div className="flex justify-between items-center">
                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold text-indigo-800">
                        {consultationsNum || 0}
                      </p>
                      <p className="text-sm text-indigo-600">Consultations</p>
                    </div>

                    <div className="h-12 w-px bg-indigo-200"></div>

                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold text-indigo-800">
                        {reviewsNum || 0}
                      </p>
                      <p className="text-sm text-indigo-600">Reviews</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-indigo-100 text-center">
                    <p className="text-sm text-indigo-600">
                      Member since{" "}
                      {new Date(consultant.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
            <span className="text-sm text-gray-500">{reviewsNum} total</span>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.firstName} {review.lastName}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-indigo-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill={i < review.rating ? "currentColor" : "none"}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-3 text-gray-600">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="bg-indigo-50 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-indigo-700 mb-4">No reviews yet</p>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Be the first to leave a review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthProvider>
        <ReservationModal
          isOpen={modalOpen}
          consultant_id={id.id}
          onClose={() => setModalOpen(false)}
          onSubmit={handleRequestCall}
        />
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleAdReview}
          consultant_id={id.id}
        />
      </AuthProvider>
    </div>
  );
}
