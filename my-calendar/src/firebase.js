// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS1odgdcjBbrdGDx-7ecH-qjoNsnHvr24",
  authDomain: "hebcal-53ca2.firebaseapp.com",
  projectId: "hebcal-53ca2",
  storageBucket: "hebcal-53ca2.firebasestorage.app",
  messagingSenderId: "166756465493",
  appId: "1:166756465493:web:ebf61656b72d31e9ce8ddc",
  measurementId: "G-9DTVNHH8G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;