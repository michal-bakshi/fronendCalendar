import { useEffect, useRef, useState } from "react"
import { verifyTokenEmail } from "./axios/userAxios"
import { useSearchParams } from 'react-router-dom';


export const VeriftEmail=()=>{
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [message,setMessage]=useState("")
    const hasRan = useRef(false);
    // const verifyEmail=(token)=>{
    //     console.log("token from emaik: ",token);
        
    //     verifyTokenEmail(token)
    //     .then(x=>setMassege(x.data))
    //     .catch(err=>console.log(err)
    //     )
    // }

    useEffect(() => {
       
        if (token && !hasRan.current) {
            hasRan.current = true;
            console.log("Token from email: ", token);
            verifyTokenEmail(token)
                .then(response => {
                    setMessage(response.data.message || "Email verified successfully!");
                })
                .catch(err => {
                    console.error(err);
                    setMessage("Verification failed. Please try again later.");
                });
        } else {
            setMessage("Token not found. Verification failed.");
        }
    }, []);
    return<>
   <p className={`alert ${message.includes("failed") ? "alert-danger" : "alert-success"}`}>
                {message}
            </p>
    <div>Verifying your email...</div>

    </>
}