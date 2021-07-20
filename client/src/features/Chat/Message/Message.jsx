import React from 'react'
import avatar from '../../../assets/images/avatar.jpg'
import './message.scss'

export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-top">
                <img src={avatar} alt="" />
                <p>This is a message
                </p>
            </div>
            <div className="message-bottom">
                1 hour ago
            </div>
        </div>
    )
}
