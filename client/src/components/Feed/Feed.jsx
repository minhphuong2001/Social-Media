import React, { useEffect, useState } from 'react'
import PostDetail from '../../features/Post/PostDetail/PostDetail'
import Share from '../../features/Post/Share/Share'
import './feed.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Feed({username}) {

    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.auth.user);
    // console.log(user.username);
    // console.log(username);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ?
                await axios.get(`${process.env.REACT_APP_API}post/profile/` + username )
               : await axios.get(`${process.env.REACT_APP_API}post/timeline/` + user._id);
            // console.log(res.data.data);
            setPosts(res.data.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }));
        }
        
        fetchPosts();
    }, [username, user._id])

    return (
        <div className="feed">
            { (!username || username === user.username) && <Share />}
            {
                posts.map((item) => {
                    return (
                        <PostDetail
                            key={item._id}
                            post={item}
                        />
                    )
                })
            }
        </div>
    )
}
