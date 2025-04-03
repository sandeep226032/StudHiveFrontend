import  { useState } from "react";
import './Stylecomment.css'
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comment = ({newsid,username}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    const handlePostComment = async() => {
        if (comment.trim() !== "") {
            try {
                const result=await axios.post(`${API_BASE_URL}/comments`,{username,newsid,comment});
                console.log(result);
            } catch (error) {
                console.log("error in handlepostcomment",error);
            }
            
            setComment("");
        }
    };
    const displaycomment=async()=>{
        setShowComments(!showComments);
        try {
          const result=  await axios.post(`${API_BASE_URL}/seecomments`,{newsid});
        setComments(result.data.data);
        } catch (error) {
            console.log("error in display comment",error);
        }
    }



    return (
        <div className="comment-container">
            <textarea
                className="comment-box"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="post-btn" onClick={handlePostComment}>Post Comment</button>
            <button className="toggle-btn" onClick={displaycomment}>
                {showComments ? "Hide Comments" : "See Comments"}
            </button>
            
            {showComments && (
                <div className="comments-section">
                    {comments.length > 0 ? (
                        comments.map((cmt, index) => (
                            <div key={index} className="comment-content">
                            <div className="comment-header">
                        <span className="username">{cmt.username}</span>
              </div>
            <p className="comment-text">{cmt.comment}</p>
          </div>
                        ))
                    ) : (
                        <p className="no-comments">No comments yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
