import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { gregorianToHebrew } from "hdate";

const events = [
  {
    title: "פגישה עם צוות",
    start: new Date(2024, 10, 26, 10, 0),
    end: new Date(2024, 10, 26, 11, 0),
    allDay: false,
  },
  {
    title: "סדנה טכנית",
    start: new Date(2024, 10, 27, 14, 0),
    end: new Date(2024, 10, 27, 16, 0),
    allDay: false,
  },
];

export const Test = () => {
  const localizer = momentLocalizer(moment);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    alert(`אירוע נבחר: ${event.title}`);
    setSelectedEvent(event);
  };

  const handleSlotSelect = (slotInfo) => {
    alert(
      `זמן נבחר: ${slotInfo.start.toLocaleString()} - ${slotInfo.end.toLocaleString()}`
    );
  };

  // Custom component to render each day in the calendar
  const CustomDateCell = ({ value }) => {
    // const hebrewDate = gregorianToHebrew(value); // Get the Hebrew date
    // const hebrewDateStr = `${hebrewDate.date} ${hebrewDate.month_name}`; // Format it
    return (
      <div style={{ position: "absolute",height: "100%",zIndex:2 }}>
        <div style={{ position: "relative", top: 5, left: 5, fontSize: 10 ,zIndex:2}}>
          "hebrewDateStr"
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">לוח שנה</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSlotSelect}
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        components={{
          dateCellWrapper: CustomDateCell, // Add Hebrew date to each day
        }}
        messages={{
          next: "הבא",
          previous: "הקודם",
          today: "היום",
          month: "חודש",
          week: "שבוע",
          day: "יום",
          agenda: "סדר יום",
        }}
      />
    </div>
  );
};
