import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Meeting",
      start: "2025-04-30T10:00:00",
      end: "2025-04-30T11:00:00",
      backgroundColor: "#4f46e5",
      borderColor: "#4338ca",
    },
    {
      id: "2",
      title: "Call",
      start: "2025-05-01T14:00:00",
      end: "2025-05-01T14:30:00",
      backgroundColor: "#8b5cf6",
      borderColor: "#7c3aed",
    },
  ]);

  const handleDateClick = (info) => {
    alert(`Clicked on: ${info.dateStr}`);
    console.log(info);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Calendar</h2>
        <p className="text-gray-600">Upcoming meetings and events</p>
      </div>

      <div className="calendar-container overflow-hidden rounded-lg border border-gray-200">
        <style jsx global>{`
          .fc {
            font-family: ui-sans-serif, system-ui, sans-serif;
          }
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
            font-weight: 600;
          }
          .fc .fc-button {
            background-color: #4f46e5;
            border-color: #4338ca;
          }
          .fc .fc-button:hover {
            background-color: #4338ca;
          }
          .fc .fc-button-primary:not(:disabled).fc-button-active,
          .fc .fc-button-primary:not(:disabled):active {
            background-color: #3730a3;
            border-color: #312e81;
          }
          .fc .fc-daygrid-day.fc-day-today,
          .fc .fc-timegrid-col.fc-day-today {
            background-color: rgba(219, 234, 254, 0.5);
          }
          .fc-event {
            padding: 2px 4px;
            border-radius: 4px;
          }
          .fc-event-time,
          .fc-event-title {
            font-weight: 500;
          }
          .fc th {
            padding: 10px 0;
            font-weight: 600;
          }
          .fc-theme-standard td,
          .fc-theme-standard th {
            border-color: #e5e7eb;
          }
        `}</style>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable={true}
          editable={false}
          height="auto"
          aspectRatio={1.8}
          events={events}
          dateClick={handleDateClick}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "08:00",
            endTime: "18:00",
          }}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          nowIndicator={true}
          allDaySlot={false}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
        />
      </div>

      <div className="mt-6 flex space-x-2">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
          <span className="text-sm text-gray-600">Meeting</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
          <span className="text-sm text-gray-600">Call</span>
        </div>
      </div>
    </div>
  );
}
