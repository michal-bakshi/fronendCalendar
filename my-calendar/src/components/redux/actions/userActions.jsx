export const loginForReducer=(x)=>{
    return {type:"LOGIN",payload:x}
  }
  export const registerForReducer=(tokenString)=>{
return {type:"REGISTER",payload:tokenString}
  }