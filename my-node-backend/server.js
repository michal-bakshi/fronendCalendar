import express, { response } from "express"
import Schema from "mongoose";
import pkg from 'hebcal'; 
import cors from 'cors';
import userRouter from './routes/authRoutes.js'; 
import reservedDates from './routes/reservedDates.js'
import  {sendVerifyEmail} from './utils/sendVerificationEmail.js'
import nodeCron from 'node-cron';
import dotenv from 'dotenv';
import User from "./models/User.js";
import { reminderEmailFunction } from "./utils/reminderEmail.js";
import Dates from "./models/Dates.js";

const Hebcal = pkg; 
const hebrewMonths = ["Nisan", "Iyyar", "Sivan", "Tamuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Sh'vat", "Adar", "Adar1", "Adar2"];




dotenv.config();
const app = express();

const port = 8081;

Schema.connect('mongodb://localhost:27017/myCalendarDB', { 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


app.use(cors());
app.use('/user', userRouter);
app.use('/reservedDates',reservedDates)

async function sendEmailsAtNight() {
  try {
    console.log('Sending reminder emails at night...');
    
    const today = new Hebcal.HDate().next();
console.log(today);

    const events = await Dates.find({
      hebrewDay: today.day,
      hebrewMonth: hebrewMonths[today.month - 1],
      remainder: { $in: ['yearly', 'once'] }
    }).populate('userId'); 
console.log(events);

    const eventsByUser = events.reduce((acc, event) => {
      const user = event.userId;
      if (user) {
        if (!acc[user._id]) {
          acc[user._id] = { user, events: [] };
        }
        acc[user._id].events.push(event);
      }
      return acc;
    }, {});

    for (const { user, events } of Object.values(eventsByUser)) {
      const emailContent = events
        .map(event => event.description+"<br><br>" )
        .join('<br><br>'); 

      reminderEmailFunction(user, {description:emailContent,hebrewDay:today.day,hebrewMonth:hebrewMonths[today.month - 1]});
      const updates = events
        .filter(event => event.remainder === "once")
        .map(event => {
          event.remainder = "never";
          return event.save(); 
        });

      await Promise.all(updates); 
    }
  } catch (error) {
    console.error('Error in sendEmailsAtNight:', error);
  }
}


nodeCron.schedule('* * * * *', sendEmailsAtNight);  
console.log('Cron job scheduled to send reminder emails every night at 8 PM.');
const today = new Hebcal.HDate();   
    const tomorrow = today.next(); 
    console.log(today+" "+ tomorrow);
    
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
 
});

