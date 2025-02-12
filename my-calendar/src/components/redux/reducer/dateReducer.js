import {produce} from 'immer'
import { handleMyEvents } from '../../axios/dateAxios';
import { useSelector } from 'react-redux';

export const mystore={


isButtonClicked:false,
getMyEvents:[],
events:{}
}

  export const dateReducer = produce((state, action) => {
    switch (action.type) {
      case "ADD_EVENT":
        return {
            ...state,
            getMyEvents: [...(state.getMyEvents || []), action.payload]
        };
        case"EDIT_EVENT":
        return {
            ...state,
            getMyEvents: state.getMyEvents.map(event =>
              event._id === action.payload.id
                ? { ...event, description: action.payload.description }
                : event
            )
          };
      case "DELETE_EVENT":
        state.getMyEvents=state.getMyEvents.filter(x=>x._id!=action.payload);
         break;
    case "CHANGE_IS_BUTTOB_CLICKED":state.isButtonClicked=action.payload
        break;
      case "CHANGE_EVENTS":{
        state.getMyEvents=action.payload
         console.log("my events "+state.getMyEvents)
        break}
      default:
       break;
    }
  },mystore)
  