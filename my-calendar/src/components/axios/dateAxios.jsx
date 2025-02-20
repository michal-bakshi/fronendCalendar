import { useDispatch, useSelector } from 'react-redux';
import { changeButton, changeEvents } from '../redux/actions/dateAction';
import axios from 'axios';

export const addNewEvent = (obj) => {
     return axios.post('https://calendar-backend-9j19.onrender.com/reservedDates/add',obj)
  };
  export const handleMyEvents =  (tokenString) => {
         return axios.get(`https://calendar-backend-9j19.onrender.com/reservedDates/getByToken/${tokenString}`)   
        };
        // myD(changeEvents(data.listEvent));
        // myD(changeButton(true));
export const editEvent=(id,desc)=>{
    return axios.put(`https://calendar-backend-9j19.onrender.com/reservedDates/edit/${id}`,desc)
}