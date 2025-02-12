import axios from 'axios';
// export const newRegister = async (user) => {
//     try {
//       console.log(user.fullName)
//       const response = await fetch('http://localhost:8080/user/addUser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json ; charset=utf-8'},
//         body: JSON.stringify(user),
//       });
//       const result = await response.json();
  
//       if (response.status === 200) {
      
//         console.log(result)
//         localStorage.setItem('token', result.token);
//         // navigate('/my_show_month')
//         alert("work")
//       } else {
//           alert(result)
//       }
//     } 
//     catch (error) {
//       console.error('Error:', error);
//     }
//   };
  export const newRegister=(user)=>{
    return axios.post(`http://localhost:8081/user/addUser`,user)
  }
  export const verifyTokenEmail=(token)=>{
    return axios.get(`http://localhost:8081/user/verifyEmail/${token}`)
  }

//   export const handleLogin = (e, loginUser) => {
//     debugger
//     console.log('hi from login function not in the server')
//     e.preventDefault();
//     return axios
//     .post('http://localhost:8080/user/login', loginUser)
    
//   };
export const handleLogin = async (e, loginUser) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:8081/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(loginUser),
      });
  
      if (response.status === 200) {
        return await response.json(); 
      } else {
        const data = await response.json();
        throw new Error(data.message); 
      }
    } catch (error) {
      throw error; 
    }
  };
   
//   localStorage.setItem('token', data.token);
//       setIsConnect(true);
//       navigate('/my_show_month');