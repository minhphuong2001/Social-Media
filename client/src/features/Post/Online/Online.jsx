import React from 'react'
import './online.scss'

export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="online">
            <li className="list-friend-item">
                <div className="friend-detail">
                    <img src={PF+user.profilePicture} alt="" />
                    <span className="friend-online"></span>
                </div>
                <span className="username">{user.username}</span>
            </li>
        </div>
    )
}
