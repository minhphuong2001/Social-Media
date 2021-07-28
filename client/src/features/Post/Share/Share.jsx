import React, { useRef, useState } from 'react'
// import avatar from '../../../assets/images/avatar.jpg'
import './share.scss'
import {Cancel, EmojiEmotions, PermMedia, Videocam} from '@material-ui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios';

export default function Share() {
    const user = useSelector(state => state.auth.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            user: user._id,
            description: desc.current.value,
        }
        console.log(user._id);
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;

            try {
                await axios.post(`${process.env.REACT_APP_API}upload`, data);
                window.location.reload();
                
            } catch (error) {
                console.log(error.message);
            }
        }

        try {
            await axios.post(`${process.env.REACT_APP_API}post`, newPost);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="share">
            <div className="share-container">
                <div className="share-top">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                    <input
                        type="text"
                        placeholder={`${user.username}, What are you thinking?`}
                        ref={desc}
                    />
                </div>
                <hr className="share-hr" />
                {
                    file && (
                        <div className="share-img-container">
                            <img
                                className="share-img"
                                src={URL.createObjectURL(file)}
                                alt=""
                            />
                            <Cancel className="share-cancel" onClick={() => setFile(null)} />
                        </div>
                    )
                }
                <form className="share-bottom" onSubmit={handleSubmit}>
                    <div className="share-option">
                        <div className="share-option-item">
                            <Videocam className="video-icon"/>
                            <span>Video Direction</span>
                        </div>

                        <label htmlFor="file" className="share-option-item">
                            <PermMedia className="image-icon"/>
                            <span>Photo/Video</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{display: "none"}}
                            />
                        </label>

                        <div className="share-option-item">
                            <EmojiEmotions className="emoji-icon"/>
                            <span className="feel">Feelings</span>
                        </div>
                    </div>
                    <button className="btn-share" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
