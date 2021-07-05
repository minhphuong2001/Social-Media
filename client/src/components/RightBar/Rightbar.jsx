import React from 'react'
import './rightbar.scss'
import { CardGiftcard } from '@material-ui/icons'
import gift from '../../assets/images/gift.jpg'
import avatar from '../../assets/images/avatar.jpg'
import Users from '../../global/user'
import Online from '../../features/Post/Online/Online'

export default function Rightbar({ user }) {
    
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
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
                    <div className="following-detail">
                        <img src={avatar} alt="" />
                        <span>Min Min</span>
                    </div>
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
