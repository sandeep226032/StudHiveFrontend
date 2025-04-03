import { useState } from 'react';
import './Stylenewstemplate.css'
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Comment from "./Comment.jsx";
// eslint-disable-next-line react/prop-types
function Newstemplate({data,username}) {
    let [likecount,setlikecount]=useState(0);
    let [dislikecount,setdislikecount]=useState(0);
    const countlikes=async()=>{
        likecount++;
        setlikecount(likecount);
        likecount=data.like+likecount;
        
        const _id=data._id;
        const likes=likecount;
        try {
            const result=await axios.patch(`${API_BASE_URL}/likes`,{_id,likes});
            console.log(result);
            
        } catch (error) {
            console.log("error in countlikes",error);
        }
    }
    const countdislike=async()=>{
        dislikecount++;
        setdislikecount(dislikecount);
        dislikecount=data.dislike+dislikecount;
        
        const _id=data._id;
        const dislikes=dislikecount;
        try {
            const result=await axios.patch(`${API_BASE_URL}/dislikes`,{_id,dislikes});
            console.log(result);
            
        } catch (error) {
            console.log("error in countlikes",error);
        }
    }
    return (
        <>
        
             <div className="template-container">
             <div className="template-username">
                <label htmlFor="">Posted By </label>
                    <h3>{data.uploader}</h3>
                </div>
            <h1 className="template-heading">{data.heading}</h1>
            <img src={data.imageurl} alt="Template visual" className="template-image" />
            <div className="template-content-box">
                <p>{data.content}</p>
            </div>
            <div className="template-footer">
                    <button className="like-btn" onClick={countlikes}>👍 Like  {data.like+likecount}</button>
                 
                    <button className="dislike-btn"onClick={countdislike}>👎 Dislike {data.dislike+dislikecount}</button>
                    <Comment newsid={data._id} username={username} ></Comment>
                    
                </div>
        </div>
      
        </>
    )
}
export default Newstemplate;