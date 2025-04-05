import Newstemplate from "./Newstemplate.jsx";
import  Createnews from "./Createnews.jsx";
import './Stylehome.css'
import { Link } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Login.jsx";
function Home() {
    const [news,setnews]=useState([]);
    const [login,setlogin]=useState(false);
    const [username,setusername]=useState("");
    const [islogin,setislogin]=useState(false);
    const [islogout,setislogout]=useState(false);
    const [ispost,setispost]=useState(false);
    console.log(username);
    useEffect( ()=>{
        try {
              axios.get(`${API_BASE_URL}/home`).then((response)=>{
                //   console.log(response.data);
                  setnews(response.data.data);
                  console.log(response.data.data);
             }).catch((error)=>{
                console.log("error in fetching",error);
             })   
        } catch (error) {
            console.log("error in useEffect",error);
        }  
    },[])
   

    const logout=async ()=>{
        await axios.get(`${API_BASE_URL}/logout`,{
            withCredentials:true
        }).then((response)=>{
            toast.success("You have been logged out!", {
                position: "top-right",
                autoClose: 3000, // Auto close in 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            setislogout(true);
            setislogin(false);
            setusername("");
            console.log(response.data);
        }).catch((error)=>{
            console.log(error,"error in logout function");
        })
    }
   
    return (
        <>
             <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>StudHive</h1>
                </div>
                <div className="navbar-buttons">
                {!islogin && !username&&<> <Link to="/signup"> <button className="navbar-btn signup-btn">Sign Up</button></Link>
                    <button onClick={()=>{
                        setlogin(true);
                        
                    }} className="navbar-btn login-btn">Log In</button></>}
                    <button onClick={logout} className="navbar-btn logout-btn">Log Out</button>
                    <ToastContainer /> 
                    {islogin&& !islogout&& <button className="user-button">{username}</button>&&<Link to="/yourpost"><button className="user-button">Your post</button></Link>}
                </div>
            </div>
        </nav>
       {login && <div>
                <Login islogin={()=>{setislogin(true),setlogin(false) }
            }     username={(nam)=>{setusername(nam)} }  islogout={()=>{setislogout(false)}}></Login>
        </div>}
    
            <button onClick={()=>{setispost(true)}} className="newsbutton">create news</button>
            {ispost&& islogin&& <Createnews uploader={username}></Createnews>}
          {news.map((data,index)=>{
            return <Newstemplate key={index} data={data} username={username}></Newstemplate>
           
          })}
          
       
          
           
            
        </>
        
    )
}
export default Home;