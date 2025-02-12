import express from "express"
import  bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import {sendVerifyEmail} from '../utils/sendVerificationEmail.js'
const router = express.Router();
import crypto from 'crypto';

export default{
    addUser:async(req,res)=>{
        try{
            const { email, password, fullName } = req.body;
            console.log("in add user");
            
            console.log(`email: ${email}, password: ${password}, fullname: ${fullName}`);
            const existingUser = await User.findOne({ email });
            if (existingUser) 
                return res.status(400).json({ message: 'המייל כבר קיים במערכת' });
            const hashedPassword = await bcrypt.hash(password, 8);
            const emailCode=crypto.randomBytes(16).toString("hex")
            console.log("email code: ",emailCode)
            const newUser = new User({ email, password: hashedPassword, fullName,emailToken:emailCode });
            await newUser.save();
             try {
                await sendVerifyEmail({ email: email, emailToken: emailCode });
            } catch (emailError) {
                console.error("Failed to send verification email:", emailError);
                return res.status(500).json({ message:"Failed to send verification email."});
            }

            const mytoken =  newUser._id.toString();
            res.status(200).json({ token: mytoken } );
            
        }
        catch(error){
            res.status(500).json({ message:error});
        }

    },
    loginUser:async(req,res)=>{
        try{
            const { email, password } = req.body;
            console.log(email,password);
            const existingUser = await User.findOne({ email });
            if (!existingUser) 
                return res.status(400).json({ message: 'אינך קיים במערכת' });
            else{
                const passVerification = await bcrypt.compare(password, existingUser.password);
                if(!passVerification)
                  return res.status(400).json({ message: ' סיסמא שגויה ' });
                else{
                    if(existingUser.isVerified==false)
                        return res.status(400).json({message:"...לא אומת המייל"})
                  const mytoken =  existingUser._id.toString()
                  return  res.status(200).json({ token: mytoken });
                }
              } 
        }
        catch(error){
            console.error("Error:", error);
            return res.status(500).json({ message: 'Error occurred', error });
        }
    },
    verifyToken:async(req,res)=>{
        try{
            console.log()
             const { token } = req.body;
             const user = await User.findOne({ _id: token });
             if (user) 
                return res.status(200).json({ message: 'Token is valid' });
              else 
                return res.status(401).json({ message: 'Token is invalid or expired' });
          }
        catch(error){
            console.error("Error:", error);
            return res.status(500).json({ message: 'Error occurred', error });
        }
    },
    verifyEmailToken:async(req,res)=>{
       
        try{
            console.log("in email link")
             const token  = req.params.emailToken;
             if (!token) {
                return res.status(400).json({ message: 'Token is required' });
            }
             const user = await User.findOne({ emailToken: token });
            
             if (user ){ 
                console.log("user email: ",user.email)
                user.isVerified=true;
                user.emailToken=null;
                await user.save();
                res.status(200).json({message: 'Email successfully verified', user});
             }
              else 
                return res.status(401).json({ message: 'Token email is invalid or expired' });
          }
        catch(error){
            console.error("Error:", error);
            return res.status(500).json({ message: 'Error ', error });
        }
    }
}