import { useDispatch, useSelector } from 'react-redux';
import { changeButton, changeEvents } from '../redux/actions/dateAction';
import axios from 'axios';

export const addNewEvent = (obj) => {
     return axios.post('http://localhost:8081/reservedDates/add',obj)
  };
  export const handleMyEvents =  (tokenString) => {
         return axios.get(`http://localhost:8081/reservedDates/getByToken/${tokenString}`)   
        };
        // myD(changeEvents(data.listEvent));
        // myD(changeButton(true));
export const editEvent=(id,desc)=>{
    return axios.put(`http://localhost:8081/reservedDates/edit/${id}`,desc)
}