import React, { useEffect, useState } from 'react'
import { Favorite, MoreVert, ThumbUpAlt } from '@material-ui/icons'
import './postDetail.scss'
// import Users from '../../../global/user'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

export default function PostDetail({ post }) {
   
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLikeClick = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}auth?userId=${post.user}`)
            // console.log("fetch user: ", res.data.other);
            setUser(res.data.other);
        }
        fetchUser();
    }, [post.user])

    return (
        <div className="post-detail">
            <div className="post-detail-container">
                <div className="post-top">
                    <div className="post-top-left">
                        <Link to={`profile/${user.username}`}>
                            <img
                                src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"}
                                alt=""
                            />
                        </Link>
                        <span className="username">
                            {user.username}
                        </span>
                        <span className="date">{format(post.createdAt)}</span>
                    </div>
                    <div className="post-top-right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post-center">
                    <p>{user.description}</p>
                    <img src={PF+post.image} alt="" />
                </div>
                <div className="post-bottom" >
                    <div className="post-bottom-left">
                        <ThumbUpAlt className="like-icon" onClick={handleLikeClick}/>
                        <Favorite className="heart-icon" onClick={handleLikeClick}/>
                        <span>{like} people like it</span>
                    </div>
                    <div className="post-bottom-right">
                        <p>{post.comment} comments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
