import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage=()=>{
    const navigate=useNavigate();
    return<>
    <h1> דף הבית </h1>
        <button className="btn btn-outline-primary m-1" onClick={() => navigate('/my_registration')}> הרשמה</button>
        <button className="btn btn-outline-primary m-1" onClick={() => navigate('/my_login')}> התחברות</button>
    </>
}