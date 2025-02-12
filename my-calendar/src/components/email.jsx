import { useState } from "react";

export const Email=()=>{
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const sendEmail = async () => {
    try {
      
      const response = await fetch(`http://localhost:8080/sendEmail`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({ email, subject, message }),
      });
      
      if (response.ok) {
        const data = await response.text();
        setResponseMessage(data); 
      } else {
        setResponseMessage('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error sending email');
    }
  };
    return <div>
    <h2>Send Email</h2>
    <div>
      <input
        type="email"
        placeholder="Recipient's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
    </div>
    <div>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
    <button onClick={sendEmail}>Send Email</button>

    {responseMessage && <p>{responseMessage}</p>}
  </div>
}