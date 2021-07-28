import React, { useEffect, useState } from 'react'
import './rightbar.scss'
import { Add, CardGiftcard, Remove } from '@material-ui/icons'
import gift from '../../assets/images/gift.jpg'
// import avatar from '../../assets/images/avatar.jpg'
import Users from '../../global/user'
import Online from '../../features/Post/Online/Online'
import axios from 'axios'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from '../../features/Auth/authSlice'

export default function Rightbar({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector(state => state.auth.user);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
    const dispatch = useDispatch();

    useEffect(() => {
        const getFriend = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}auth/friends/${user._id}`);
                setFriends(res.data.data);
                // console.log(res.data.data);

            } catch (error) {
                console.log(error.message);
            }
        }

        getFriend();
    }, [user])

    const style = {
        textDecoration: "none",
        color: "#000"
    }

    const handleFollowClick = async() => {
        try {
            if (followed) {
                const unfollowData = await axios.put(`${process.env.REACT_APP_API}auth/${user._id}/unfollow`, {userId: currentUser._id});
                console.log(unfollowData);
                const action = unfollow(unfollowData.user);
                dispatch(action);
            } else {
                const followData = await axios.put(`${process.env.REACT_APP_API}auth/${user._id}/follow`, {userId: currentUser._id});
                console.log(followData);
                const action = follow(followData.user);
                dispatch(action);
            }
        } catch (error) {
            console.log(error.message);
        }

        setFollowed(!followed);
    }
    
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday-container">
                    <div className="main">
                        <div className="birthday-friend">
                            <CardGiftcard className="gift-icon"/>
                            <span>
                                <b>Min Min</b> and <b>3 other friends</b> have a birthday today. Best wished to them
                            </span>
                        </div>
                        <img src={gift} alt="" />
                    </div>
                </div>
                <div className="friend-container">
                    <div className="main-cont">
                        <h4>Online friend</h4>
                        <ul className="list-friend">
                            {Users.map((item) => {
                                return (
                                    <Online
                                        user={item}
                                        key={item.id}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                {
                    user.username !== currentUser.username && (
                        <button className="add-follow" onClick={handleFollowClick}>
                            {followed ? "Unfollow" : "Follow"}
                            {followed ? <Remove /> : <Add />}
                        </button>
                    )
                }
                <h4 className="text">User Information</h4>
                <div className="profile-infor">
                    <div className="profile-infor-item">
                        <span>City:</span>
                        <span>{user.city}</span>
                    </div>
                    <div className="profile-infor-item">
                        <span>From:</span>
                        <span>{user.from}</span>
                    </div>
                    <div className="profile-infor-item">
                        <span>Relationship:</span>
                        <span>
                            {user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}
                            
                        </span>
                    </div>
                </div>

                <h4 className="text">User friends</h4>
                <div className="following">
                    {friends.map((item,index) => {
                        return (
                            <Link to={"/profile/" + item.username} style={style} key={index}>
                                <div className="following-detail" key={index}>
                                    <img
                                        src={item.profilePicture ? PF + item.profilePicture : PF + "person/noAvatar.png"}
                                        alt=""
                                    />
                                    <span>{item.username}</span>
                                </div>
                            </Link>
                            
                        )
                    })}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbar-container">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
                
            </div>
        </div>
    )
}
