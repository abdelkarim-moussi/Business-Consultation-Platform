import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DisponibilityPicker = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useAuth();

  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateForDisplay = (date) => {
    return new Intl.DateTimeFormat("ma-MA", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = [];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const firstDay = currentMonth.getDay();

    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isToday =
        today.getDate() === i &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear();
      const isSelected = date.getDate() === i;
      const isPast = dayDate < new Date(today.setHours(0, 0, 0, 0));

      days.push(
        <button
          key={`day-${i}`}
          type="button"
          disabled={isPast}
          onClick={() => {
            setDate(new Date(date.getFullYear(), date.getMonth(), i));
            setShowCalendar(false);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-100"}
            ${isToday ? "border border-blue-500" : ""}
            ${isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
          `}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 w-64 absolute top-full left-0 z-10 mt-1">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
            }
            className="p-1 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <h3 className="font-medium">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(date)}
          </h3>
          <button
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
            }
            className="p-1 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="w-8 h-8 flex items-center justify-center text-xs text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const submitDisponibility = async () => {
    const disponibility = {
      consultant_id: user.id,
      date: formatDateForInput(date),
      startTime,
      endTime,
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/disponibilities",
      disponibility
    );

    console.log(response.data.message);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hourFormatted = hour.toString().padStart(2, "0");
        const minutesFormatted = minutes.toString().padStart(2, "0");
        options.push(`${hourFormatted}:${minutesFormatted}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Schedule Your Disponibility
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Select a date and time range when you're disponible
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="bg-white border border-gray-300 text-gray-900 text-left sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2.5 transition-all hover:border-blue-300"
            >
              {formatDateForDisplay(date)}
            </button>
            {showCalendar && generateCalendar()}
          </div>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time Range
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-8 py-2.5 appearance-none"
              >
                {timeOptions.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time.split(":")[0] > 12
                      ? `${parseInt(time.split(":")[0]) - 12}:${
                          time.split(":")[1]
                        } PM`
                      : `${
                          time.split(":")[0] === "00"
                            ? "12"
                            : parseInt(time.split(":")[0])
                        }:${time.split(":")[1]} ${
                          time.split(":")[0] >= 12 ? "PM" : "AM"
                        }`}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <span className="text-gray-500">to</span>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-8 py-2.5 appearance-none"
              >
                {timeOptions.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time.split(":")[0] > 12
                      ? `${parseInt(time.split(":")[0]) - 12}:${
                          time.split(":")[1]
                        } PM`
                      : `${
                          time.split(":")[0] === "00"
                            ? "12"
                            : parseInt(time.split(":")[0])
                        }:${time.split(":")[1]} ${
                          time.split(":")[0] >= 12 ? "PM" : "AM"
                        }`}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={submitDisponibility}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default DisponibilityPicker;
