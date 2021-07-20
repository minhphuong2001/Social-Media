import React from 'react'
import './chatonline.scss'
import avatar from '../../../assets/images/avatar.jpg'

export default function ChatOnline() {
    return (
        <div className="chat-online">
            <div className="chat-online-friend">
                <div className="friend-img">
                    <img src={avatar} alt="" />
                    <div className="chat-online-badge"></div>
                </div>
                <span className="name">Minh Phương</span>
            </div>
        </div>
    )
}
