import React from 'react'
import './conversation.scss'
import avatar from '../../../assets/images/avatar.jpg'

export default function Conversation() {
    return (
        <div className="conversation">
            <img src={avatar} alt="" />
            <span>Minh Phương</span>
        </div>
    )
}
