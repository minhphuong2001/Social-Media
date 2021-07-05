import React from 'react'
import './closeFriend.scss'

export default function CloseFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="close-friend">
            <img src={PF+user.profilePicture} alt="" />
            <span>{user.username}</span>
        </div>
    )
}
