import React, { useEffect, useState } from 'react'
import { Delete, Edit, Favorite, MoreVert, ThumbUpAlt } from '@material-ui/icons'
import './postDetail.scss'
// import Users from '../../../global/user'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { useSelector} from 'react-redux'
import CommentDetail from '../../Comment/CommentDetail/CommentDetail'

export default function PostDetail({ post }) {
   
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    const handleLikeClick = () => {
        try {
            axios.put(`${process.env.REACT_APP_API}post/${post._id}/like` ,{ userId: currentUser._id});
    
        } catch (err) {
            console.log(err.message);
        }
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

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleDeletePost = () => {
        try {
            currentUser ? axios.delete(`${process.env.REACT_APP_API}post/${post._id}`) :
                alert("You can't delete this post!");
            
            window.location.reload();
        } catch(err) {
            console.log(err.message);
        }
        setIsOpen(false);
    }

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
                        <MoreVert onClick={handleOpen}/>
                    </div>
                </div>
                <div className="post-center">
                    <p>{post.description}</p>
                    <img src={PF+post.image || PF+"/upload/"+post.image} alt="" />
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

                <div className="comment">
                <hr/>
                <CommentDetail/>
            </div>
            </div>
            {
                isOpen ?
                    <div className="post-edit">
                        <ul>
                            <li onClick={handleDeletePost}>
                                <span><Delete style={{fontSize: 18}}/></span>
                                Delete post
                            </li>
                            <li>
                                <span><Edit style={{fontSize: 18}}/></span>
                                
                                Update post
                            </li>
                        </ul>
                    </div> : null
            }
        </div>
    )
}
