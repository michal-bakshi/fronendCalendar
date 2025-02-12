import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContex from './contex';
import { newRegister } from './axios/userAxios';
import { registerForReducer } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
export const Registration=()=>{
   const navigate=useNavigate();
   const myD=useDispatch()

   const [user,setUser]=useState({
    email:"",
    repeatEmail:"",
    password:"",
    repeatPassword:"",
    fullName: "",
   });
   const [massege, setMassege] = useState({
    email: "",
    special: "",
    letters8: "",
    bigLetter: "",
    number: "",
    password: "",
  });
  
  const validatePassword = () => {
    const password = user.password;
    let isValid = true;
  
    if (password.length < 8) {
      setMassege((prevMassege) => ({
        ...prevMassege,
        letters8: "הסיסמה חייבת לכלול לפחות 8 תווים.",
      }));
      isValid = false;
    } else {
      setMassege((prevMassege) => ({
        ...prevMassege,
        letters8: "",
      }));
    }
  
    if (!/[A-Z]/.test(password)) {
      setMassege((prevMassege) => ({
        ...prevMassege,
        bigLetter: "הסיסמה חייבת לכלול לפחות אות גדולה אחת.",
      }));
      isValid = false;
    } else {
      setMassege((prevMassege) => ({
        ...prevMassege,
        bigLetter: "",
      }));
    }
  
    if (!/\d/.test(password)) {
      setMassege((prevMassege) => ({
        ...prevMassege,
        number: "הסיסמה חייבת לפחות לכלול ספרה אחת.",
      }));
      isValid = false;
    } else {
      setMassege((prevMassege) => ({
        ...prevMassege,
        number: "",
      }));
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setMassege((prevMassege) => ({
        ...prevMassege,
        special: "הסיסמה חייבת לכלול לפחות תו מיוחד אחד.",
      }));
      isValid = false;
    } else {
      setMassege((prevMassege) => ({
        ...prevMassege,
        special: "",
      }));
    }
  
    return isValid;
  };
  

   const validateFormInput=(e)=>{
       e.preventDefault()
       if(user.email!=user.repeatEmail &&user.password!=user.repeatPassword){
        setMassege((prevMassege) => ({
            ...prevMassege,
            email: " המיילים אינם זהים",
            password: "הסיסמא אינה זהה",
          }));
             return;
       }
    else  if(user.password!=user.repeatPassword){
        setMassege((prevMassege) => ({
            ...prevMassege,
            email:"",
            password: "הסיסמא אינה זהה",
          }));
    return;
        }
        else  if(user.email!=user.repeatEmail){
            setMassege((prevMassege) => ({
                ...prevMassege,
                email:"המיילים אינם זהים",
                password: "",
              }));
        return;
            }
          if(validatePassword()==true)  {
        setMassege((prevMassege) => ({
            ...prevMassege,
            email:"",
            password: "",
            validatePasswordInput:"",
          }));
          
          newRegister(user)
          .then((result)=>{
            myD(registerForReducer(result.data.token))
              navigate('/checkYourEmail')
            })
            .catch((error) => {
              console.log(error.response.data)
              setMassege((prev) => ({
                ...prev, 
                email: error.response.data.message,
              }));
            });
         
         
          
        }
   }
  


    return<div className='container align-items-center'>
    <h1 className="font-weight-bold ">הרשמה</h1>
    <div className="tab-pane fade show active container d-flex justify-content-center align-items-center">
     <form onSubmit={(e)=>validateFormInput(e)}>
        <div className="form-outline mb-4">
        <label className="form-label">מייל</label>
            <input type="email"  className="form-control"
            onBlur={(x)=>setUser({...user,email:x.target.value})} 
            required/>  
        </div>
        <div className="form-outline mb-4">
        <label className="form-label"> אימות מייל </label>
            <input type="email" name="registerEmail" id="registerEmail" className="form-control" 
            onChange={(x)=>setUser({...user,repeatEmail:x.target.value})}
              required/> 
            <p className="text-danger">{massege.email}</p> 
        </div>

        <div>
        <label className="form-label"> שם משתמש</label>
            <input type="text" name="fullName" id="userName" className="form-control" 
            onBlur={(x)=>setUser({...user,fullName:x.target.value})}/>
        </div>
     
        <div className="form-outline mb-4">
            <label className="form-label" >סיסמא</label>
            <input type="password" className="form-control"
            onChange={(x)=>setUser({...user,password:x.target.value})} 
            onBlur={()=>validatePassword()} required />
            <p className="text-danger">{massege.letters8}</p>
            <p className="text-danger">{massege.number}</p> 
            <p className="text-danger">{massege.bigLetter}</p> 
            <p className="text-danger">{massege.special}</p> 
        </div>
         <div className="form-outline mb-4">
          <label className="form-label" >אימות סיסמא </label>
            <input type="password" className="form-control"
             onChange={(x)=>setUser({...user,repeatPassword:x.target.value})}
              required/>
             <p className="text-danger">{massege.password}</p> 
        </div>
        <input type="hidden"  value="register"/>
        <button type="submit" className="btn btn-primary btn-block mb-3">ok</button>
        <p id="loginHelp">already a member? <Link to="/my_login"> Log in</Link></p>   
         </form> 
  </div> 
  </div>
}