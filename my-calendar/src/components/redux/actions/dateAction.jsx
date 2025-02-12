export const changeButton=(flag)=>{
    return {type:"CHANGE_IS_BUTTOB_CLICKED",payload:flag}
  }
  export const changeEvents=(obj)=>{
    return {type:"CHANGE_EVENTS",payload:obj}
  }
  export const deleteEventAction=(id)=>{
    return {type:"DELETE_EVENT",payload:id}
  }
  export const addEventAction=(newEvent)=>{
    return{type:"ADD_EVENT",payload:newEvent}
  }
  export const updateEventAction = (editingEventId, editedDescription) => {
    return {type: "EDIT_EVENT",payload:{id:editingEventId, description:editedDescription}}
  }