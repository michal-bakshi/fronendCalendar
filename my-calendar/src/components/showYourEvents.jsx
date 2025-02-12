import { useLocation } from 'react-router-dom';

export const ShowYourEvents=()=>{

    const location = useLocation();
    const hebMonth=["א","ב","ג","ד","ה","ו","ז","ח","ט","י","יא","יב","יג","יד","טו","טז","יז","יח","יט","כ","כא","כב","כג","כד","כה","כו","כז","כח","כט","ל","לא"]
    const eventData = location.state?.events;
  
    return<div>
        <table className="table">
            <thead>
                <tr>
                    <th>יום</th>
                    <th>חודש</th>
                    <th>שנה</th>
                    <th>תאור</th>
                    <th>תזכור</th>
                    <th>לפני חצות</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(eventData) && eventData.length > 0 ? (
                  eventData.map((x, index) => (
                    <tr key={index}>
                      <td>{hebMonth[x.hebrewDay-1]}</td>
                      <td>{x.hebrewMonth}</td>
                      <td>{x.hebrewYear}</td>
                      <td>{x.description}</td>
                      <td>{x.remainder}</td>
                      <td>{x.beforeMidnight ? 'כן' : 'לא'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No events available</td>
                  </tr>
                      )}
             </tbody>
        </table>
    </div>
}