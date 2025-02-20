import React, {  useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContex from './contex';
import { useDispatch, useSelector } from 'react-redux';
import { handleMyEvents } from './axios/dateAxios';
import { changeEvents } from './redux/actions/dateAction';



export const Menu=()=>{
    
    const isConnect=useSelector(x=>x.users.isConnect)
    const getMyEvents=useSelector(x=>x.dates.getMyEvents)
    const tokenString=useSelector(x=>x.users.tokenString)
    const navigate = useNavigate();
    const dispatch=useDispatch()
   
    const getMyEventsFor = (e) => {
      e.preventDefault()
      navigate('/my_show_month'); 
        };
     const addNewEvent=(e)=>{
        e.preventDefault()
        navigate('/my_add_event')    
        }
        // try {
            
        //     await dispatch(getMyEvents(tokenString)); 
        //     navigate('/my_show_month'); 
        //     alert("Events retrieved successfully");
        // } catch (error) {
        //     console.error("Error retrieving events: ", error);
        //     alert("Failed to get events");
        // }
    return<>
        
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-2">
            <div className="container-fluid">
                <Link to="/" className="text-dark fw-bold display-4 text-center d-block text-decoration-none "  style={{ fontSize: "xx-large" }}><i className="bi bi-calendar-event"></i> calender</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScrollnew" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScrollnew">
                    <ul className="navbar-nav me-auto my-2 my-lg-0">
                        <li className="nav-item"> 
                        <Link  className="nav-link"  onClick={(e)=>getMyEventsFor(e)}> לוח שנה </Link>
                        </li>
                       {isConnect && (<li className="nav-item"> 
                            <Link  className="nav-link" onClick={(e)=>addNewEvent(e)}> הוספת ארוע </Link>
                        </li>
                       )}
                        {/* <li className="nav-item">
                            <a className="nav-link disabled" tabIndex="-1" aria-disabled="true"> current date  </a>
                        </li> */}
                         {/* {isConnect && (<li className="nav-item"> 
                            <Link className="nav-link" onClick={getMyEventsFor} > רשימת ארועים שלי  </Link>
                        </li>
                       )} */}
                    </ul>
                    <div className="search">
                    {/* <form id="form_search" className="d-flex ms-auto d-md-flex  d-none">
                        <input id="inputSearch"  name="searchInput" className="form-control me-2" type="search" placeholder="Search" />
                        <input type="hidden" name="searchForm" value="searchForm"/>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                      </form> */}
                    </div>
                </div>
            </div>
        </nav>

        
    </>
}