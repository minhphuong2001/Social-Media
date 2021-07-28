import { CameraAlt, Gif, InsertEmoticon } from '@material-ui/icons'
import React, { useState } from 'react'
import avatar from '../../../assets/images/avatar.jpg'
import './cmtDetail.scss'



export default function CommentDetail() {
    const comments = [
            {
                avatar: `${avatar}`,
                name: 'Minh Phương',
                content: 'Đáng sợ thế giới'
            },
            {
                avatar: `${avatar}`,
                name: 'Minh Phương',
                content: 'Đáng sợ thế giới'
            },
    ]
    const [comment, setComment] = useState('');
    const [commentArr, setCommentArr] = useState([...comments])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: comment
        }
        const newComment = [...commentArr, data];
        setCommentArr(newComment);
        setComment('');
    }

    return (
        <div className="comment-detail">
            <div className="write-comment">
                <img src={avatar} alt="" className="avatar" />
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
                                <img src={item.avatar} alt="" className="avatar" />
                                <div className="user-comment-item">
                                    <span>{item.name}</span>
                                    <span>{item.content}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
