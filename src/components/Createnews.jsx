import { useState } from 'react';
import './Stylecreatenews.css';
import './Stylehome.css';
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Createnews({uploader}) {
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [result, setResult] = useState("");
    const [decide, setDecide] = useState(true);

    const postnews = async (e) => {       
        e.preventDefault();

        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("content", content);    
        formData.append("image", image);
        formData.append("uploader",uploader);

        try {
            const response = await axios.post(`${API_BASE_URL}/createnews`, formData, {
                withCredentials: true  // Allows cookies if needed
            });
            console.log(response.data.message);
            setResult(response.data.message);
            setDecide(false);
        } catch (error) {
            console.error("Error in postnews method:", error);
        }
    };
    
    return (
        <>
           <h1 className='heading'>Create News</h1>
           {decide &&  
            <form onSubmit={postnews}>
                <div className="form-container">
                    <div className="input-group">
                        <label htmlFor="heading">Enter Heading</label>
                        <input type="text" id="mainline" value={heading} 
                               onChange={(e) => setHeading(e.target.value)} 
                               placeholder="Enter Heading" />
                    </div>
                    
                    <div className='input-group'>
                        <label htmlFor="uploadimage">Upload Image</label>
                        <input type="file" id="image" name="image" accept='image/png,image/jpg'
                               onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="content">Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} 
                                  placeholder='Enter content'></textarea>
                    </div>

                    <button className='newsbutton' type='submit'>Post News</button>
                </div>
            </form>
           }
           {!decide && <h1 className='result-effect'>{result}</h1>}
        </>
    );
}

export default Createnews;
