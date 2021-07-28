import { CameraAlt, Gif, InsertEmoticon } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './cmtDetail.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function CommentDetail() {
    const [comment, setComment] = useState('');
    const [commentArr, setCommentArr] = useState([]);
    const user = useSelector(state => state.auth.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getComment = async () => {
            try {
                const dataComment = await axios.get(`${process.env.REACT_APP_API}comment`);
                // console.log(dataComment.data.data);
                setCommentArr(dataComment.data.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        getComment();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user: user._id,
            text: comment
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}comment`, data);
            setCommentArr([...commentArr, res.data.data]);
            setComment('');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="comment-detail">
            <div className="write-comment">
                <img src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="avatar" />
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name=""
                        placeholder="Enter comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="emoji">
                        <InsertEmoticon className="icon" />
                        <CameraAlt className="icon"/>
                        <Gif className="icon"/>
                    </div>
                </form>
                
            </div>
            <div className="comment-content">
                {
                    commentArr.map((item,index) => {
                        return (
                            <div className="user-comment" key={index}>
                                <img src={item.user.profilePicture ? PF + item.user.profilePicture : PF + "person/noAvatar.png"} alt="" className="avatar" />
                                <div className="user-comment-item">
                                    <span>{item.user.username}</span>
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
