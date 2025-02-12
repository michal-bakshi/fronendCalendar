import { HDate,Hebcal } from 'hebcal';

export const HolidaysInMonth=()=> {
    const Hebcal = require('hebcal');
    const year=2024
    const month=10
  
  const holidaysInMonth = [];
  const hebcal = new Hebcal(); 
 const myHolidays=hebcal.holidays

  for (const date in myHolidays) {
    
  
    const holidayDate = new Date(date);
    
   
//     if (holidayDate.getMonth() === month && holidayDate.getFullYear() === year) {
//       holidaysInMonth.push({
//         date: date,
//         events: Hebcal.holidays[date] 
//       });
//     }
  }
console.log(holidaysInMonth)
  return holidaysInMonth;
}

