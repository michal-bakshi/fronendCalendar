import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HDate, Hebcal } from 'hebcal';
import { useDispatch, useSelector } from "react-redux";
import { editEvent, handleMyEvents } from "./axios/dateAxios";
import { changeEvents, deleteEventAction, updateEventAction } from "./redux/actions/dateAction";
import { MonthVSweek } from "./monthVSweek";

export const ShowWeek=()=>{
    let initialYear = new Date().getFullYear()
    let initialMonth = (new Date().getMonth())
    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const monthNames = ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני","יולי", "אגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    const hebMonth = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא"]
    const [currentDate, setCurrentDate] = useState(new Date());
    const Hebcal = require('hebcal');
    const navigate=useNavigate()
    const getMyEvents = useSelector(x => x.dates.getMyEvents);
  
    const tokenString=useSelector(x=>x.users.tokenString)
    const myD=useDispatch()
    const [editingEventId, setEditingEventId] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
     const [focusedEventId, setFocusedEventId] = useState(null);
     const [holidays, setHolidays] = useState([]);
    const getStartOfWeek = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start;
    };
  
    const currentWeekStart = getStartOfWeek(currentDate);
  
   
    const getWeekDates = (startDate) => {
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        weekDates.push(date);
      }
      return weekDates;
    };
  
    const weekDates = getWeekDates(currentWeekStart);
    const isFetched = useRef(false);
    useEffect(() => {
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
        if (!getMyEvents || getMyEvents.length === 0) {
          handleMyEvents(tokenString)
            .then((response) => {
              console.log(" some print for me", response);
              isFetched.current = true;
             
              myD(changeEvents(response.data.listEvent));
             
            })
            .catch((error) => {
              console.error("Error fetching events:", error);
            });
        }
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
      }, [ getMyEvents,tokenString,year,currentDate]);

    
    
   const getEventsForDay = (day) => {
  
      if (!day) return [];
      const gregorianDate = new Date(year, month, day);
      const hebrewDate = new HDate(gregorianDate);
      let hebDay = hebrewDate.day
      const hebrewMonth = hebrewDate.getMonthName()
      if (getMyEvents) {
        const eventsForToday = getMyEvents.filter(event => {
          return event.hebrewDay == hebDay && event.hebrewMonth == hebrewMonth;
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
             console.error("שגיאה במחיקת האירוע:", error);
     
           }
         }
       };
     const handleCancelEdit = () => {
       setEditingEventId(null); 
     };
   
    const prev = () => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() - 7);
        return newDate;
      });
    };
  
   
    const next = () => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() + 7);
        return newDate;
      });
    };

const toMonth=()=>{
navigate('/my_show_month')
}
  const convertToHeb = (day) => {
    if (day != null) {
      const hebrewDate = new HDate(new Date(year, month, day));
      let x = hebMonth[hebrewDate.day - 1];
      return x
    }
  }

    return<>
    
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
            <tr style={{ height: "65vh"  }} >
           
                {weekDates.map((date, index) => {
                    const eventsForDay = getEventsForDay(date.getDate());
                    const holidasList=holodayEvents(date.getDate())
                   return(
                     <td key={index} width={"90px"}>
                       
                     <div className="d-flex justify-content-between">
                        <span className={date.getDate() == currentDate.getDate() && month == initialMonth ? "badge bg-danger rounded-circle" : ""} style={{ height: "22px" }}>
                        {date.getDate()}
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
                            className="event-description alert alert-info">
                              {holiday.hebrew}
                            </div>
                          ))}

                        </div>
                      )}
                      {eventsForDay && (
                        <div className="events-container overflow-auto">
                          {eventsForDay.map((event, i) => (
                            <div 
                              key={i}
                              style={{
                               fontSize: "10px" }}
                              className={`event-description alert ${event.color}`}
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
                      <span>{convertToHeb(date.getDate())}</span>
                      </div>
                    </td>
                )})}
                
            </tr>
        </tbody>
        </table>
    </div>
    </>
}