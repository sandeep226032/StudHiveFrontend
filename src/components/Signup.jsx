import { useState } from 'react';
import './Stylesignup.css'
import './stylecreatenews.css'
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Signup() {
    const [username,setusername]=useState("");
    const [phonenumber,setphonenumber]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [result,setresult]=useState("");
    const [decide,setdecide]=useState(true);
    const register = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(
              `${API_BASE_URL}/signup`,
              { username, email, phonenumber, password },
              { withCredentials: true } 
          );
  
          console.log(response.data.message);
          setresult(response.data.message);
          setdecide(false);
      } catch (error) {
          console.error("Error in register method:", error);
      }
  };
  
    return (
        <>
        {decide &&
 <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-heading">Sign Up</h2>
        <form className="signup-form" onSubmit={register}>
          <div className="form-group">
            <label className='label-highlight' htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e)=>{setusername(e.target.value)}}
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label className='label-highlight' htmlFor="email">Email</label>
            <input
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className='label-highlight' htmlFor="phone">Phone Number</label>
            <input
            value={phonenumber}
            onChange={(e)=>{setphonenumber(e.target.value)}}
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label className='label-highlight' htmlFor="password">Password</label>
            <input
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
}
{!decide &&<h1 className='result-effect '>{result}</h1>}
        </>
    )
}
export default Signup;