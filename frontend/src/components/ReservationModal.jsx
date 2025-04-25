import { useState } from "react";
import Button from "../components/buttons/Button"; // assuming you're using your own Button
import { Dialog } from "@headlessui/react";
import { format, formatDate } from "date-fns";
import { useAuth } from "../context/AuthContext";

export default function ReservationModal({
  isOpen,
  onClose,
  onSubmit,
  consultant_id,
}) {
  const [consultation_reason, setConsultation_reason] = useState("");
  const [date, setDate] = useState("");
  const [delay, setDelay] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (consultation_reason.trim().length < 50) {
      newErrors.consultation_reason =
        "Consultation reason must be at least 50 characters.";
    }

    if (!date) {
      newErrors.date = " select a date ";
    }

    if (!delay.trim()) {
      newErrors.delay = "Please specify the consultation delay.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    const entrepreneur_id = user.id;

    setDate(newDate);

    onSubmit({
      consultation_reason,
      delay,
      date,
      entrepreneur_id,
      consultant_id,
    });

    onClose();
    setConsultation_reason("");
    setDate("");
    setDelay("");
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
            Request a Call with Expert
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Consultation Reason
              </label>
              <textarea
                rows={4}
                value={consultation_reason}
                onChange={(e) => setConsultation_reason(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#19485F] focus:outline-none"
                placeholder="Describe your consultation reason..."
              />
              {errors.consultation_reason && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.consultation_reason}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#19485F] focus:outline-none"
              />
              {errors.date && (
                <p className="text-sm text-red-600 mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Consultation Delay (e.g. 30 mins, ASAP, etc.)
              </label>
              <input
                type="text"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#19485F] focus:outline-none"
              />
              {errors.delay && (
                <p className="text-sm text-red-600 mt-1">{errors.delay}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 items-center">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-red-400 hover:bg-red-500 text-white transition"
              >
                Cancel
              </button>
              <Button type="submit" text="Submit Request" />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
