import logo from './logo.svg';
import './App.css';
import {Menu } from './components/menu'
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';
import { ShowMonth } from './components/showMonth';
import {Test} from './components/test'
import { HolidaysInMonth } from './components/holidaysInMonth';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Myprovider} from "./components/contex"
import { Email } from './components/email';
import { handleMyEvents } from './components/axios/dateAxios';
import { Provider, useDispatch } from 'react-redux';
import {store} from './components/redux/store'
import { changeEvents, changeButton } from './components/redux/actions/dateAction';
import app from "./firebase";


// יצירת קומפוננטה חדשה - AppContent.js
const AppContent = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const tokenString = token ? (typeof token === 'string' ? token : JSON.stringify(token)) : '';

  useEffect(() => {
    const checkToken = async () => {
      // הלוגיקה של בדיקת הטוקן
    };

    handleMyEvents(tokenString)
      .then((data) => {
        dispatch(changeEvents(data.listEvent));
        dispatch(changeButton(true));
      })
      .catch((err) => console.log(err));

    checkToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Menu />
      <Routing />
    </BrowserRouter>
  );
};

function App() {
  console.log("Firebase App:", app);
  return (
    <div className="App">
      
      <Provider store={store}>
        <AppContent />
      </Provider>
    </div>
  );
}
  


export default App;
