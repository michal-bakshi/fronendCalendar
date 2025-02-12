import {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContex from './contex';
import { handleLogin } from './axios/userAxios';
import { useDispatch } from 'react-redux';
import { loginForReducer } from './redux/actions/userActions';

export const Login=()=>{

  const navigate = useNavigate();
  const myD=useDispatch()
  const [loginUser,setLoginUser]=useState({
    email:"",
    password:""
  })
  const [error,setError]=useState("")
  



  const login = (e) => {
  
    handleLogin(e, loginUser)
      .then((data) => {
        myD(loginForReducer(data.token)); 
        navigate('/my_show_month');
      })
      .catch((error) => {
        console.error("Login failed: ", error.message); 
        setError(error.message)
      });
  };
  
  

 return < div className='container align-items-center'>
<h1>login</h1>
<div className="tab-pane fade show active container d-flex justify-content-center align-items-center" id="pills_login" role="tabpanel" aria-labelledby="tab-login">
              
                <form onSubmit={(e)=>login(e)}>
                <div  className="form-outline mb-4">
                  <input type="text" id="loginName" name="loginName" className="form-control" onBlur={(x)=>setLoginUser({...loginUser,email:x.target.value})} required/>
                  <label className="form-label" htmlFor="loginName">Email or username</label>
                </div>   
                <div  className="form-outline mb-4">
                  <input type="password" id="loginPassword" name="loginPassword" className="form-control" onChange={(x)=>setLoginUser({...loginUser,password:x.target.value})} required/>
                  <label className="form-label" htmlFor="loginPassword">Password</label>
                </div>
                <p className="text-danger">{error}</p> 
                <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>
                <div className="text-center">
                  <p id="registerHelp">Not a member? <Link to="/my_registration"> Register</Link></p>
                </div>
              </form>
            </div>
 </div>
}