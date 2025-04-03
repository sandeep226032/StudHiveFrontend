import { useState } from 'react';
import './stylecreatenews.css'
import './Stylesignup.css'
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Login({islogin,username,islogout}) {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [result,setresult]=useState("");
    const [decide,setdecide]=useState(true);
    const login=async (e)=>{
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/login`,{email,password}, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Required for cookies if using sessions
      }).then((response)=>{
            console.log(response.data.userdata);
            setresult(response.data.message);
            setdecide(false);
            islogin();
            islogout();
            username(response.data.userdata.username)
            
        }).catch((error)=>{
            console.log(error,"error in login method");
        })
    }
    return (
    <>
    {decide &&
 <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-heading">Log in</h2>
        <form className="signup-form" onSubmit={login}>
          
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
            Log in
          </button>
        </form>
      </div>
    </div>
}
{!decide && <h1 className='result-effect '>{result}</h1>}
    </>)
}
export default Login;