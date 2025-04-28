import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../buttons/PrimaryButton";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  consultant_id,
}) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewText.length < 20) {
      alert("Review must be at least 20 characters.");
      return;
    }
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    onSubmit({ reviewText, rating, consultant_id, reviewer_id: user.id });
    setReviewText("");
    setRating(0);
    setHover(0);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Add a Review
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border rounded-lg resize-none"
                    placeholder="Write your review (minimum 20 characters)"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>

                  <div className="flex flex-col items-start space-y-2 mt-2">
                    <label className="text-sm">Rating:</label>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <FaStar
                            key={index}
                            size={20}
                            className="cursor-pointer transition-colors"
                            color={
                              starValue <= (hover || rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button text="Submit Review" onClick={handleSubmit} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
