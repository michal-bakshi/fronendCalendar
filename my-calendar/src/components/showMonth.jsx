import React, { useState, useEffect, useRef } from "react";
import { HDate, Hebcal } from 'hebcal';
import { HebrewCalendar } from 'hebcal';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import MyContex from './contex';
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { changeEvents, deleteEventAction, updateEventAction } from "./redux/actions/dateAction";
import { editEvent, handleMyEvents } from "./axios/dateAxios";
import { MonthVSweek } from "./monthVSweek";
export const ShowMonth = () => {

  let initialMonth = (new Date().getMonth())
  let initialYear = new Date().getFullYear()
  const Hebcal = require('hebcal');
  const navigate = useNavigate()
  const location = useLocation();
  const getMyEvents = useSelector(x => x.dates.getMyEvents);
  const tokenString=useSelector(x=>x.users.tokenString)
  const myD=useDispatch()
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
const holidayEvents=[]

 
  // const getMyEvents=useContext(MyContex).getMyEvents
  const [focusedEventId, setFocusedEventId] = useState(null);
  const [holidays, setHolidays] = useState([]);

  const monthNames = ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני","יולי", "אגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const hebMonth = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא"]
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();
  const currentDate = new Date().getDate();
  let weeks = [];
  let day = 1;


  for (let i = 0; day <= daysInMonth; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfWeek) {
        week.push(null);
      } else if (day <= daysInMonth) {
        week.push(day);
        day++;
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }
 
  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current && (!getMyEvents || getMyEvents.length === 0)) {
      isFetched.current = true;
      handleMyEvents(tokenString)
        .then((response) => {
          console.log(" some print for me", response);
          myD(changeEvents(response.data.listEvent));
         
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
    const hebcal = new Hebcal();
    
    
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://www.hebcal.com/hebcal?v=1&year=${year}&s=on&cfg=json&maj=on&min=on&mod=on&nx=on`
        );
        const data = await response.json();
        setHolidays(data.items);
        console.log(data.items) 
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    
    };
    fetchHolidays(); 
  }, [getMyEvents, tokenString,year]);


  const convertToHeb = (day) => {
    if (day != null) {
      const hebrewDate = new HDate(new Date(year, month, day));
      let x = hebMonth[hebrewDate.day - 1];
      return x
    }
  }
  const prev = () => {
    if (month == 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }
  const next = () => {
    if (month == 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }
  const getEventsForDay = (day) => {

    if (!day) return [];
    const gregorianDate = new Date(year, month, day);
    const hebrewDate = new HDate(gregorianDate);
    let hebDay = hebrewDate.day
    const hebYear=hebrewDate.year 
    const hebrewMonth = hebrewDate.getMonthName()
    if (getMyEvents) {
      const eventsForToday = getMyEvents.filter(event => {
        return (event.hebrewDay == hebDay && event.hebrewMonth == hebrewMonth) && (event.hebrewYear==hebYear ||event.remainder=="yearly");
      });
     
      
      return eventsForToday;
    }
  };
  const holodayEvents = (day) => {
    const holidasList = [];  
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');  
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    console.log(year);
    
  
    holidays.forEach(holi => {
      if (holi.date === formattedDate) {
        holidasList.push(holi);  
      }
    });
  
    return holidasList; 
  }
  


  const handleMouseEnter = (eventId) => {
    setFocusedEventId(eventId);
  };

  const handleMouseLeave = () => {
    setFocusedEventId(null);
  };
 
  const handleEditClick = (eventId, description) => {
    setEditingEventId(eventId);
    setEditedDescription(description); 
  };

  const handleSaveEdit = () => {
    if (editingEventId) {
      editEvent(editingEventId, {desc:editedDescription})
      .then(()=>{
        myD(updateEventAction(editingEventId, editedDescription));
        setEditingEventId(null);
      })
    .catch((err)=>{console.log(err)})
      
    }
  };
  const handleCancelEdit = () => {
    setEditingEventId(null); 
  };


  const deleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("האם אתה בטוח שברצונך למחוק את האירוע?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://calendar-backend-9j19.onrender.com/reservedDates/delete/${eventId}`, {
          method: 'DELETE',
        });

        if (response.status == 200){
          alert("האירוע נמחק בהצלחה");
          myD(deleteEventAction(eventId))
        }
        else
          alert("אירעה שגיאה בעת מחיקת האירוע");

      } catch (error) {
        console.error("שגיאה במהלך מחיקת האירוע:", error);

      }
    }
  };

  const handleRowClick = (index) => {
    console.log(`Clicked row ${index}`)
  }
  const toWeek=()=>{
    navigate('/showWeek')
  }
  return <>

    <h1 className="float-end">{year}</h1>
    <div className="container">
    <MonthVSweek></MonthVSweek>
      <div className="d-inline-flex">
        <p className="btn btn-lg " onClick={prev}>➡️</p>
        <h3>{monthNames[month]}</h3>
        <p className="btn btn-lg" onClick={next}>⬅️</p>
      </div>
      <table className="table table-bordered text-center mt-3 ">
        <thead>
          <tr>
            <th>ראשון</th>
            <th>שני</th>
            <th>שלישי</th>
            <th>רביעי</th>
            <th>חמישי</th>
            <th className="bg-light">שישי</th>
            <th className="bg-light">שבת</th>
          </tr>
        </thead>
        <tbody>

          {weeks.map((week, index) => (
            <tr key={index} onClick={() => handleRowClick(index)}>
              {week.map((day, indexN) => {
                const eventsForDay = getEventsForDay(day);
                const holidasList=holodayEvents(day)
                return (
                  <td key={indexN} className={`${indexN >= 5 ? "bg-light" : ""} events-container overflow-auto`} width={"70px"} height={"80px"}>
                    <div className="d-flex justify-content-between">
                      <span className={day == currentDate && month == initialMonth ? "badge bg-danger rounded-circle" : ""} style={{ height: "22px" }}>
                        {day}
                      </span>
                      {holidasList &&(
                        <div className="holiday-event" style={{
                          maxHeight: "70px",  
                          overflowY: "auto",  
                          width: "100%",     
                        }}>
                          {holidasList.map((holiday,i)=>(
                            <div key={i}  style={{      
                              width: "100%",
                              fontSize: "10px",
                              overflowY: "auto",     
                              padding: "10px",       
                              boxSizing: "border-box",  
                            }}
                            className={`event-description alert ${holiday.category === "parashat" || holiday.category === "roshchodesh" ? "alert-light" : "alert-info"}`}>
                            {holiday.hebrew}
                            </div>
                          ))}

                        </div>
                      )}
                      {eventsForDay && (
                        <div className="events-container" style={{
                          maxHeight: "70px",  
                          overflowY: "auto",  
                          width: "100%",     
                        }}>

                          {eventsForDay.map((event, i) => (
                            <div 
                              key={i}
                              style={{      
                                width: "100%",
                                fontSize: "10px",
                                overflowY: "auto",     
                                padding: "10px",       
                                boxSizing: "border-box"  
                              }}
                              className={`event-description alert ${event.color!=undefined ? event.color:"alert-warning"}`}
                              onMouseEnter={() => handleMouseEnter(event._id)}
                              onMouseLeave={handleMouseLeave}
                            >
                             
                              {editingEventId === event._id ? (
                                <div  >
                                  <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    rows="2"
                                    className="form-control mt-2"
                                  />
                                  <button className="btn btn-sm ok-icon" onClick={handleSaveEdit}>
                                  <i className="bi bi-hand-thumbs-up"></i>
                                  </button>
                                  <button className="btn btn-sm cancel-icon" onClick={handleCancelEdit}>
                                  <i className="bi bi-x-lg"></i>
                                  </button>
                                </div>
                              ) : (
                                <>
                                  {event.description}
                                  {focusedEventId == event._id && (
                                    <div>
                                      <button
                                       className="btn btn-sm btn-primary edit-icon"
                                        onClick={() => handleEditClick(event._id, event.description)}
                                      >
                                        <i className="bi bi-pencil"></i>
                                      </button>
                                      <button
                                        className="btn btn-sm btn-danger delete-icon"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteEvent(event._id);
                                        }}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            
                            </div>
                          ))}
                        </div>
                      )}
                      <span>{convertToHeb(day)}</span>
                    </div>
                  </td>
                );
                
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

  </>
}