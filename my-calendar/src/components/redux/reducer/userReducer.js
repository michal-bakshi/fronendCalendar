import {produce} from 'immer'

export const mystore={
    tokenString: localStorage.getItem('token') || '',
    isConnect: !!localStorage.getItem('token'),  

}

  export const userReducer = produce((state, action) => {
    switch (action.type) {
      case "LOGIN":
        state.isConnect=true;
        state.tokenString=action.payload
        localStorage.setItem('token',state.tokenString)
      case "REGISTER":
        // state.isConnect=true;
        state.tokenString=action.payload
         break;
     
      default:
       break;
    }
  },mystore)
  